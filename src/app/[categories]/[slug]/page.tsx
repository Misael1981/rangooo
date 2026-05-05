import { PageContainer } from "@/components/PageContainer"
import UserSheet from "@/components/UserSheet"
import { enumCategoryToRoute } from "@/constants/enum-category-to-route"
import { CATEGORIES_URL, MethodType } from "@/constants/maps-options"
import { getEstablishmentBySlug } from "@/data/get-establishment-by-slug"
import { getUserById } from "@/data/get-user-by-id"
import { getMethodOption } from "@/utils/getMethodOption"
import { getSession } from "next-auth/react"
import { notFound, redirect } from "next/navigation"
import ConsumptionMethodOption from "./components/ConsumptionMethodOption"
import LogoImage from "@/components/LogoImage"

interface PageProps {
  params: Promise<{ categories: string; slug: string }>
}

export default async function EstabelecimentoPage({ params }: PageProps) {
  const { categories, slug } = await params
  const session = await getSession()

  const userId = session?.user?.id ?? null
  const user = userId ? await getUserById(userId) : null

  if (!CATEGORIES_URL.includes(categories)) {
    return notFound()
  }

  const establishment = await getEstablishmentBySlug(slug)

  if (!establishment) {
    return notFound()
  }

  const dbCategoriaSlug = enumCategoryToRoute(establishment.category)

  if (dbCategoriaSlug !== categories) {
    return redirect(`/${dbCategoriaSlug}/${slug}`)
  }

  const availableMethods = establishment.methods
  const segment = enumCategoryToRoute(establishment.category)

  return (
    <PageContainer>
      <div className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center gap-4 rounded-lg bg-yellow-50 shadow-2xl sm:min-h-[90vh]">
        <UserSheet user={user} />

        <div className="flex flex-col items-center justify-center space-y-2">
          <LogoImage
            establishmentImage={establishment.avatarImageUrl}
            width={80}
            height={80}
            alt={establishment.name}
          />
        </div>

        <section className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">{establishment.name}</h1>
          <div className="space-y-2 p-4 text-center">
            <h2 className="text-2xl font-semibold">Seja bem-vindo!</h2>
            <p className="opacity-55">
              Escolha como prefere aproveitar sua refeição. Estamos aqui para
              oferecer praticidade e sabor em cada detalhe!
            </p>
          </div>
        </section>

        <div className="flex flex-col items-center justify-center gap-4 bg-yellow-50">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {availableMethods.map((option) => {
              const { imageUrl, alt, buttonText } = getMethodOption(
                option.type as MethodType,
                segment,
              )
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
              )
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
