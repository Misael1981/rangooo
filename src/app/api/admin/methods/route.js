// PATCH /api/admin/methods

import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// PATCH - Atualizar métodos
export async function PATCH(request) {
  try {
    // Verificar autenticação
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();

    // Validar o payload
    const { methods, paymentMethods } = body;

    if (!Array.isArray(methods) || !Array.isArray(paymentMethods)) {
      return NextResponse.json(
        { error: "Formato de dados inválido" },
        { status: 400 },
      );
    }

    // Validar valores (opcional mas recomendado)
    const validConsumptionMethods = ["DELIVERY", "PICKUP", "DINE_IN"];
    const validPaymentMethods = [
      "CREDIT_CARD",
      "DEBIT_CARD",
      "PIX",
      "CASH",
      "MEAL_VOUCHER",
      "FOOD_VOUCHER",
      "ONLINE",
      "BANK_TRANSFER",
    ];

    const invalidConsumption = methods.filter(
      (m) => !validConsumptionMethods.includes(m),
    );
    const invalidPayment = paymentMethods.filter(
      (p) => !validPaymentMethods.includes(p),
    );

    if (invalidConsumption.length > 0 || invalidPayment.length > 0) {
      return NextResponse.json(
        { error: "Métodos inválidos detectados" },
        { status: 400 },
      );
    }

    const restaurantId = session.user.restaurantId || body.restaurantId;

    if (!restaurantId) {
      return NextResponse.json(
        { error: "ID do restaurante não encontrado" },
        { status: 400 },
      );
    }

    // Iniciar transação para garantir consistência
    const result = await db.$transaction(async (tx) => {
      // 1. Remover métodos antigos
      await tx.consumptionMethod.deleteMany({
        where: { restaurantId },
      });

      await tx.paymentMethod.deleteMany({
        where: { restaurantId },
      });

      // 2. Criar novos métodos
      const consumptionPromises = methods.map((method) =>
        tx.consumptionMethod.create({
          data: {
            method,
            restaurantId,
          },
        }),
      );

      const paymentPromises = paymentMethods.map((method) =>
        tx.paymentMethod.create({
          data: {
            method,
            restaurantId,
          },
        }),
      );

      await Promise.all([...consumptionPromises, ...paymentPromises]);

      // 3. Retornar os dados atualizados
      const updatedConsumption = await tx.consumptionMethod.findMany({
        where: { restaurantId },
        select: { method: true },
      });

      const updatedPayment = await tx.paymentMethod.findMany({
        where: { restaurantId },
        select: { method: true },
      });

      return {
        consumptionMethods: updatedConsumption.map((c) => c.method),
        paymentMethods: updatedPayment.map((p) => p.method),
      };
    });

    return NextResponse.json({
      success: true,
      message: "Métodos atualizados com sucesso",
      data: result,
    });
  } catch (error) {
    console.error("Erro ao atualizar métodos:", error);

    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 },
    );
  }
}

// GET - Buscar métodos
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const restaurantId = session.user.restaurantId;

    if (!restaurantId) {
      return NextResponse.json(
        { error: "Restaurante não encontrado" },
        { status: 400 },
      );
    }

    const [consumptionMethods, paymentMethods] = await Promise.all([
      db.consumptionMethod.findMany({
        where: { restaurantId },
        select: { id: true, method: true, createdAt: true },
      }),
      db.paymentMethod.findMany({
        where: { restaurantId },
        select: { id: true, method: true, createdAt: true },
      }),
    ]);

    return NextResponse.json({
      consumptionMethods,
      paymentMethods,
    });
  } catch (error) {
    console.error("Erro ao buscar métodos:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}
