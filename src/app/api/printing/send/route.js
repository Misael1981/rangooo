import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { restaurantId, orderData } = body;

    console.log("📤 API: Enviando pedido", orderData.id);

    // Importa o cliente
    const { sendOrderToPrint } = require("../../../../print-client");

    const printId = await sendOrderToPrint(restaurantId, orderData);

    return NextResponse.json({
      success: true,
      printId,
      message: "Pedido enviado para impressão",
    });
  } catch (error) {
    console.error("💥 API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
