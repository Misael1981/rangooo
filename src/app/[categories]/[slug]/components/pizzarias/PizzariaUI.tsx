import ConsumptionMethodOption from "@/components/ConsumptionMethodOption";
import LogoImage from "@/components/LogoImage";
import WelcomeSectionCategoryEstablishment from "@/components/WelcomeSectionCategoryEstablishment";
import { EstablishmentForCategorieDTO } from "@/dtos/establishment-for-categorie.dto";
import { enumCategoryToRoute } from "@/helpers/enum-category-to-route";

type PizzariaUIProps = {
  establishment: EstablishmentForCategorieDTO;
};

const METHOD_OPTIONS_MAP = {
  DELIVERY: {
    imageUrl: "/images/delivery.png",
    alt: "Entregar",
    buttonText: "Entregar",
  },
  PICKUP: {
    imageUrl: "/images/pickup-pizza.png",
    alt: "Pegar no local",
    buttonText: "Pegar no local",
  },
  DINE_IN: {
    imageUrl: "/images/dine-in-pizza.png",
    alt: "Comer no local",
    buttonText: "Comer no local",
  },
};

const PizzariaUI = ({ establishment }: PizzariaUIProps) => {
  const slug = establishment.slug;
  const availableMethods = establishment.methods;
  const segment = enumCategoryToRoute(establishment.category);

  return (
    <div className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center gap-4 rounded-lg bg-yellow-50 shadow-2xl sm:min-h-[90vh]">
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
            const { imageUrl, alt, buttonText } =
              METHOD_OPTIONS_MAP[option.type];
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
  );
};

export default PizzariaUI;
