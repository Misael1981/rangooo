import { db } from "@/lib/prisma";
import EstablishmentOwnerData from "./components/EstablishmentOwnerData";

export default async function UsersPage({ params }) {
  const p = await params;
  const slug = p.slug;

  const restaurant = await db.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      // dono do estabelecimento
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          // ... outros campos do usuário/dono que você precisa
        },
      },
    },
  });

  return (
    <div className="container mx-auto px-6 pb-6">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
        <p className="text-gray-600">
          Crie e exclua usuários admins para acessar o painel administrativo.
        </p>
      </header>
      <EstablishmentOwnerData data={restaurant.owner} />
    </div>
  );
}
