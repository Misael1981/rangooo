// server.js

import { createServer } from "http";
import next from "next";
import { initPrintingWebSocketServer } from "@/lib/printing/ws-server";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(handler);

  // Inicializa WebSocket Server
  initPrintingWebSocketServer(server);

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("🚀 Next.js + WebSocket rodando na porta 3000");
  });
});
