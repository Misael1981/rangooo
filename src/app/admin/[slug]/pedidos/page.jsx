export default async function RestaurantOrdersPage({ params, searchParams }) {
  const p = await params;
  const sp = await searchParams;
  const statusParam = String(sp?.status || "");
  const methodParam = String(sp?.consumptionMethod || "");

  return (
    <div>
      <h1>Procurando descobrir erro de produção</h1>
    </div>
  );
}
