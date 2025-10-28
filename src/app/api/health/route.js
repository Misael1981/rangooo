import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.restaurant.count();
    return new Response(JSON.stringify({ ok: true, restaurants: count }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
