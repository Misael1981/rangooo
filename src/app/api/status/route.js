// app/api/restaurants/[id]/status/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request) {
  try {
    const { id, isOpen } = await request.json();
    if (!id || typeof isOpen !== "boolean") {
      return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
    }

    // Atualiza no banco
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id },
      data: { isOpen },
      select: {
        id: true,
        name: true,
        isOpen: true,
        slug: true,
      },
    });

    // 1. Invalidar cache se estiver usando
    // 2. Enviar notificação em tempo real (WebSocket)
    // 3. Logar a ação

    return NextResponse.json({
      success: true,
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar status do restaurante" },
      { status: 500 },
    );
  }
}
