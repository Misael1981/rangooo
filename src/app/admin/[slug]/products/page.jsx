import { db } from "@/lib/prisma";
import ManageMenu from "./components/ManageMenu";

export default async function ProductsPage({ params }) {
  const p = await params;
  const slug = p.slug;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: { id: true },
  });

  if (!restaurant) return <div>Restaurante não encontrado</div>;

  const categories = await db.menuCategory.findMany({
    where: { restaurant: { slug } },
    include: {
      _count: {
        select: { products: true },
      },
      products: {
        select: {
          id: true,
          name: true,
          price: true,
        },
        orderBy: { name: "asc" },
      },
      additionalIngredients: true,
    },
    orderBy: { displayOrder: "asc" },
  });

  const serializedCategories = categories.map((category) => ({
    ...category,
    // Limpa os decimais dos produtos
    products: category.products.map((p) => ({
      ...p,
      price: Number(p.price), // Converte Decimal para Number
    })),
    // Limpa os decimais dos ingredientes adicionais
    additionalIngredients: category.additionalIngredients.map((ing) => ({
      ...ing,
      price: Number(ing.price),
    })),
  }));

  return (
    <div className="container mx-auto px-6">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Cardápio</h1>
        <p className="text-gray-600">
          Crie e exclua produtos e tabelas para exibir no seu cardápio.
        </p>
      </header>
      <ManageMenu
        initialCategories={serializedCategories}
        restaurantId={restaurant.id}
      />
    </div>
  );
}
