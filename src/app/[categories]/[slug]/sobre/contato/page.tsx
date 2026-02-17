import QrCodeImage from "@/components/QrCodeImage";
import HeaderAbout from "../components/HeaderAbout";
import { getRestaurantBySlug } from "@/data/get-establishment-for-about";
import { notFound } from "next/navigation";
import EstablishmentDetails from "../components/EstablishmentDetails";
import { parseSocialMedia } from "@/helpers/parse-social-media";
import MapsLocation from "../components/MapsLocation";

interface ContactsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ContactsPage({ params }: ContactsPageProps) {
  const { slug } = await params;

  const establishment = await getRestaurantBySlug(slug);

  if (!establishment) return notFound();

  const { name, contacts, socialMedia, street, number, neighborhood, city } =
    establishment;

  const establishmentData = {
    name,
    contacts,
    socialMedia: parseSocialMedia(socialMedia),
  };

  const establishmentAddress = {
    street,
    number,
    neighborhood,
    city,
  };

  const addressString = [street, number, neighborhood, city]
    .filter(Boolean)
    .join(", ");

  return (
    <div className=" lg:bg-[url('/fundo.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:fixed lg:inset-0 lg:-z-10">
      <div className="bg-black/40 min-h-screen">
        <div className="relative min-h-screen sm:py-6">
          <QrCodeImage direction="left" />
          <div className="mx-auto max-w-xl shadow-all-sides bg-white min-h-screen">
            <HeaderAbout title="Informações e Contato" />
            <main className="p-4">
              <EstablishmentDetails
                establishmentData={establishmentData}
                establishmentAddress={establishmentAddress}
              />
              <section className="h-75 w-full max-w-150 rounded-md border border-solid border-primary bg-slate-100 p-4">
                <MapsLocation address={addressString} />
              </section>
            </main>
          </div>
          <QrCodeImage direction="right" />
        </div>
      </div>
    </div>
  );
}
