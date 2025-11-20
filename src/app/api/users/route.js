import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    let userId = session.user.id;

    if (!userId && session.user.email) {
      const found = await db.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      userId = found?.id;
    }

    if (!userId) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    // Busca usuário COMPLETO
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true, // ← AGORA VEM O ENDEREÇO COMPLETO!
      },
    });

    if (!user) {
      return Response.json({ error: "user_not_found" }, { status: 404 });
    }

    return Response.json({ user });
  } catch (err) {
    console.error("GET /api/users error", err);
    return Response.json({ error: "internal_error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }
    let userId = session.user.id ?? null;
    if (!userId && session.user.email) {
      const found = await db.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      userId = found?.id ?? null;
    }
    if (!userId) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { name, phone, address } = body;

    if (typeof name !== "string" || !name) {
      return Response.json({ error: "name é obrigatório" }, { status: 400 });
    }
    if (typeof phone !== "string" || !phone) {
      return Response.json({ error: "phone é obrigatório" }, { status: 400 });
    }
    if (typeof address !== "object" || address == null) {
      return Response.json({ error: "address é obrigatório" }, { status: 400 });
    }

    const user = await db.user.update({
      where: { id: userId },
      data: { name, phone, address },
      select: { id: true, email: true, name: true, phone: true },
    });

    return Response.json({ ok: true, user });
  } catch (err) {
    console.error("POST /api/users error", err);
    return Response.json({ error: "internal_error" }, { status: 500 });
  }
}
