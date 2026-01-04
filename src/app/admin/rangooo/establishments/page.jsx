export const dynamic = "force-dynamic";

import { db } from "@/lib/prisma";
import LeadCards from "./components/LeadCards";

export default async function EstablishmentsPage() {
  const leadsApplication = await db.leadApplication.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      restaurantName: true,
      city: true,
      state: true,
      notes: true,
      status: true,
      approvedAt: true,
      approvedBy: true,
      createdAt: true,
    },
    take: 30,
  });

  return (
    <div className="px-6">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Gerenciar Estabelecimentos
      </h1>
      <section>
        <LeadCards leads={leadsApplication} />
      </section>
    </div>
  );
}
