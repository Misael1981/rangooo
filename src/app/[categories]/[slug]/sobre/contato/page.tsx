import QrCodeImage from "@/components/QrCodeImage";
import HeaderAbout from "../components/HeaderAbout";

interface ContactsPageProps {
  params: Promise<{ categories: string; slug: string }>;
}

export default async function ContactsPage({ params }: ContactsPageProps) {
  const { categories, slug } = await params;
  console.log(categories, slug);

  return (
    <div className=" lg:bg-[url('/fundo.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:fixed lg:inset-0 lg:-z-10">
      <div className="bg-black/40 min-h-screen">
        <div className="relative min-h-screen sm:py-6">
          <QrCodeImage direction="left" />
          <div className="mx-auto max-w-xl shadow-all-sides">
            <HeaderAbout title="Contatos" />
            <h1>Contatos</h1>
          </div>
          <QrCodeImage direction="right" />
        </div>
      </div>
    </div>
  );
}
