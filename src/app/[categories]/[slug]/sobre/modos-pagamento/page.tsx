import QrCodeImage from "@/components/QrCodeImage";
import HeaderAbout from "../components/HeaderAbout";
import { getRestaurantBySlug } from "@/data/get-establishment-for-about";
import { notFound } from "next/navigation";
import PaymentMethods from "../components/PaymentMethods";

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
    <div className=" lg:bg-[url('/fundo.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:fixed lg:inset-0 lg:-z-10">
      <div className="bg-black/40 min-h-screen">
        <div className="relative min-h-screen sm:py-6">
          <QrCodeImage direction="left" />
          <div className="mx-auto max-w-xl shadow-all-sides bg-white h-screen">
            <HeaderAbout title="Modos de pagamento" />
            <main className="p-4">
              <PaymentMethods methods={methods} />
            </main>
          </div>
          <QrCodeImage direction="right" />
        </div>
      </div>
    </div>
  );
}
