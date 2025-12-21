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
      }, 10000);

      ws.on("open", () => {
        console.log("🟢 Conectado ao servidor. Preparando envio...");

        const printMessage = JSON.stringify({
          type: "print_order",
          order: {
            ...orderData,
            printId: `print_${orderData.id}_${Date.now()}`,
          },
        });

        // 1. Forçamos o envio
        ws.send(printMessage, (err) => {
          if (err) {
            console.error("❌ Erro fatal no envio do socket:", err);
          } else {
            console.log(
              "📤 Mensagem saiu da Lib. Aguardando confirmação do servidor...",
            );
          }
        });
      });

      // 2. LOG DE SEGURANÇA: Vamos ver se o servidor manda QUALQUER coisa
      let responded = false;
      ws.on("message", (data) => {
        console.log("📩 RESPOSTA DO SERVIDOR:", data.toString());
        const msg = JSON.parse(data.toString());

        if (msg.type === "print_ack") {
          console.log("🎯 ACK RECEBIDO! Sucesso total.");
          responded = true;
          clearTimeout(timeout);
          ws.close();
          resolve(msg.printId);
          return;
        }

        if (msg.type === "print_error") {
          console.warn(
            "⚠️ Erro de impressão recebido do servidor:",
            msg.reason || msg,
          );
          responded = true;
          clearTimeout(timeout);
          ws.close();
          reject(new Error(msg.reason || "print_error"));
          return;
        }

        // outros tipos (ex: welcome) são apenas logs de handshake
      });

      ws.on("error", (err) => {
        if (!responded) {
          responded = true;
          clearTimeout(timeout);
          console.error("❌ Erro WS:", err.message);
          reject(err);
        }
      });

      ws.on("close", () => {
        console.log(`🔌 Conexão encerrada (${restaurant.name})`);
        if (!responded) {
          responded = true;
          clearTimeout(timeout);
          reject(
            new Error("Conexão encerrada antes de confirmação do servidor"),
          );
        }
      });
    });
  } catch (error) {
    console.error(`💥 Erro fatal na lib de impressão:`, error);
    return null;
  }
}
