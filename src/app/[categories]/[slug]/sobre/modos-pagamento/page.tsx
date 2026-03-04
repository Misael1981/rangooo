import HeaderAbout from "../components/HeaderAbout";
import { getRestaurantBySlug } from "@/data/get-establishment-for-about";
import { notFound } from "next/navigation";
import PaymentMethods from "../components/PaymentMethods";
import { PageContainer } from "@/components/PageContainer";

interface PaymentPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { slug } = await params;

  const establishment = await getRestaurantBySlug(slug);

  if (!establishment) return notFound();

  const { paymentMethods } = establishment;

  const methods = paymentMethods.map((item) => item.method);

  return (
    <PageContainer>
      <HeaderAbout title="Modos de pagamento" />
      <main className="p-4 min-h-screen bg-red-50">
        <PaymentMethods methods={methods} />
      </main>
    </PageContainer>
  );
}
