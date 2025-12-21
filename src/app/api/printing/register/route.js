import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { restaurantId, restaurantName, agentVersion, printerConfig } = body;

    console.log("📝 Registro de agent recebido:", {
      restaurantId,
      restaurantName,
    });

    // 1. Valida se o restaurant existe
    const restaurant = await db.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      console.error("❌ Restaurant não encontrado:", restaurantId);
      return NextResponse.json(
        { error: "Estabelecimento não encontrado" },
        { status: 404 },
      );
    }

    // 2. Gera ou recupera token de impressão
    let printingToken = restaurant.printingToken;

    if (!printingToken) {
      printingToken = `print_${restaurantId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      console.log("🔑 Novo token gerado:", printingToken);
    } else {
      console.log("🔑 Token existente recuperado:", printingToken);
    }

    // 3. Atualiza o restaurant no banco
    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        printingToken,
        agentVersion: agentVersion || "1.0.0",
        printerConfig: printerConfig || {},
        printerStatus: "connected",
        lastPrintedAt: null,
      },
    });

    // 4. Retorna resposta para o agent
    const responseData = {
      success: true,
      token: printingToken,
      wsUrl:
        process.env.NODE_ENV === "production"
          ? `wss://${request.headers.get("host")}/api/printing/ws`
          : `ws://localhost:3001`,
      restaurant: {
        id: restaurantId,
        name: restaurant.name,
        config: printerConfig || {},
      },
      heartbeatInterval: 30000,
      reconnectInterval: 5000,
    };

    console.log("✅ Registro bem sucedido para:", restaurant.name);
    console.log("🔌 WS URL enviada:", responseData.wsUrl);

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("💥 Erro no registro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor", details: error.message },
      { status: 500 },
    );
  }
}
