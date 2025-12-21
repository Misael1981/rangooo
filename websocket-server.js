// websocket-server.js - APENAS SERVIDOR
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

    const existingConn = activeConnections.get(restaurant.id);

    if (isSaaS) {
      console.log(`🚀 [${restaurant.name}] SaaS conectou apenas para envio`);

      ws.on("message", async (data) => {
        console.log("📥 Mensagem recebida do SaaS:", data.toString());

        const message = JSON.parse(data.toString());

        if (message.type === "print_order") {
          // 1️⃣ ACK IMEDIATO PARA O SAAS
          ws.send(
            JSON.stringify({
              type: "ack",
              success: true,
              printId: msg.order.printId,
            }),
          );

          // 2️⃣ Repassa para o agente (se conectado)
          const agentSocket = agents.get(restaurant.id);

          if (agentSocket) {
            agentSocket.send(
              JSON.stringify({
                type: "print_order",
                order: msg.order,
              }),
            );
          } else {
            console.warn("⚠️ Nenhum agente conectado");
          }
        }
      });

      return;
    } else {
      console.log(`🎉 [${restaurant.name}] AGENTE LOCAL CONECTADO.`);

      activeConnections.set(restaurant.id, {
        ws,
        restaurant,
        connectedAt: new Date(),
      });

      if (!existingConn) {
        await db.restaurant.update({
          where: { id: restaurant.id },
          data: { printerStatus: "connected", lastPrintedAt: null },
        });
        console.log(
          `✅ Status do ${restaurant.name} atualizado para CONNECTED no DB.`,
        );
      }
    }

    // Envia boas-vindas
    ws.send(
      JSON.stringify({
        type: "welcome",
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
      }),
    );

    // Heartbeat
    const heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "ping", timestamp: Date.now() }));
      }
    }, 30000);

    // OUVIR MENSAGENS QUE CHEGAM NO SERVIDOR
    ws.on("message", async (data) => {
      console.log("🔥 CONTEÚDO BRUTO RECEBIDO NO SERVIDOR: ", data.toString());

      try {
        const message = JSON.parse(data.toString());

        // SE A MENSAGEM FOR PRINT_ORDER (Vinda do SaaS)
        if (message.type === "print_order") {
          console.log(
            `🎯 SaaS solicitou repasse para o restaurante: ${restaurant.name}`,
          );

          const enviado = sendToAgent(restaurant.id, message.order);

          if (enviado) {
            console.log(`🚀 Repassado com sucesso para o Agente.`);
          } else {
            console.log(`⚠️ Falha ao repassar: Agente offline.`);
          }
        }

        if (message.type === "pong") {
          /* Heartbeat ok */
        }
      } catch (error) {
        console.error(`💥 Erro ao processar mensagem:`, error);
      }
    });

    ws.on("close", async () => {
      console.log(`🔌 [${restaurant.name}] Desconectado`);
      clearInterval(heartbeat);
      const current = activeConnections.get(restaurant.id);
      if (current && current.ws === ws) {
        activeConnections.delete(restaurant.id);
        await db.restaurant.update({
          where: { id: restaurant.id },
          data: { printerStatus: "disconnected" },
        });
      }
    });
  } catch (error) {
    console.error("💥 Erro conexão:", error);
    ws.close(1011, "Erro interno");
  }
});

// FUNÇÃO DE REPASSE (Não mexer)
function sendToAgent(restaurantId, orderData) {
  const agentConnection = activeConnections.get(restaurantId);

  if (!agentConnection || agentConnection.ws.readyState !== WebSocket.OPEN) {
    return false;
  }

  console.log(
    "📡 Enviando para agente:",
    restaurantId,
    "Socket aberto:",
    agentConnection?.ws.readyState,
  );

  const message = {
    type: "print_order",
    order: {
      ...orderData,
      printId: `print_${orderData.id}_${Date.now()}`,
      requestedAt: new Date().toISOString(),
    },
  };

  try {
    agentConnection.ws.send(JSON.stringify(message));
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { sendToAgent };
