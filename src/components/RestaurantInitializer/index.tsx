"use client";

import { useEffect } from "react";
import { useRestaurant } from "@/contexts/restaurant-context";
import {
  DeliveryAreaDTO,
  SystemSettingsDTO,
} from "@/dtos/establishment-menu-data.dto";

type RestaurantInitializerProps = {
  restaurantDeliveryAreas: DeliveryAreaDTO[];
  systemSettings: SystemSettingsDTO;
  useRangoooDelivery: boolean;
  userAreaType: string | null;
};

export const RestaurantInitializer = ({
  systemSettings,
  restaurantDeliveryAreas,
  useRangoooDelivery,
  userAreaType,
}: RestaurantInitializerProps) => {
  const { setRestaurantData } = useRestaurant();

  useEffect(() => {
    setRestaurantData({
      settings: systemSettings,
      deliveryAreas: restaurantDeliveryAreas,
      useRangoooDelivery,
    });
  }, []);

  return null;
};
