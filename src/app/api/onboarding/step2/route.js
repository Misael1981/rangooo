// POST /api/onboarding/step2/route.js

import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Step2Schema } from "@/schemas/storeSchema";

export async function POST(request) {
  try {
    const body = await request.json();

    const { restaurantId, userId, ...data } = body;

    if (!restaurantId || !userId) {
      return NextResponse.json(
        { message: "restaurantId ou userId ausente na requisição." },
        { status: 401 },
      );
    }

    // 2. VALIDAÇÃO ZOD COMPLETA
    const validation = Step2Schema.safeParse(data);

    if (!validation.success) {
      console.error("Erro de validação:", validation.error.flatten());
      return NextResponse.json(
        {
          message: "Erro de validação",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { store, openingHours } = validation.data;

    // 3. OPERAÇÃO ATÔMICA (TRANSAÇÃO PRISMA)
    const result = await db.$transaction(async (prisma) => {
      const updatedRestaurant = await prisma.restaurant.update({
        where: {
          id: restaurantId,
          userId: userId,
        },
        data: {
          // Dados do 'store'
          name: store.name,
          category: store.category,
          email: store.email,
          slug: store.slug,
          description: store.description,
          avatarImageUrl: store.avatarImageUrl,
          coverImageUrl: store.coverImageUrl,
          street: store.street,
          number: store.number,
          complement: store.complement,
          city: store.city,
          state: store.state,
          zipCode: store.zipCode,
          neighborhood: store.neighborhood,

          // Arrays e Objetos JSON
          consumptionMethods: store.consumptionMethods,
          paymentMethods: store.paymentMethods,
          socialMedia: store.socialMedia,
          contacts: store.contacts,
          // Se 'address' for um modelo relacionado, teremos que fazer outro update aqui (ex: prisma.address.update).
        },
        select: { id: true, slug: true },
      });

      // B. SINCRONIZAÇÃO DOS HORÁRIOS DE FUNCIONAMENTO (7 dias)
      const hoursSync = openingHours.businessHours.map((day) => {
        const uniqueKey = {
          restaurantId: updatedRestaurant.id,
          dayOfWeek: day.dayOfWeek,
        };

        return prisma.businessHours.upsert({
          where: {
            restaurantId_dayOfWeek: uniqueKey,
          },
          update: {
            isClosed: day.isClosed,
            timeSlots: day.timeSlots,
          },
          create: {
            ...uniqueKey,
            isClosed: day.isClosed,
            timeSlots: day.timeSlots,
            displayOrder: day.dayOfWeek,
          },
        });
      });

      await Promise.all(hoursSync);

      return updatedRestaurant;
    });

    // 4. RETORNO DE SUCESSO
    return NextResponse.json(
      {
        message: "Dados do estabelecimento e horários atualizados com sucesso.",
        establishmentId: result.id,
        slug: result.slug,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro na API Step 2:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        {
          message: "Estabelecimento não encontrado ou usuário não autorizado.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Erro interno ao salvar os dados.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
