import LogoImage from "@/components/LogoImage";
import WelcomeSection from "@/components/WelcomeSection";
import ConsumptionMethodOption from "@/components/ConsumptionMethodOption";
import QrCode from "@/components/QrCode";

const METHOD_OPTIONS_MAP = {
  DELIVERY: {
    imageUrl: "/images/delivery.png",
    alt: "Entregar",
    buttonText: "Entregar",
  },
  PICKUP: {
    imageUrl: "/images/takeaway.png",
    alt: "Pegar no local",
    buttonText: "Pegar no local",
  },
  DINE_IN: {
    imageUrl: "/images/dine_in.png",
    alt: "Comer no local",
    buttonText: "Comer no local",
  },
};

const HamburgueriaUI = ({ establishment }) => {
  const slug = establishment.slug;
  const availableMethods = establishment.consumptionMethods;
  const segment = "hamburguerias";

  return (
    <div className="relative min-h-screen bg-white sm:py-8">
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <QrCode />
      </div>
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 rounded-lg bg-yellow-50 p-6 shadow-all-sides">
        <div className="flex flex-col items-center justify-center space-y-2 pt-10">
          <LogoImage restaurant={establishment} />
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
      <div className="fixed bottom-8 right-8 hidden lg:block">
        <QrCode />
      </div>
    </div>
  );
};

export default HamburgueriaUI;
