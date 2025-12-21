// websocket-server.js
require("dotenv").config();
const WebSocket = require("ws");
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();
const wss = new WebSocket.Server({ port: 3001 });

console.log("🟢 WebSocket Server rodando na porta 3001");

const activeConnections = new Map();

wss.on("connection", async (ws, req) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get("token");
    const isSaaS = url.searchParams.get("saas") === "true";

    console.log(
      `🔗 Nova conexão: token=${token} saas=${isSaaS} from=${req.socket.remoteAddress}`,
    );

    if (!token) {
      ws.close(1008, "Token não fornecido");
      return;
    }

    const restaurant = await db.restaurant.findFirst({
      where: { printingToken: token },
    });

    if (!restaurant) {
      console.log("❌ Token inválido");
      ws.close(1008, "Token inválido");
      return;
    }

    if (isSaaS) {
      console.log(`🚀 [${restaurant.name}] SaaS conectou para envio.`);
      // Aviso de handshake para facilitar debug
      try {
        ws.send(JSON.stringify({ type: "welcome", server: "rangooo-ws" }));
      } catch (e) {
        console.warn("⚠️ Falha ao enviar welcome:", e.message);
      }
    } else {
      console.log(`🎉 [${restaurant.name}] AGENTE LOCAL CONECTADO.`);
      activeConnections.set(restaurant.id, {
        ws,
        restaurant,
        connectedAt: new Date(),
      });

      await db.restaurant.update({
        where: { id: restaurant.id },
        data: { printerStatus: "connected", lastPrintedAt: null },
      });
    }

    // ÚNICO OUVINTE DE MENSAGENS DO SERVIDOR
    ws.on("message", async (data) => {
      const rawData = data.toString();
      console.log(`🔥 [${restaurant.name}] RECEBIDO:`, rawData);

      try {
        const message = JSON.parse(rawData);

        // SE FOR PEDIDO VINDO DO SAAS
        if (message.type === "print_order") {
          console.log(`🎯 Repassando pedido para Agente Local...`);

          try {
            // SNAPSHOT: log do estado atual de activeConnections antes de enviar
            try {
              const connKeys = Array.from(activeConnections.keys());
              const snapshot = Array.from(activeConnections.entries()).map(
                ([id, conn]) => ({
                  id,
                  name: conn.restaurant?.name,
                  readyState:
                    conn.ws && typeof conn.ws.readyState !== "undefined"
                      ? conn.ws.readyState
                      : null,
                  connectedAt: conn.connectedAt,
                }),
              );
              console.log("🔎 activeConnections snapshot:", {
                size: activeConnections.size,
                keys: connKeys,
                snapshot,
              });
            } catch (snapErr) {
              console.warn("⚠️ Falha ao gerar snapshot de conexões:", snapErr);
            }

            // aguardamos o resultado do envio ao agente (true = enviado com callback OK)
            const enviado = await sendToAgent(restaurant.id, message.order);
            console.log(`🔁 sendToAgent retornou: ${enviado}`);

            if (enviado) {
              console.log(`🚀 Sucesso no repasse.`);
              // RESPONDE AO SAAS PARA EVITAR TIMEOUT (enviamos ack apenas após callback de envio ao agente)
              ws.send(
                JSON.stringify({
                  type: "print_ack",
                  success: true,
                  printId: message.order.printId,
                }),
              );
            } else {
              console.log(`⚠️ Falha: Agente offline ou erro no envio.`);
              ws.send(
                JSON.stringify({
                  type: "print_error",
                  reason: "Agente offline ou erro no envio",
                }),
              );
            }
          } catch (err) {
            console.error("💥 Erro ao repassar para agente (promise):", err);
            try {
              ws.send(
                JSON.stringify({ type: "print_error", reason: "server_error" }),
              );
            } catch (e) {
              console.error("💥 Falha ao enviar print_error ao SaaS:", e);
            }
          }
        }

        if (message.type === "pong") {
          /* Heartbeat */
        }
      } catch (error) {
        console.error("💥 Erro ao processar JSON:", error);
      }
    });

    // Heartbeat e Close
    const heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN)
        ws.send(JSON.stringify({ type: "ping", timestamp: Date.now() }));
    }, 30000);

    ws.on("close", async () => {
      console.log(`🔌 [${restaurant.name}] Desconectado`);
      clearInterval(heartbeat);
      if (!isSaaS) {
        activeConnections.delete(restaurant.id);
        await db.restaurant.update({
          where: { id: restaurant.id },
          data: { printerStatus: "disconnected" },
        });
      }
    });
  } catch (error) {
    console.error("💥 Erro conexão:", error);
  }
});

async function sendToAgent(restaurantId, orderData) {
  const agentConn = activeConnections.get(restaurantId);
  if (!agentConn) {
    console.log(
      `❌ sendToAgent: sem conexão ativa para restaurant ${restaurantId}. activeConnections.size=${activeConnections.size}`,
    );
    return false;
  }

  if (agentConn.ws.readyState !== WebSocket.OPEN) {
    console.log(`❌ sendToAgent: agente ws state=${agentConn.ws.readyState}`);
    return false;
  }

  // Retornamos uma promise que resolve true somente se o envio ao agente for confirmado pela callback do ws.send
  return new Promise((resolve) => {
    let resolved = false;

    // Timeout razoável para a callback do ws.send
    const sendTimeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        console.error(
          `⏱ sendToAgent: timeout ao enviar para agente ${restaurantId}`,
        );
        resolve(false);
      }
    }, 5000);

    try {
      agentConn.ws.send(
        JSON.stringify({ type: "print_order", order: orderData }),
        (err) => {
          if (resolved) return;
          resolved = true;
          clearTimeout(sendTimeout);
          if (err) {
            console.error("❌ Erro ao enviar para agente:", err);
            resolve(false);
          } else {
            console.log(
              `📤 Pedido ${orderData.printId} encaminhado para agente ${restaurantId}`,
            );
            resolve(true);
          }
        },
      );
    } catch (e) {
      if (resolved) return;
      resolved = true;
      clearTimeout(sendTimeout);
      console.error("💥 Erro inesperado no sendToAgent:", e);
      resolve(false);
    }
  });
}
