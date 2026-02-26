import QrCodeImage from "@/components/QrCodeImage";
import { getEstablishmentBySlug } from "@/data/get-establishment-by-slug";
import { enumCategoryToRoute } from "@/helpers/enum-category-to-route";
import { notFound, redirect } from "next/navigation";
import {
  CATEGORIES_URL,
  METHOD_BASE,
  MethodType,
} from "@/constants/maps-options";
import WelcomeSectionCategoryEstablishment from "@/components/WelcomeSectionCategoryEstablishment";
import ConsumptionMethodOption from "@/components/ConsumptionMethodOption";
import LogoImage from "@/components/LogoImage";

interface PageProps {
  params: Promise<{ categories: string; slug: string }>;
}

export default async function EstabelecimentoPage({ params }: PageProps) {
  const { categories, slug } = await params;

  if (!CATEGORIES_URL.includes(categories)) {
    return notFound();
  }

  const establishment = await getEstablishmentBySlug(slug);

  if (!establishment) {
    return notFound();
  }

  const dbCategoriaSlug = enumCategoryToRoute(establishment.category);

  if (dbCategoriaSlug !== categories) {
    return redirect(`/${dbCategoriaSlug}/${slug}`);
  }
  const availableMethods = establishment.methods;
  const segment = enumCategoryToRoute(establishment.category);

  function getMethodOption(method: MethodType, category: string) {
    const base = METHOD_BASE[method];

    return {
      ...base,
      imageUrl: `/images/${category.toLowerCase()}/${method.toUpperCase()}.png`,
    };
  }

  return (
    <div className=" lg:bg-[url('/fundo.png')] lg:bg-cover lg:bg-center lg:bg-no-repeat lg:fixed lg:inset-0 lg:-z-10">
      <div className="bg-black/40 min-h-screen">
        <div className="relative min-h-screen sm:py-6">
          <QrCodeImage direction="left" />
          <div className="mx-auto flex min-h-svh max-w-xl flex-col shadow-all-sides items-center justify-center gap-4 rounded-lg bg-yellow-50 shadow-2xl sm:min-h-[90vh]">
            <div className="flex flex-col items-center justify-center space-y-2 ">
              <LogoImage
                establishmentImage={establishment.avatarImageUrl}
                width={80}
                height={80}
                alt={establishment.name}
              />
            </div>
            <WelcomeSectionCategoryEstablishment
              establishmentName={establishment.name}
            />
            <div className="flex flex-col items-center justify-center gap-4 bg-yellow-50">
              <div className="flex flex-wrap items-center justify-center gap-4">
                {availableMethods.map((option) => {
                  const { imageUrl, alt, buttonText } = getMethodOption(
                    option.type as MethodType,
                    segment,
                  );
                  return (
                    <ConsumptionMethodOption
                      key={alt}
                      slug={slug}
                      segment={segment}
                      method={option.type}
                      imageUrl={imageUrl}
                      alt={alt}
                      buttonText={buttonText}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <QrCodeImage direction="right" />
        </div>
      </div>
    </div>
  );
}

// function getMethodOption(method: MethodType, category: string) {
//   const base = METHOD_BASE[method];

//   // Lista de categorias que você SABE que já tem imagens
//   const validCategories = ["pizzaria", "hamburgueria", "japonesa"];
//   const folder = validCategories.includes(category.toLowerCase())
//     ? category.toLowerCase()
//     : "default"; // Uma pasta com ícones genéricos

//   return {
//     ...base,
//     imageUrl: `/images/${folder}/${method.toLowerCase()}.png`,
//   };
// }
