import { db } from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const schema = z.object({
  token: z.string().min(1),
  data: z.object({
    establishmentName: z.string().min(2),
    slogan: z.string().optional(),
    category: z.string().min(1),
    emailEstablishment: z.string().email(),
    contacts: z.array(z.string()).default([]),
    socialMedia: z
      .object({
        facebook: z.string().url().optional(),
        instagram: z.string().url().optional(),
      })
      .optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    logoUrl: z.string().url().optional(),
    coverImageUrl: z.string().url().optional(),
    menuCategory: z.array(z.string()).default([]),
    products: z
      .array(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          price: z.number(),
          category: z.string(),
          imageUrl: z.string().url().optional(),
          ingredients: z.array(z.string()).default([]),
        }),
      )
      .default([]),
    businessHours: z
      .array(
        z.object({
          dayOfWeek: z.number(),
          isClosed: z.boolean(),
          timeSlots: z
            .array(
              z.object({
                open: z.string(),
                close: z.string(),
                type: z.string().optional(),
              }),
            )
            .default([]),
        }),
      )
      .default([]),
    paymentMethods: z
      .array(
        z
          .enum([
            "CREDIT_CARD",
            "DEBIT_CARD",
            "PIX",
            "BANK_TRANSFER",
            "CASH",
            "MEAL_VOUCHER",
            "FOOD_VOUCHER",
            "ONLINE",
          ])
          .optional(),
      )
      .default([]),
    consumptionMethods: z
      .array(z.enum(["DINE_IN", "PICKUP", "DELIVERY"]).optional())
      .default([]),
  }),
});

function slugify(input) {
  return String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return Response.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { token, data } = schema.parse(body);

    const invite = await db.enrollmentInvite.findFirst({
      where: { token, status: "PENDING", expiresAt: { gt: new Date() } },
    });
    if (!invite)
      return Response.json({ error: "Convite inválido" }, { status: 400 });

    const slug = slugify(data.establishmentName);

    const result = await db.$transaction(async (tx) => {
      const restaurant = await tx.restaurant.create({
        data: {
          ownerId: session.user.id,
          name: data.establishmentName,
          slug,
          description: data.slogan ?? null,
          avatarImageUrl: data.logoUrl || null,
          coverImageUrl: data.coverImageUrl || null,
          category: "RESTAURANT",
          latitude: "0",
          longitude: "0",
          address: `${data.street ?? ""} ${data.number ?? ""}`.trim(),
          street: data.street ?? null,
          number: data.number ?? null,
          complement: data.complement ?? null,
          city: data.city ?? null,
          state: data.state ?? null,
          email: data.emailEstablishment ?? null,
          socialMedia: data.socialMedia ?? null,
          brandColors: null,
        },
      });

      const categoriesMap = {};
      for (const name of data.menuCategory) {
        const mc = await tx.menuCategory.create({
          data: { name, restaurantId: restaurant.id },
        });
        categoriesMap[name] = mc.id;
      }

      for (const p of data.products) {
        const mcId = categoriesMap[p.category];
        if (!mcId) continue;
        await tx.product.create({
          data: {
            restaurantId: restaurant.id,
            menuCategoryId: mcId,
            name: p.name,
            description: p.description ?? null,
            price: p.price,
            imageUrl: p.imageUrl || null,
            ingredients: p.ingredients,
          },
        });
      }

      for (const pm of data.paymentMethods ?? []) {
        await tx.restaurantPaymentMethod.create({
          data: { restaurantId: restaurant.id, method: pm },
        });
      }

      for (const cm of data.consumptionMethods ?? []) {
        await tx.restaurantConsumptionMethod.create({
          data: { restaurantId: restaurant.id, method: cm },
        });
      }

      for (const bh of data.businessHours ?? []) {
        await tx.businessHours.create({
          data: {
            restaurantId: restaurant.id,
            dayOfWeek: bh.dayOfWeek,
            timeSlots: bh.timeSlots,
            isClosed: bh.isClosed,
            displayOrder: bh.dayOfWeek,
          },
        });
      }

      await tx.enrollmentInvite.update({
        where: { id: invite.id },
        data: { status: "USED", usedAt: new Date() },
      });

      return restaurant;
    });

    return Response.json({ success: true, restaurant: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: "Dados inválidos", issues: error.issues },
        { status: 422 },
      );
    }
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}
