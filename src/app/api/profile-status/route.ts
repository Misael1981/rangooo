import { getSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session?.user?.id) {
    return NextResponse.json({ isProfileCompleted: false, userData: null });
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      addresses: true,
    },
  });

  return NextResponse.json({
    isProfileCompleted: user?.isProfileCompleted ?? false,
    userData: user,
  });
}
