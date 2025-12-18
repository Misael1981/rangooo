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
      const { restaurantId } = socket.handshake.query;
      if (restaurantId) socket.join(restaurantId);

      // 1. Ouvir o teste vindo do Botão do Painel
      socket.on("print_test", (dados) => {
        console.log(`🚀 Repassando teste para sala: ${dados.restaurantId}`);
        // Envia apenas para os Agentes na sala do restaurante
        io.to(dados.restaurantId).emit("new_order", dados);
      });

      // 2. Ouvir pedidos REAIS vindos do createOrder (se usar emit direto)
      socket.on("new_order", (dados) => {
        io.to(dados.restaurantId).emit("new_order", dados);
      });
    });
  }

  return NextResponse.json({ ok: true });
}
