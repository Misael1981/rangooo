// src/lib/printing/init-websocket.js

import { WebSocketServer } from "ws";
import { db } from "@/lib/prisma";

let wss = null;

// Armazena conexões ativas por restaurante
const activeConnections = new Map();

export function initPrintingWebSocketServer(server) {
  // 🔒 Evita criar múltiplos servidores (HMR / reload do Next)
  if (wss) {
    console.log("⚠️  WebSocket Server já inicializado");
    return wss;
  }

  wss = new WebSocketServer({ noServer: true });

  // Upgrade HTTP → WebSocket
  server.on("upgrade", (request, socket, head) => {
    const pathname = new URL(request.url, `http://${request.headers.host}`)
      .pathname;

    if (pathname === "/api/printing/ws") {
      console.log("🔄 Upgrade para WebSocket em /api/printing/ws");
      wss?.handleUpgrade(request, socket, head, (ws) => {
        wss?.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  // Nova conexão
  wss.on("connection", async (ws, req) => {
    try {
      console.log("🔌 Nova conexão WebSocket");

      // Token via query string
      const url = new URL(req.url, `http://${req.headers.host}`);
      const token = url.searchParams.get("token");

      if (!token) {
        console.warn("❌ Conexão sem token");
        ws.close(1008, "Token não fornecido");
        return;
      }

      const restaurant = await db.restaurant.findFirst({
        where: { printingToken: token },
      });

      if (!restaurant) {
        console.warn("❌ Token inválido");
        ws.close(1008, "Token inválido");
        return;
      }

      console.log(`🖨️  [${restaurant.name}] Agent conectado`);

      activeConnections.set(restaurant.id, {
        ws,
        restaurant,
        connectedAt: new Date(),
      });

      await db.restaurant.update({
        where: { id: restaurant.id },
        data: {
          printerStatus: "connected",
          lastPrintedAt: null,
        },
      });

      // Welcome
      ws.send(
        JSON.stringify({
          type: "welcome",
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          timestamp: new Date().toISOString(),
        }),
      );

      // ❤️ Heartbeat
      const heartbeat = setInterval(() => {
        if (ws.readyState === 1) {
          ws.send(JSON.stringify({ type: "ping", ts: Date.now() }));
        }
      }, 30_000);

      // Mensagens do agent
      ws.on("message", (data) => {
        try {
          const message = JSON.parse(data.toString());

          switch (message.type) {
            case "pong":
              break;

            case "print_status":
              console.log(
                `📊 [${restaurant.name}] Status impressão:`,
                message.status,
              );
              break;

            case "printer_status":
              console.log(
                `🖨️  [${restaurant.name}] Config impressora:`,
                message.config,
              );
              break;

            default:
              console.log(
                `❓ [${restaurant.name}] Mensagem desconhecida`,
                message,
              );
          }
        } catch (err) {
          console.error("💥 Erro ao processar mensagem", err);
        }
      });

      ws.on("close", async () => {
        console.log(`🔌 [${restaurant.name}] Desconectado`);
        clearInterval(heartbeat);
        activeConnections.delete(restaurant.id);

        await db.restaurant.update({
          where: { id: restaurant.id },
          data: { printerStatus: "disconnected" },
        });
      });

      ws.on("error", (err) => {
        console.error(`💥 [${restaurant.name}] Erro WS`, err);
      });
    } catch (err) {
      console.error("💥 Erro geral WS", err);
      ws.close(1011, "Erro interno");
    }
  });

  console.log("✅ WebSocket Server de impressão inicializado");
  return wss;
}

// =========================
// Enviar pedido para impressão
// =========================
export async function sendOrderToPrint(restaurantId, orderData) {
  const connection = activeConnections.get(restaurantId);

  if (!connection || connection.ws.readyState !== 1) {
    throw new Error("Agente de impressão offline");
  }

  const message = {
    type: "print_order",
    order: {
      ...orderData,
      printId: `print_${orderData.id}_${Date.now()}`,
      requestedAt: new Date().toISOString(),
    },
  };

  connection.ws.send(JSON.stringify(message));

  await db.restaurant.update({
    where: { id: restaurantId },
    data: { lastPrintedAt: new Date() },
  });

  return message.order.printId;
}

// =========================
// Status (admin / debug)
// =========================
export function getPrintingStatus() {
  return Array.from(activeConnections.values()).map((conn) => ({
    restaurantId: conn.restaurant.id,
    restaurantName: conn.restaurant.name,
    connectedSince: conn.connectedAt,
    connected: conn.ws.readyState === 1,
    uptime: Date.now() - conn.connectedAt.getTime(),
  }));
}
