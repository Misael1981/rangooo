import BusinessInfo from "@/components/BusinessInfo";
import EstablishmentDescription from "@/components/EstablishmentDescription";
import HeaderImage from "@/components/HeaderImage";

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

  return (
    <div>
      <HeaderImage image={menuData.coverImageUrl} alt={menuData.name} />
      <EstablishmentDescription establishment={descriptionData} />
      <BusinessInfo restaurant={menuData} />
      {/* <SelectionMenu
        categories={categories}
        slug={slug}
        segment={menuData.category}
      /> */}
    </div>
  );
};

export default PizzariaMenuUI;
