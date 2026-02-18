import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserOrders } from "@/data/get-user-orders";
import OrderCard from "./components/OrderCard";
import OrderFilter from "./components/OrderFilter";
import SecondaryHeader from "@/components/SecondaryHeader";

export default async function MyOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>; // Tipado como Promise
}) {
  const session = await getServerSession(authOptions);
  const { search } = await searchParams;

  if (!session?.user) {
    redirect("/login?callbackUrl=/meus-pedidos");
  }

  const userName = session.user.name;
  const orders = await getUserOrders(session.user.id, search);

  return (
    <>
      <SecondaryHeader title="Meus Pedidos" />
      <main className="mx-auto max-w-2xl p-4 space-y-4">
        <div className="bg-linear-to-r from-red-50 to-transparent border-l-4 border-red-500 p-6 rounded-r-2xl">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Olá, <span className="text-red-600">{userName}</span>!
          </h2>
          <p className="mt-2 text-gray-600 leading-relaxed max-w-md">
            Aqui está o seu{" "}
            <span className="font-semibold text-gray-800">
              histórico de sabores
            </span>
            . Bateu aquela saudade daquele lanchão? Use a busca abaixo para
            reencontrar seus estabelecimentos favoritos!
          </p>
        </div>

        <OrderFilter />

        <div className="space-y-4 mt-6">
          {orders.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">
              Você ainda não fez nenhum pedido. 🍕
            </p>
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </main>
    </>
  );
}
