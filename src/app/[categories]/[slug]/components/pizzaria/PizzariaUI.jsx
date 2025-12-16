import { enumCategoryToRoute } from "@/app/utils/constants";
import ConsumptionMethodOption from "@/components/ConsumptionMethodOption";
import LogoImage from "@/components/LogoImage";
import WelcomeSection from "@/components/WelcomeSection";

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

const PizzariaUI = ({ establishment }) => {
  const slug = establishment.slug;
  const availableMethods = establishment.consumptionMethods;
  const segment = enumCategoryToRoute(establishment.category);

  return (
    <div className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center gap-4 rounded-lg bg-yellow-50 shadow-all-sides sm:min-h-[90vh]">
      <div className="flex flex-col items-center justify-center space-y-2 pt-10">
        <LogoImage establishment={establishment} />
        <h1 className="text-3xl font-bold text-[--brand-primary]">
          {establishment.name}
        </h1>
      </div>
      <WelcomeSection />
      <div className="flex flex-col items-center justify-center gap-4 bg-yellow-50">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {availableMethods.map((methodObj) => {
            const methodEnum = methodObj.method;
            const uiData = METHOD_OPTIONS_MAP[methodEnum];
            if (!uiData) return null;
            return (
              <ConsumptionMethodOption
                key={methodEnum}
                imageUrl={uiData.imageUrl}
                alt={uiData.alt}
                buttonText={uiData.buttonText}
                option={methodEnum}
                slug={slug}
                segment={segment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PizzariaUI;
