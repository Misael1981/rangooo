// src/pages/api/socket.js
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: "/api/socket",
    addTrailingSlash: false,
  });
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    const { restaurantId } = socket.handshake.query;
    console.log(`✅ Restaurante conectado no Socket: ${restaurantId}`);
    socket.join(restaurantId);

    socket.on("print_test", (data) => {
      io.to(restaurantId).emit("new_order", data);
    });
  });

  res.end();
}
