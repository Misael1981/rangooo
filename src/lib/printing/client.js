import { db } from "../prisma";

let WebSocket;
if (typeof window === "undefined") {
  WebSocket = require("ws");
} else {
  WebSocket = window.WebSocket;
}

export async function sendOrderToPrint(
  restaurantId,
  orderData,
  attempt = 1,
  printId = null,
) {
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

    console.log(`🔁 sendOrderToPrint: tentativa ${attempt}`);

    return new Promise((resolve, reject) => {
      const ws = new WebSocket(wsUrl);
      const maxAttempts = 3;

      const timeout = setTimeout(() => {
        ws.terminate();
        if (attempt < maxAttempts) {
          console.warn(
            `🔁 Timeout na tentativa ${attempt}, tentando novamente...`,
          );
          return resolve(
            sendOrderToPrint(
              restaurantId,
              orderData,
              attempt + 1,
              printId || `print_${orderData.id}_${Date.now()}`,
            ),
          );
        }
        reject(new Error("Timeout: servidor não respondeu"));
      }, 10000);

      if (!printId) printId = `print_${orderData.id}_${Date.now()}`;
      let sent = false;
      // Função que efetivamente envia a mensagem, evita envios duplicados
      function doSend() {
        if (sent) return;
        sent = true;

        const printMessage = JSON.stringify({
          type: "print_order",
          order: {
            ...orderData,
            printId,
          },
        });

        console.log("🟢 Conectado ao servidor. Preparando envio... (doSend)");
        console.log("📤 Enviando payload:", printMessage);

        // 1. Envia e loga se houve erro
        ws.send(printMessage, (err) => {
          if (err) {
            console.error("❌ Erro fatal no envio do socket:", err);
            if (!responded) {
              responded = true;
              clearTimeout(timeout);
              if (attempt < maxAttempts) {
                console.warn(
                  `🔁 Erro no envio, tentando novamente... (tentativa ${attempt + 1}/${maxAttempts})`,
                );
                return resolve(
                  sendOrderToPrint(
                    restaurantId,
                    orderData,
                    attempt + 1,
                    printId,
                  ),
                );
              }
              return reject(err);
            }
          } else {
            console.log(
              "📤 Mensagem saiu da Lib. Aguardando confirmação do servidor...",
            );
          }
        });
      }

      ws.on("open", () => {
        // Caso o servidor demore para enviar 'welcome', enviamos após um curto fallback
        const fallback = setTimeout(() => {
          if (!sent) {
            console.warn(
              "⏳ fallback: servidor não enviou 'welcome' rapidamente, enviando de qualquer forma",
            );
            doSend();
          }
        }, 500);

        // Se receber 'welcome', o handler de 'message' vai chamar doSend imediatamente
        ws.once("message", (data) => {
          try {
            const msg = JSON.parse(data.toString());
            if (msg.type === "welcome") {
              console.log("📩 RESPOSTA DO SERVIDOR:", data.toString());
              clearTimeout(fallback);
              doSend();
              return;
            }
          } catch (e) {
            // ignora
          }

          // se for outra coisa, ainda chamamos doSend no fallback
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
          if (attempt < maxAttempts) {
            console.warn(
              `🔁 Erro na tentativa ${attempt}, tentando novamente...`,
            );
            return resolve(
              sendOrderToPrint(restaurantId, orderData, attempt + 1, printId),
            );
          }
          reject(err);
        }
      });

      ws.on("close", () => {
        console.log(`🔌 Conexão encerrada (${restaurant.name})`);
        if (!responded) {
          responded = true;
          clearTimeout(timeout);
          if (attempt < maxAttempts) {
            console.warn(
              `🔁 Conexão fechada na tentativa ${attempt}, tentando novamente...`,
            );
            return resolve(
              sendOrderToPrint(restaurantId, orderData, attempt + 1, printId),
            );
          }
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
