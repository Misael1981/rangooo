import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { getUserOrders } from "@/data/get-user-my-orders"
import SecondaryHeader from "@/components/SecondaryHeader"
import OrderFilter from "./components/OrderFilter"
import OrderCard from "./components/OrderCard"

export default async function MyOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }> // Tipado como Promise
}) {
  const session = await getServerSession(authOptions)
  const { search } = await searchParams

  if (!session?.user) {
    redirect("/login?callbackUrl=/meus-pedidos")
  }

  const userName = session.user.name
  const orders = await getUserOrders(session.user.id, search)

  return (
    <>
      <SecondaryHeader title="Meus Pedidos" />
      <main className="mx-auto max-w-2xl space-y-4 p-4">
        <div className="rounded-r-2xl border-l-4 border-red-500 bg-linear-to-r from-red-50 to-transparent p-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            Olá, <span className="text-red-600">{userName}</span>!
          </h2>
          <p className="mt-2 max-w-md leading-relaxed text-gray-600">
            Aqui está o seu{" "}
            <span className="font-semibold text-gray-800">
              histórico de sabores
            </span>
            . Bateu aquela saudade daquele lanchão? Use a busca abaixo para
            reencontrar seus estabelecimentos favoritos!
          </p>
        </div>

        <OrderFilter />

        <div className="mt-6 space-y-4">
          {orders.length === 0 ? (
            <p className="text-muted-foreground py-10 text-center">
              Você ainda não fez nenhum pedido. 🍕
            </p>
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </div>
      </main>
    </>
  )
}
