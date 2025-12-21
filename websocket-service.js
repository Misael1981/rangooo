// websocket-service.js - APENAS AS FUNÇÕES (NÃO inicia servidor)
const { activeConnections, db } = require("./websocket-server");

// 🎯 FUNÇÃO PARA ENVIAR PEDIDOS
async function sendOrderToPrint(restaurantId, orderData) {
  console.log(`\n🎯 ENVIANDO PEDIDO PARA AGENT`);
  console.log(`🏪 Restaurant ID: ${restaurantId}`);
  console.log(`📦 Order ID: ${orderData.id}`);

  const connection = activeConnections.get(restaurantId);

  if (!connection) {
    console.log(`❌ Nenhuma conexão ativa para restaurant ${restaurantId}`);
    console.log(`🔍 Conexões ativas:`, Array.from(activeConnections.keys()));
    throw new Error(`Agente do restaurante ${restaurantId} offline`);
  }

  console.log(`👤 Restaurant encontrado: ${connection.restaurant.name}`);
  console.log(`🔌 Estado do WebSocket: ${connection.ws.readyState}`);
  console.log(`📊 Conexões totais: ${activeConnections.size}`);

  if (connection.ws.readyState !== 1) {
    console.log(
      `❌ WebSocket NÃO está aberto! Estado: ${connection.ws.readyState}`,
    );
    console.log(`💡 Estados: 0=CONNECTING, 1=OPEN, 2=CLOSING, 3=CLOSED`);
    throw new Error("Conexão WebSocket não está aberta");
  }

  const printMessage = {
    type: "print_order",
    order: {
      ...orderData,
      printId: `print_${orderData.id}_${Date.now()}`,
      requestedAt: new Date().toISOString(),
    },
  };

  console.log(`📤 Enviando mensagem para ${connection.restaurant.name}:`);
  console.log(JSON.stringify(printMessage, null, 2));

  // Tenta enviar
  try {
    connection.ws.send(JSON.stringify(printMessage));
    console.log(`✅ Mensagem ENVIADA com sucesso!`);
  } catch (error) {
    console.error(`💥 ERRO ao enviar mensagem:`, error.message);
    throw error;
  }

  // Atualiza último pedido impresso
  try {
    await db.restaurant.update({
      where: { id: restaurantId },
      data: { lastPrintedAt: new Date() },
    });
    console.log(`📝 Banco de dados atualizado`);
  } catch (dbError) {
    console.warn(`⚠️ Erro ao atualizar BD:`, dbError.message);
  }

  return printMessage.order.printId;
}

// 🔥 EXPORTA APENAS AS FUNÇÕES
module.exports = {
  sendOrderToPrint,
  getStatus: () => ({
    connections: activeConnections.size,
    restaurants: Array.from(activeConnections.values()).map((c) => ({
      id: c.restaurant.id,
      name: c.restaurant.name,
      connectedAt: c.connectedAt,
      wsState: c.ws.readyState,
    })),
  }),
};
