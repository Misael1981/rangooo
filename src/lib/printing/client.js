import { db } from "../prisma";

let WebSocket;
if (typeof window === "undefined") {
  WebSocket = require("ws");
} else {
  WebSocket = window.WebSocket;
}

export async function sendOrderToPrint(restaurantId, orderData) {
  if (typeof window !== "undefined") {
    console.warn("⚠️ sendOrderToPrint chamado no cliente, ignorando");
    return null;
  }

  try {
    const restaurant = await db.restaurant.findUnique({
      where: { id: restaurantId },
      select: { printingToken: true, name: true, printerStatus: true },
    });

    if (
      !restaurant?.printingToken ||
      restaurant.printerStatus !== "connected"
    ) {
      console.warn(
        `⚠️ Impressora do ${restaurant?.name || restaurantId} está offline ou não configurada`,
      );
      return null;
    }

    console.log(
      `📤 Iniciando envio do pedido ${orderData.id} para ${restaurant.name}...`,
    );

    const wsUrl = `ws://localhost:3001?token=${restaurant.printingToken}&saas=true`;

    return new Promise((resolve, reject) => {
      const ws = new WebSocket(wsUrl);

      const timeout = setTimeout(() => {
        ws.terminate();
        reject(new Error("Timeout: servidor não respondeu"));
      }, 7000);

      ws.on("open", () => {
        console.log(`🟢 Conectado ao servidor (${restaurant.name})`);

        const message = {
          type: "print_order",
          order: {
            ...orderData,
            printId: `print_${orderData.id}_${Date.now()}`,
            requestedAt: new Date().toISOString(),
          },
        };

        ws.send(JSON.stringify(message), (err) => {
          if (err) {
            clearTimeout(timeout);
            ws.close();
            return reject(err);
          }

          console.log("📤 Pedido enviado, aguardando ACK...");
        });
      });

      ws.on("message", (data) => {
        const msg = JSON.parse(data.toString());

        if (msg.type === "ack") {
          clearTimeout(timeout);
          console.log("✅ ACK recebido do servidor");
          ws.close();
          resolve(msg.success);
        }
      });

      ws.on("error", (err) => {
        clearTimeout(timeout);
        console.error("❌ Erro WS:", err.message);
        reject(err);
      });

      ws.on("close", () => {
        console.log(`🔌 Conexão encerrada (${restaurant.name})`);
      });
    });
  } catch (error) {
    console.error(`💥 Erro fatal na lib de impressão:`, error);
    return null;
  }
}
