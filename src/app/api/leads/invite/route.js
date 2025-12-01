import { db } from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get("leadId");
    const schema = z.object({ leadId: z.string().min(1) });
    const { leadId: id } = schema.parse({ leadId });

    const invite = await db.enrollmentInvite.findFirst({
      where: { leadId: id, status: "PENDING" },
      orderBy: { createdAt: "desc" },
    });

    if (!invite) {
      return Response.json(
        { error: "Nenhum convite pendente" },
        { status: 404 },
      );
    }

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
