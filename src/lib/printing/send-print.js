// src/lib/printing/send-print.js
import { WebSocket } from "ws";

export async function sendOrderToPrint(restaurantId, orderData) {
  const { db } = await import("@/lib/db");

  const restaurant = await db.restaurant.findUnique({
    where: { id: restaurantId },
    select: { printingToken: true, name: true },
  });

  if (!restaurant?.printingToken) {
    throw new Error("Restaurante não configurado para impressão");
  }

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(
      `ws://localhost:3001?token=${restaurant.printingToken}&saas=true`,
    );

    const timeout = setTimeout(() => {
      ws.close();
      reject(new Error("Timeout: servidor não respondeu"));
    }, 8000);

    ws.on("open", () => {
      console.log(`🟢 Conectado ao servidor (${restaurant.name})`);

      const printMessage = {
        type: "print_order",
        order: {
          ...orderData,
          printId: `print_${orderData.id}_${Date.now()}`,
          requestedAt: new Date().toISOString(),
        },
      };

      ws.send(JSON.stringify(printMessage));
      console.log("📤 Pedido enviado, aguardando ACK...");
    });

    ws.on("message", (raw) => {
      const msg = JSON.parse(raw.toString());

      if (msg.type === "print_ack") {
        clearTimeout(timeout);
        console.log("✅ ACK recebido do servidor");

        ws.close();
        resolve(msg.printId);
      }
    });

    ws.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}
