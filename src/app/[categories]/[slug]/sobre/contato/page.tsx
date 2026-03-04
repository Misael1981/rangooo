import HeaderAbout from "../components/HeaderAbout";
import { getRestaurantBySlug } from "@/data/get-establishment-for-about";
import { notFound } from "next/navigation";
import EstablishmentDetails from "../components/EstablishmentDetails";
import { parseSocialMedia } from "@/helpers/parse-social-media";
import MapsLocation from "../components/MapsLocation";
import { PageContainer } from "@/components/PageContainer";

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
    <PageContainer>
      <div className="min-h-screen bg-white">
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
    </PageContainer>
  );
}
