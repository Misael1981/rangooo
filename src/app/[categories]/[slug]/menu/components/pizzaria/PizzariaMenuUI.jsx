import BusinessInfo from "@/components/BusinessInfo";
import EstablishmentDescription from "@/components/EstablishmentDescription";
import HeaderImage from "@/components/HeaderImage";
import { Separator } from "@/components/ui/separator";
import SelectionMenu from "../SelectionMenu";

const PizzariaMenuUI = ({ menuData }) => {
  const {
    avatarImageUrl,
    brandColors,
    name,
    description,
    street,
    number,
    neighborhood,
    city,
    state,
    slug,
  } = menuData;

  const descriptionData = {
    avatarImageUrl,
    brandColors,
    name,
    description,
    street,
    number,
    neighborhood,
    city,
    state,
  };

  const categories = menuData.menuCategories;

  return (
    <div>
      <HeaderImage image={menuData.coverImageUrl} alt={menuData.name} />
      <EstablishmentDescription establishment={descriptionData} />
      <BusinessInfo slug={slug} />
      <Separator className="my-4 bg-gray-300" />
      <SelectionMenu
        categories={categories}
        slug={slug}
        segment={menuData.category}
      />
    </div>
  );
};

export default PizzariaMenuUI;
