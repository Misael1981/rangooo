export const dynamic = "force-dynamic";

import HeaderInfosPage from "@/components/HeaderInfosPage";
import { db } from "@/lib/prisma";
import ModosPagamentoCard from "./components/ModosPagamentoCard";
import QrCode from "@/components/QrCode";

export default async function ModosPagamentoPage({ searchParams }) {
  const { slug } = await searchParams;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: { paymentMethods: true },
  });
  const { paymentMethods } = restaurant;

  return (
    <div className="relative min-h-screen bg-white sm:py-6">
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <QrCode />
      </div>

      <div className="mx-auto max-w-xl shadow-all-sides">
        <div className="w-full">
          <HeaderInfosPage title="Formas de Pagamento" />
          <ModosPagamentoCard paymentMethod={paymentMethods} />
        </div>
      </div>

      <div className="fixed bottom-8 right-8 hidden lg:block">
        <QrCode />
      </div>
    </div>
  );
}
