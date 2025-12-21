// printing-ws-server.js - Serviço WebSocket independente
require("dotenv").config();
const WebSocket = require("ws");
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();
const wss = new WebSocket.Server({ port: 3001 });

console.log("🟢 WebSocket Server de impressão rodando na porta 3001");

const activeConnections = new Map();

wss.on("connection", async (ws, req) => {
  try {
    console.log("🔌 Nova tentativa de conexão WebSocket");

    // Extrai token da URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get("token");

    if (!token) {
      console.log("❌ Conexão rejeitada: token não fornecido");
      ws.close(1008, "Token não fornecido");
      return;
    }

    console.log("🔑 Token recebido:", token.substring(0, 20) + "...");

    // Busca restaurant
    const restaurant = await db.restaurant.findFirst({
      where: { printingToken: token },
    });

    if (!restaurant) {
      console.log("❌ Token inválido");
      ws.close(1008, "Token inválido");
      return;
    }

    console.log(`🎉 [${restaurant.name}] Agent conectado via WebSocket!`);

    // Armazena conexão
    activeConnections.set(restaurant.id, {
      ws,
      restaurant,
      connectedAt: new Date(),
    });

    // Atualiza status no banco
    await db.restaurant.update({
      where: { id: restaurant.id },
      data: {
        printerStatus: "connected",
        lastPrintedAt: null,
      },
    });

    // Envia welcome
    ws.send(
      JSON.stringify({
        type: "welcome",
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        timestamp: new Date().toISOString(),
        message: "Conectado ao sistema de impressão",
      }),
    );

    // Heartbeat
    const heartbeat = setInterval(() => {
      if (ws.readyState === 1) {
        ws.send(JSON.stringify({ type: "ping", timestamp: Date.now() }));
      }
    }, 30000);

    // Mensagens do agent
    ws.on("message", async (data) => {
      try {
        const message = JSON.parse(data.toString());

        switch (message.type) {
          case "pong":
            // Heartbeat response, tudo ok
            break;

          case "print_status":
            console.log(`📊 [${restaurant.name}] Status:`, message.status);
            break;

          case "print_order_response":
            console.log(
              `✅ [${restaurant.name}] Pedido impresso:`,
              message.orderId,
            );
            break;

          case "printer_status":
            console.log(`🖨️  [${restaurant.name}] Config:`, message.config);
            // Atualiza configuração no banco se necessário
            break;

          default:
            console.log(
              `❓ [${restaurant.name}] Tipo desconhecido:`,
              message.type,
            );
        }
      } catch (error) {
        console.error(`💥 [${restaurant.name}] Erro processamento:`, error);
      }
    });

    // Limpeza
    ws.on("close", async () => {
      console.log(`🔌 [${restaurant.name}] Desconectado`);
      clearInterval(heartbeat);
      activeConnections.delete(restaurant.id);

      await db.restaurant.update({
        where: { id: restaurant.id },
        data: { printerStatus: "disconnected" },
      });
    });

    ws.on("error", (error) => {
      console.error(`💥 [${restaurant.name}] Erro WS:`, error);
    });
  } catch (error) {
    console.error("💥 Erro na conexão WebSocket:", error);
    ws.close(1011, "Erro interno");
  }
});

// Exporta função para enviar pedidos (será usada pelas API Routes)
async function sendOrderToPrint(restaurantId, orderData) {
  const connection = activeConnections.get(restaurantId);

  if (!connection) {
    throw new Error(`Agente do restaurante ${restaurantId} offline`);
  }

  if (connection.ws.readyState !== 1) {
    throw new Error("Conexão WebSocket não está aberta");
  }

  const printMessage = {
    type: "print_order",
    order: {
      ...orderData,
      printId: `print_${orderData.id}_${Date.now()}`,
      requestedAt: new Date().toISOString(),
    },
  };

  console.log(`📤 Enviando pedido para ${connection.restaurant.name}`);

  connection.ws.send(JSON.stringify(printMessage));

  // Atualiza último pedido impresso
  await db.restaurant.update({
    where: { id: restaurantId },
    data: { lastPrintedAt: new Date() },
  });

  return printMessage.order.printId;
}

// Exporta para uso em outros arquivos
module.exports = {
  sendOrderToPrint,
  getActiveConnections: () => activeConnections.size,
  getStatus: () =>
    Array.from(activeConnections.entries()).map(([id, conn]) => ({
      restaurantId: id,
      restaurantName: conn.restaurant.name,
      connected: conn.ws.readyState === 1,
    })),
};

// Se executado diretamente, inicia o servidor
if (require.main === module) {
  console.log("🚀 Iniciando serviço WebSocket de impressão...");
  // O servidor já está ouvindo na porta 3001
}
