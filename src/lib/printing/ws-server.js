import { db } from "@/lib/prisma";
import { WebSocketServer } from "ws";

// Armazena conexões ativas
const activeConnections = new Map();

export function initPrintingWebSocketServer(server) {
  const wss = new WebSocketServer({
    noServer: true, // IMPORTANTE para Next.js
  });

  // Upgrade HTTP para WebSocket
  server.on("upgrade", (request, socket, head) => {
    const pathname = new URL(request.url, `http://${request.headers.host}`)
      .pathname;

    if (pathname === "/api/printing/ws") {
      console.log("🔄 Upgrade para WebSocket em /api/printing/ws");
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on("connection", async (ws, req) => {
    try {
      console.log("🔌 Nova conexão WebSocket recebida");

      // Extrai token da URL: ws://.../api/printing/ws?token=XXX
      const url = new URL(req.url, `http://${req.headers.host}`);
      const token = url.searchParams.get("token");

      console.log("🔑 Token recebido:", token ? "Sim" : "Não");

      if (!token) {
        console.warn("❌ Conexão sem token, fechando...");
        ws.close(1008, "Token não fornecido");
        return;
      }

      // Busca restaurant pelo token
      const restaurant = await db.restaurant.findFirst({
        where: { printingToken: token },
      });

      if (!restaurant) {
        console.warn("❌ Token inválido:", token);
        ws.close(1008, "Token inválido");
        return;
      }

      console.log(`🖨️  [${restaurant.name}] Agent WebSocket conectado!`);

      // Armazena conexão
      activeConnections.set(restaurant.id, {
        ws,
        restaurant,
        connectedAt: new Date(),
      });

      // Atualiza status
      await db.restaurant.update({
        where: { id: restaurant.id },
        data: {
          printerStatus: "connected",
          lastPrintedAt: null,
        },
      });

      // Envia mensagem de boas-vindas
      ws.send(
        JSON.stringify({
          type: "welcome",
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          timestamp: new Date().toISOString(),
          message: "Conectado ao sistema de impressão",
        }),
      );

      console.log(`✅ [${restaurant.name}] Conexão estabelecida`);

      // Heartbeat - mantém conexão viva
      const heartbeatInterval = setInterval(() => {
        if (ws.readyState === 1) {
          // OPEN
          ws.send(JSON.stringify({ type: "ping", timestamp: Date.now() }));
        }
      }, 30000);

      // Trata mensagens do Agent
      ws.on("message", async (data) => {
        try {
          const message = JSON.parse(data.toString());
          console.log(`📩 [${restaurant.name}] Mensagem:`, message.type);

          switch (message.type) {
            case "pong":
              // Resposta do heartbeat
              break;

            case "print_status":
              console.log(
                `📊 [${restaurant.name}] Status impressão:`,
                message.status,
              );
              break;

            case "printer_status":
              console.log(
                `🖨️  [${restaurant.name}] Status da impressora:`,
                message.config,
              );
              break;

            default:
              console.log(
                `❓ [${restaurant.name}] Mensagem desconhecida:`,
                message.type,
              );
          }
        } catch (error) {
          console.error(
            `💥 [${restaurant.name}] Erro ao processar mensagem:`,
            error,
          );
        }
      });

      // Limpeza na desconexão
      ws.on("close", async () => {
        console.log(`🔌 [${restaurant.name}] WebSocket desconectado`);
        clearInterval(heartbeatInterval);
        activeConnections.delete(restaurant.id);

        await db.restaurant.update({
          where: { id: restaurant.id },
          data: { printerStatus: "disconnected" },
        });
      });

      ws.on("error", (error) => {
        console.error(`💥 [${restaurant.name}] Erro WebSocket:`, error);
      });
    } catch (error) {
      console.error("💥 Erro na conexão WebSocket:", error);
      ws.close(1011, "Erro interno");
    }
  });

  console.log("✅ WebSocket Server para impressão inicializado");
  return wss;
}

// Função para enviar pedido para impressão
export async function sendOrderToPrint(restaurantId, orderData) {
  const connection = activeConnections.get(restaurantId);

  if (!connection) {
    console.log(`❌ Agent do restaurante ${restaurantId} offline`);
    throw new Error(`Agente do estabelecimento ${restaurantId} offline`);
  }

  if (connection.ws.readyState !== 1) {
    console.log(`❌ Conexão WebSocket não está aberta para ${restaurantId}`);
    throw new Error(`Conexão WebSocket não está aberta`);
  }

  const printMessage = {
    type: "print_order",
    order: {
      ...orderData,
      printId: `print_${orderData.id}_${Date.now()}`,
      requestedAt: new Date().toISOString(),
    },
  };

  console.log(
    `📤 Enviando pedido para ${connection.restaurant.name}:`,
    orderData.id,
  );

  connection.ws.send(JSON.stringify(printMessage));

  // Atualiza último pedido impresso
  await db.restaurant.update({
    where: { id: restaurantId },
    data: { lastPrintedAt: new Date() },
  });

  console.log(`✅ Pedido ${orderData.id} enviado para impressão`);

  return printMessage.order.printId;
}

// Status das conexões (para dashboard admin)
export function getPrintingStatus() {
  const status = [];

  for (const [restaurantId, conn] of activeConnections.entries()) {
    status.push({
      restaurantId,
      restaurantName: conn.restaurant.name,
      connected: conn.ws.readyState === 1,
      connectedSince: conn.connectedAt,
      uptime: Date.now() - conn.connectedAt.getTime(),
      agentVersion: conn.restaurant.agentVersion,
    });
  }

  return status;
}
