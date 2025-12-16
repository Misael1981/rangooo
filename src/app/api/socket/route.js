import { NextResponse } from "next/server";
import { Server } from "socket.io";

let io;

export async function GET() {
  if (!io) {
    console.log("🔥 Inicializando Socket.IO (App Router)");

    io = new Server({
      path: "/api/socket",
      cors: { origin: "*" },
    });

    global.io = io;

    io.on("connection", (socket) => {
      const restaurantId = socket.handshake.query.restaurantId;

      console.log("🟢 Conectado:", socket.id);
      console.log("🍕 Restaurante:", restaurantId);

      if (restaurantId) {
        socket.join(restaurantId);
      }

      socket.on("disconnect", () => {
        console.log("🔴 Desconectado:", socket.id);
      });
    });
  }

  return NextResponse.json({ ok: true });
}
