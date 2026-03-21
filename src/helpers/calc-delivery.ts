import { AreaType } from "@/generated/prisma/enums";
import { DeliveryAreaDTO } from "@/dtos/establishment-menu-data.dto";

export function calcDeliveryFee(
  area: string | null,
  systemSettings: {
    urbanDeliveryFee: number;
    ruralDeliveryFee: number;
    districtDeliveryFee: number;
  },
  deliveryAreas: DeliveryAreaDTO[] = [],
  useRangoooDelivery = false,
  restaurantDeliveryFee = 0,
): number {
  if (!area) return restaurantDeliveryFee;

  if (useRangoooDelivery) {
    switch (area) {
      case AreaType.URBAN:
        return systemSettings.urbanDeliveryFee;
      case AreaType.RURAL:
        return systemSettings.ruralDeliveryFee;
      case AreaType.DISTRICT:
        return systemSettings.districtDeliveryFee;
      default:
        return 0;
    }
  }

  return (
    deliveryAreas.find((a) => a.areaType === area)?.fee ??
    restaurantDeliveryFee ??
    0
  );
}
