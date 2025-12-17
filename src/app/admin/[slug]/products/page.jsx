import { db } from "@/lib/prisma";
import ManageMenu from "./components/ManageMenu";

export default async function ProductsPage({ params }) {
  const p = await params;
  const slug = p.slug;

  const products = await db.product.findMany({
    where: { restaurant: { slug } },
    select: {
      id: true,
      name: true,
      price: true,
      menuCategory: {
        select: { id: true, name: true, additionalIngredients: true },
      },
    },
    orderBy: { name: "asc" },
    take: 50,
    skip: 0,
  });

  console.log(
    "Produtos Adicionais:",
    products[0].menuCategory.additionalIngredients,
  );
  // Transformar os Decimal em string/number antes de enviar
  const serializedProducts = products.map((product) => ({
    ...product,
    price: product.price.toString(),
  }));

  return (
    <div className="container mx-auto px-6">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Cardápio</h1>
        <p className="text-gray-600">
          Crie e exclua produtos e tabelas para exibir no seu cardápio.
        </p>
      </header>
      <ManageMenu products={serializedProducts} />
    </div>
  );
}
