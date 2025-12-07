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

  const categoriesRaw = menuData.menuCategories || [];
  const categories = categoriesRaw.map((cat) => ({
    ...cat,
    createdAt:
      typeof cat.createdAt?.toISOString === "function"
        ? cat.createdAt.toISOString()
        : (cat.createdAt ?? null),
    updatedAt:
      typeof cat.updatedAt?.toISOString === "function"
        ? cat.updatedAt.toISOString()
        : (cat.updatedAt ?? null),
    products: cat.products.map((p) => ({
      ...p,
      price:
        typeof p.price?.toNumber === "function"
          ? p.price.toNumber()
          : Number(p.price),
      createdAt:
        typeof p.createdAt?.toISOString === "function"
          ? p.createdAt.toISOString()
          : (p.createdAt ?? null),
      updatedAt:
        typeof p.updatedAt?.toISOString === "function"
          ? p.updatedAt.toISOString()
          : (p.updatedAt ?? null),
    })),
  }));

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
