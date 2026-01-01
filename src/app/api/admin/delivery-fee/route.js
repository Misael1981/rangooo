import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { z } from "zod";

// Validação de entrada
const schema = z.object({
  restaurantId: z.string().uuid(),
  deliveryFee: z.number().min(0),
});

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { restaurantId, deliveryFee } = schema.parse(body);

    await db.restaurant.update({
      where: { id: restaurantId },
      data: {
        deliveryFee,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Erro ao atualizar deliveryFee:", err);

    if (err.name === "ZodError") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
