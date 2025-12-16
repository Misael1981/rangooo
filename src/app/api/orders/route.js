import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getIO } from "@/lib/socket";

const ALLOWED = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "READY_FOR_PICKUP",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELED",
];

export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const id = String(body?.id || "");
    const status = String(body?.status || "").toUpperCase();

    if (!id || !ALLOWED.includes(status)) {
      return Response.json({ error: "invalid_params" }, { status: 400 });
    }

    const order = await db.order.findUnique({
      where: { id },
      select: { id: true, restaurant: { select: { ownerId: true } } },
    });
    if (!order) {
      return Response.json({ error: "order_not_found" }, { status: 404 });
    }

    const isOwner = order.restaurant.ownerId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";
    if (!isOwner && !isAdmin) {
      return Response.json({ error: "forbidden" }, { status: 403 });
    }

    const updated = await db.order.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        createdAt: true,
        restaurantId: true,
        items: {
          select: {
            quantity: true,
            priceAtOrder: true,
            product: { select: { name: true } },
          },
        },
      },
    });

    if (status === "CONFIRMED") {
      const io = getIO();

      io.to(updated.restaurantId).emit("new_order", {
        id: updated.id,
        total: updated.totalAmount,
        itens: updated.items.map((item) => ({
          qtd: item.quantity,
          nome: item.product.name,
          preco: item.priceAtOrder,
        })),
      });

      console.log("🖨️ Pedido enviado para impressão:", updated.id);
    }

    return Response.json({ success: true, order: updated });
  } catch (err) {
    console.error("PATCH /api/orders error", err);
    return Response.json({ error: "internal_error" }, { status: 500 });
  }
}
