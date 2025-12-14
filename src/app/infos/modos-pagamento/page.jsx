export const dynamic = "force-dynamic";

import HeaderInfosPage from "@/components/HeaderInfosPage";
import { db } from "@/lib/prisma";
import ModosPagamentoCard from "./components/ModosPagamentoCard";

export default async function ModosPagamentoPage({ searchParams }) {
  const { slug } = await searchParams;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: { paymentMethods: true },
  });
  const { paymentMethods } = restaurant;
  console.log("Metodos de pagamento: ", paymentMethods);

  return (
    <div className="w-full">
      <HeaderInfosPage title="Formas de Pagamento" />
      <ModosPagamentoCard paymentMethod={paymentMethods} />
    </div>
  );
}
