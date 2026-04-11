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
import { PageContainer } from "@/components/PageContainer";
import { getSession } from "@/lib/auth";
import { getUserById } from "@/data/get-user-by-id";
import UserSheet from "@/components/UserSheet";

interface PageProps {
  params: Promise<{ categories: string; slug: string }>;
}

export default async function EstabelecimentoPage({ params }: PageProps) {
  const { categories, slug } = await params;
  const session = await getSession();

  const userId = session?.user?.id ?? null;
  const user = userId ? await getUserById(userId) : null;

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

    const validCategories = [
      "restaurantes",
      "pizzarias",
      "hamburguerias",
      "sorveterias",
      "adegas",
    ];
    const folder = validCategories.includes(category.toLowerCase())
      ? category.toLowerCase()
      : "default";

    return {
      ...base,
      imageUrl: `/images/${folder}/${method.toUpperCase()}.png`,
    };
  }

  return (
    <PageContainer>
      <div className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center gap-4 rounded-lg bg-yellow-50 shadow-2xl sm:min-h-[90vh]">
        <UserSheet user={user} />
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
    </PageContainer>
  );
}
