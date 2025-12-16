// src/lib/socket.js

let io;

export function initSocket(serverIo) {
  io = serverIo;
}

export function getIO() {
  if (!global.io) {
    throw new Error("Socket.io não inicializado");
  }
  return global.io;
}
