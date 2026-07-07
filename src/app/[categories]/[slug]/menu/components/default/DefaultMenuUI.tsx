import BusinessInfo from "@/components/BusinessInfo"
import EstablishmentDescriptionForMenu from "@/components/EstablishmentDescriptionForMenu"
import HeaderMenu from "@/components/HeaderMenu"
import SelectionMenuDefault from "@/components/SelectionMenuDefault"
import { EstablishmentMenuDataDTO } from "@/dtos/establishment-menu-data.dto"

type PizzariaMenuUIProps = {
  establishment: EstablishmentMenuDataDTO
}

const DefaultMenuUI = ({ establishment }: PizzariaMenuUIProps) => {
  const {
    name,
    avatarImageUrl,
    description,
    street,
    number,
    neighborhood,
    city,
    state,
    category,
  } = establishment

  const establishmentData = {
    name,
    avatarImageUrl,
    description,
    street,
    number,
    neighborhood,
    city,
    state,
    category,
  }

  return (
    <div className="">
      <HeaderMenu
        image={establishment.coverImageUrl}
        alt={establishment.name}
      />
      <main className="relative z-50 -mt-6 min-h-50 space-y-4 rounded-t-3xl bg-white p-4">
        <EstablishmentDescriptionForMenu
          establishmentData={establishmentData}
        />
        <BusinessInfo
          slug={establishment.slug}
          isOpen={establishment.isOpen}
          categorie={establishment.category}
          deliveryEstimateSettings={establishment.deliveryEstimateSettings}
        />

        <SelectionMenuDefault
          menuCategories={establishment.menuCategories}
          slug={establishment.slug}
          categorie={establishment.category.toLowerCase()}
        />
      </main>
    </div>
  )
}

export default DefaultMenuUI
