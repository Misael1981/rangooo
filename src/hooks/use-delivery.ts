import { useCart } from "@/contexts/cart-context";
import { calcDeliveryFee } from "@/helpers/calc-delivery";
import { AreaType } from "@/generated/prisma/enums";

export const useDelivery = () => {
  const { setDeliveryFee, setUserAreaType, restaurantSettings } = useCart();

  const updateDelivery = (areaType: AreaType | null) => {
    if (!areaType || !restaurantSettings) {
      setDeliveryFee(0);
      setUserAreaType(null);
      return;
    }

    const rawFee = calcDeliveryFee(
      areaType,
      restaurantSettings.systemSettings,
      restaurantSettings.deliveryAreas,
      restaurantSettings.useRangoooDelivery,
    );

    const finalFee = restaurantSettings.useRangoooDelivery
      ? rawFee / 100
      : rawFee;

    setDeliveryFee(finalFee);
    setUserAreaType(areaType);
  };

  return { updateDelivery };
};
