// print-client.js - Cliente para enviar pedidos
const WebSocket = require("ws");
const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function sendOrderToPrint(restaurantId, orderData) {
  console.log(`\n🎯 ENVIANDO PEDIDO PARA AGENT`);
  console.log(`🏪 Restaurant ID: ${restaurantId}`);
  console.log(`📦 Order ID: ${orderData.id}`);

  // Busca token do restaurant
  const restaurant = await db.restaurant.findUnique({
    where: { id: restaurantId },
    select: { printingToken: true, name: true },
  });

  if (!restaurant?.printingToken) {
    console.log(`❌ Restaurant ${restaurantId} não tem token`);
    throw new Error("Restaurante não configurado para impressão");
  }

  console.log(`👤 Restaurant: ${restaurant.name}`);
  console.log(`🔑 Token: ${restaurant.printingToken.substring(0, 20)}...`);

  // Conecta ao WebSocket Server
  const wsUrl = `ws://localhost:3001?token=${restaurant.printingToken}`;
  console.log(`🔌 Conectando em: ${wsUrl}`);

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);

    const timeout = setTimeout(() => {
      console.log("⏰ Timeout de conexão");
      ws.close();
      reject(new Error("Timeout de conexão WebSocket"));
    }, 10000);

    ws.on("open", () => {
      console.log("✅ Conectado ao WebSocket Server");

      const printMessage = {
        type: "print_order",
        order: {
          ...orderData,
          printId: `print_${orderData.id}_${Date.now()}`,
          requestedAt: new Date().toISOString(),
        },
      };

      console.log(`📤 Enviando pedido...`);
      console.log(JSON.stringify(printMessage, null, 2));

      ws.send(JSON.stringify(printMessage));
      console.log(`✅ Mensagem enviada!`);

      clearTimeout(timeout);

      // Fecha após 2 segundos
      setTimeout(() => {
        ws.close();
        console.log(`🔌 Conexão fechada`);
        resolve(printMessage.order.printId);
      }, 2000);
    });

    ws.on("message", (data) => {
      const message = JSON.parse(data.toString());
      console.log(`📩 Resposta do Server: ${message.type}`);
    });

    ws.on("error", (error) => {
      console.error(`💥 Erro WebSocket:`, error.message);
      clearTimeout(timeout);
      reject(error);
    });

    ws.on("close", () => {
      console.log(`🔌 Conexão fechada pelo server`);
    });
  });
}

// Teste
async function test() {
  console.log("🧪 Testando cliente de impressão...");

  const restaurantId = "b7a8ae0d-df91-4037-822a-a43ecac1c993";

  const orderData = {
    id: "CLIENT-TEST-" + Date.now(),
    customerName: "Cliente Teste",
    items: [{ name: "Pizza Teste", quantity: 2, price: 35.9 }],
    subtotal: 71.8,
    deliveryFee: 5.0,
    total: 76.8,
    paymentMethod: "Cartão",
  };

  try {
    const printId = await sendOrderToPrint(restaurantId, orderData);
    console.log("🎉 SUCESSO! Print ID:", printId);
  } catch (error) {
    console.error("❌ ERRO:", error.message);
  }

  await db.$disconnect();
}

// Se executado diretamente, faz teste
if (require.main === module) {
  test();
}

module.exports = { sendOrderToPrint };
