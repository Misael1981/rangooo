"use client";

import { useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import {
  DeliveryAreaDTO,
  ProductDTO,
  SystemSettingsDTO,
} from "@/dtos/establishment-menu-data.dto";
import ProductDoubleDetails from "../ProductDoubleDetails";

interface ProductDoubleDetailsWrapperProps {
  establishmentName: string;
  establishmentImage: string | null;
  flavor1: Partial<ProductDTO>;
  flavor2: Partial<ProductDTO>;
  establishmentOpen: boolean;
  restaurantDeliveryAreas: DeliveryAreaDTO[];
  systemSettings: SystemSettingsDTO;
  useRangoooDelivery: boolean;
}

const ProductDoubleDetailsWrapper = ({
  restaurantDeliveryAreas,
  systemSettings,
  useRangoooDelivery,
  ...props
}: ProductDoubleDetailsWrapperProps) => {
  const {
    setSystemSettings,
    setUseRangoooDelivery,
    setRestaurantDeliveryAreas,
  } = useCart();

  // Initialize cart context data immediately when page loads
  useEffect(() => {
    setSystemSettings(systemSettings);
    setUseRangoooDelivery(useRangoooDelivery);
    setRestaurantDeliveryAreas(restaurantDeliveryAreas);

    console.log("ProductDoubleDetailsWrapper - initialized cart context");
  }, [
    systemSettings,
    useRangoooDelivery,
    restaurantDeliveryAreas,
    setSystemSettings,
    setUseRangoooDelivery,
    setRestaurantDeliveryAreas,
  ]);

  return (
    <ProductDoubleDetails
      {...props}
      restaurantDeliveryAreas={restaurantDeliveryAreas}
      systemSettings={systemSettings}
      useRangoooDelivery={useRangoooDelivery}
    />
  );
};

export default ProductDoubleDetailsWrapper;
