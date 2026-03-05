"use client";

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
  userAreaType: string | null;
}

const ProductDoubleDetailsWrapper = ({
  restaurantDeliveryAreas,
  systemSettings,
  useRangoooDelivery,
  userAreaType,
  ...props
}: ProductDoubleDetailsWrapperProps) => {
  return (
    <ProductDoubleDetails
      {...props}
      restaurantDeliveryAreas={restaurantDeliveryAreas}
      systemSettings={systemSettings}
      useRangoooDelivery={useRangoooDelivery}
      userAreaType={userAreaType}
    />
  );
};

export default ProductDoubleDetailsWrapper;
