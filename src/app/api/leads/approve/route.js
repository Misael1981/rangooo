import { db } from "@/lib/prisma";
import { z } from "zod";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const schema = z.object({ id: z.string().min(1) });
    const { id } = schema.parse(body);

    const lead = await db.leadApplication.findUnique({ where: { id } });
    if (!lead)
      return Response.json({ error: "Lead não encontrado" }, { status: 404 });
    if (lead.status !== "PENDING")
      return Response.json({ error: "Lead já processado" }, { status: 400 });

    const existingInvite = await db.enrollmentInvite.findFirst({
      where: { leadId: id, status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });
    if (existingInvite)
      return Response.json({ success: true, invite: existingInvite });

    const now = new Date();
    const invite = await db.enrollmentInvite.create({
      data: {
        leadId: id,
        email: lead.email,
        token: randomUUID(),
        expiresAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        status: "PENDING",
      },
    });

    await db.leadApplication.update({
      where: { id },
      data: {
        status: "APPROVED",
        approvedAt: now,
        approvedBy: session.user.id,
      },
    });

    return Response.json({ success: true, invite });
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
