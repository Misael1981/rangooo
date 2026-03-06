// contexts/restaurant-context.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  DeliveryAreaDTO,
  SystemSettingsDTO,
} from "@/dtos/establishment-menu-data.dto";

interface RestaurantContextData {
  restaurantSettings: SystemSettingsDTO | null;
  restaurantDeliveryAreas: DeliveryAreaDTO[];
  useRangoooDelivery: boolean;
  setRestaurantData: (data: {
    settings: SystemSettingsDTO;
    deliveryAreas: DeliveryAreaDTO[];
    useRangoooDelivery: boolean;
  }) => void;
}

const RestaurantContext = createContext<RestaurantContextData>({
  restaurantSettings: null,
  restaurantDeliveryAreas: [],
  useRangoooDelivery: false,
  setRestaurantData: () => {},
});

export const RestaurantProvider = ({ children }: { children: ReactNode }) => {
  const [restaurantSettings, setRestaurantSettings] =
    useState<SystemSettingsDTO | null>(null);
  const [restaurantDeliveryAreas, setRestaurantDeliveryAreas] = useState<
    DeliveryAreaDTO[]
  >([]);
  const [useRangoooDelivery, setUseRangoooDelivery] = useState(false);

  const setRestaurantData = ({
    settings,
    deliveryAreas,
    useRangoooDelivery,
  }: {
    settings: SystemSettingsDTO;
    deliveryAreas: DeliveryAreaDTO[];
    useRangoooDelivery: boolean;
  }) => {
    setRestaurantSettings(settings);
    setRestaurantDeliveryAreas(deliveryAreas);
    setUseRangoooDelivery(useRangoooDelivery);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurantSettings,
        restaurantDeliveryAreas,
        useRangoooDelivery,
        setRestaurantData,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
