import BusinessInfo from "@/components/BusinessInfo";
import EstablishmentDescriptionForMenu from "@/components/EstablishmentDescriptionForMenu";
import HeaderMenu from "@/components/HeaderMenu";
import SelectionMenu from "@/components/SelectionMenu";
import { EstablishmentMenuDataDTO } from "@/dtos/establishment-menu-data.dto";

type PizzariaMenuUIProps = {
  establishment: EstablishmentMenuDataDTO;
};

const PizzariaMenuUI = ({ establishment }: PizzariaMenuUIProps) => {
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
  } = establishment;

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
  };

  return (
    <div className="bg-white overflow-y-auto h-screen scrollbar-hide">
      <HeaderMenu
        image={establishment.coverImageUrl}
        alt={establishment.name}
      />
      <main className="bg-white min-h-50 -mt-6 z-50 relative rounded-t-3xl p-4 space-y-4">
        <EstablishmentDescriptionForMenu
          establishmentData={establishmentData}
        />
        <BusinessInfo
          slug={establishment.slug}
          isOpen={establishment.isOpen}
          categorie={establishment.category}
        />

        <SelectionMenu
          menuCategories={establishment.menuCategories}
          slug={establishment.slug}
          categorie={establishment.category.toLowerCase()}
        />
      </main>
    </div>
  );
};

export default PizzariaMenuUI;
