let socket = null;

export function connectPrintWS({ serverUrl, token }) {
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

    if (message.type === "print_ack") {
      console.log("✅ Pedido confirmado pelo servidor", message.printId);
    }

    if (message.type === "print_error") {
      console.error("❌ Erro no print:", message.reason);
    }
  };

  socket.onerror = (err) => {
    console.error("💥 WS erro:", err);
  };

  socket.onclose = () => {
    console.warn("🔌 WS fechado, tentando reconectar...");
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
