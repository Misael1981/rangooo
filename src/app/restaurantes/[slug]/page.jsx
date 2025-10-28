export const dynamic = "force-dynamic";
export const revalidate = 0;

import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import LayoutMenuOptions from "./components/LayoutMenuOptions";

export default async function EstablishmentPage({ params }) {
  const { slug } = params;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      avatarImageUrl: true,
      coverImageUrl: true,
      brandColors: true,
      category: true,
    },
  });

  if (!restaurant) {
    return notFound();
  }

  const View = layoutByCategory[restaurant.category] ?? DefaultRestaurantView;

  return <View restaurant={restaurant} />;
}

const layoutByCategory = {
  RESTAURANT: DefaultRestaurantView,
  PIZZARIA: PizzeriaView,
  HAMBURGUERIA: BurgerView,
  SORVETERIA: IceCreamView,
  ACAI: AcaiView,
  SAUDAVEL: HealthyView,
  DOCES: DessertsView,
};

function DefaultRestaurantView({ restaurant }) {
  const bg = Array.isArray(restaurant.brandColors)
    ? restaurant.brandColors[0]
    : "#111827";
  return (
    <div
      className="min-h-screen text-white"
      style={{ ["--brand-primary"]: bg }}
    >
      <div className="bg-[var(--brand-primary)]/40 fixed inset-0 -z-10" />
      <section className="container mx-auto max-w-5xl p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">{restaurant.name}</h1>
          <p className="text-sm opacity-80">{restaurant.category}</p>
        </header>
        <article className="space-y-4">
          {restaurant.coverImageUrl && (
            <img
              src={restaurant.coverImageUrl}
              alt={`${restaurant.name} cover`}
              className="h-56 w-full rounded-lg object-cover"
            />
          )}
          <p className="text-base">{restaurant.description}</p>
        </article>
      </section>
    </div>
  );
}

function PizzeriaView({ restaurant }) {
  return (
    <div
      className="bg-[var(--brand-primary)]/30 min-h-screen"
      style={{ ["--brand-primary"]: pickColor(restaurant) }}
    >
      <section className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold">🍕 {restaurant.name}</h1>
        <p className="mt-2">Layout exclusivo para pizzarias.</p>
        {/* TODO: grid de pizzas, tamanhos, sabores */}
      </section>
    </div>
  );
}

function BurgerView({ restaurant }) {
  return (
    <LayoutMenuOptions restaurant={restaurant}>
      <section className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold">🍔 {restaurant.name}</h1>
        <p className="mt-2">Layout exclusivo para hamburguerias.</p>
        {/* TODO: combos, lanches, acompanhamentos */}
      </section>
    </LayoutMenuOptions>
  );
}

function IceCreamView({ restaurant }) {
  return (
    <div
      className="bg-[var(--brand-primary)]/30 min-h-screen"
      style={{ ["--brand-primary"]: pickColor(restaurant) }}
    >
      <section className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold">🍨 {restaurant.name}</h1>
        <p className="mt-2">Layout exclusivo para sorveterias.</p>
      </section>
    </div>
  );
}

function AcaiView({ restaurant }) {
  return (
    <div
      className="bg-[var(--brand-primary)]/30 min-h-screen"
      style={{ ["--brand-primary"]: pickColor(restaurant) }}
    >
      <section className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold">🥤 {restaurant.name}</h1>
        <p className="mt-2">Layout exclusivo para açaí.</p>
      </section>
    </div>
  );
}

function HealthyView({ restaurant }) {
  return (
    <div
      className="bg-[var(--brand-primary)]/30 min-h-screen"
      style={{ ["--brand-primary"]: pickColor(restaurant) }}
    >
      <section className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold">🥗 {restaurant.name}</h1>
        <p className="mt-2">Layout exclusivo para saudável.</p>
      </section>
    </div>
  );
}

function DessertsView({ restaurant }) {
  return (
    <div
      className="bg-[var(--brand-primary)]/30 min-h-screen"
      style={{ ["--brand-primary"]: pickColor(restaurant) }}
    >
      <section className="container mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold">🍰 {restaurant.name}</h1>
        <p className="mt-2">Layout exclusivo para doces.</p>
      </section>
    </div>
  );
}

function pickColor(restaurant) {
  return Array.isArray(restaurant.brandColors) && restaurant.brandColors[0]
    ? restaurant.brandColors[0]
    : "#111827";
}
