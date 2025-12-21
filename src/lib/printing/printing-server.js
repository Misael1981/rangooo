// src/lib/printing/printing-server.js

import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8081 });

const stores = new Map();

wss.on("connection", (ws, req) => {
  const storeId = req.url.split("/").pop(); // /ws/STORE_ID

  console.log(`🖨️  Store conectada: ${storeId}`);
  stores.set(storeId, { ws, lastPing: Date.now() });

  ws.on("message", (data) => {
    const message = JSON.parse(data);
    handlePrintingMessage(storeId, message);
  });
});

export function sendToStore(storeId, order) {
  const store = stores.get(storeId);
  if (store?.ws.readyState === WebSocket.OPEN) {
    store.ws.send(
      JSON.stringify({
        type: "print_order",
        order,
      }),
    );
    return true;
  }
  return false;
}
