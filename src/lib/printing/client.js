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

    // O NEXT_PUBLIC_ garante que o navegador consiga ler a variável
    const baseUrl =
      process.env.NEXT_PUBLIC_SAAS_WS_URL ||
      "wss://rangooo-ws-server.onrender.com";

    // Montando a URL com os parâmetros que você já tem
    const wsUrl = `${baseUrl}?token=${process.env.WS_SECRET}&restaurantId=${restaurantId}&role=saas`;

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
            restaurantId,
          },
        });

        console.log("🟢 Conectado ao servidor. Preparando envio... (doSend)");
        console.log("📤 Enviando payload:", printMessage);

        console.log("📤 Enviando WS:", {
          type: "print_order",
          restaurantId,
          printId,
        });

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

let socket = null;

export function connectPrintWS({ serverUrl, token }) {
  if (!token) {
    console.warn("⚠️ WS não conectado: token ausente");
    return null;
  }

  if (!serverUrl) {
    console.error("❌ WS não conectado: serverUrl ausente");
    return null;
  }

  if (socket && socket.readyState === WebSocket.OPEN) {
    return socket;
  }

  const url = `${serverUrl}?token=${token}&saas=true`;
  socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("🟢 SaaS conectado ao Print WS");
  };

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log("📥 WS mensagem:", message);
  };

  socket.onerror = (err) => {
    console.error("💥 WS erro:", err);
  };

  socket.onclose = () => {
    console.warn("🔌 WS fechado");
    socket = null;
  };

  return socket;
}

export function sendPrintOrder(order) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    throw new Error("WebSocket não conectado");
  }

  if (!order) {
    throw new Error("Ordem de impressão não fornecida");
  }

  const message = {
    type: "print_order",
    order,
    timestamp: new Date().toISOString(), // opcional: adiciona timestamp
  };

  socket.send(JSON.stringify(message));
  console.log("📤 Enviando ordem de impressão:", message);
}

export function disconnectPrintWS() {
  if (socket) {
    socket.close();
    socket = null;
    console.log("🔌 Print WS desconectado manualmente");
  }
}
