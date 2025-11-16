import { db } from "@/lib/prisma";
import crypto from "node:crypto";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, name, phone, address } = body;

    if (typeof email !== "string" || !email) {
      return Response.json({ error: "email é obrigatório" }, { status: 400 });
    }
    if (typeof name !== "string" || !name) {
      return Response.json({ error: "name é obrigatório" }, { status: 400 });
    }
    if (typeof phone !== "string" || !phone) {
      return Response.json({ error: "phone é obrigatório" }, { status: 400 });
    }
    if (typeof address !== "object" || address == null) {
      return Response.json({ error: "address é obrigatório" }, { status: 400 });
    }

    const hashed = crypto
      .createHash("sha256")
      .update(crypto.randomUUID())
      .digest("hex");

    const user = await db.user.upsert({
      where: { email },
      update: {
        name,
        phone,
        address,
      },
      create: {
        email,
        password: hashed,
        name,
        phone,
        address,
      },
      select: { id: true, email: true, name: true, phone: true },
    });

    return Response.json({ ok: true, user });
  } catch (err) {
    console.error("POST /api/users error", err);
    return Response.json({ error: "internal_error" }, { status: 500 });
  }
}
