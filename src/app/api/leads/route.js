import { db } from "@/lib/prisma";
import { z } from "zod";

export async function POST(request) {
  try {
    const body = await request.json();

    const schema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().min(10),
      restaurantName: z.string().min(2),
      city: z.string().min(2),
      state: z.string().length(2).transform((s) => s.toUpperCase()),
      notes: z.string().optional(),
    });
    const data = schema.parse(body);

    const existing = await db.leadApplication.findFirst({
      where: {
        status: "PENDING",
        OR: [{ email: data.email }, { phone: data.phone }],
      },
    });
    if (existing) {
      return Response.json({ success: true, lead: existing, duplicate: true });
    }

    const lead = await db.leadApplication.create({
      data,
    });

    return Response.json({ success: true, lead });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Dados inválidos", issues: error.issues }, { status: 422 });
    }
    console.error("Erro ao criar lead:", error);
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}
