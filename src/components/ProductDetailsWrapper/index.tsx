"use client";

import ProductDetails from "../ProductDetails";
import {
  AdditionalIngredientDTO,
  DeliveryAreaDTO,
  SystemSettingsDTO,
} from "@/dtos/establishment-menu-data.dto";

interface ProductDetailsWrapperProps {
  establishmentName: string;
  establishmentImage: string | null;
  product: {
    id: string;
    imageUrl: string | null;
    name: string;
    price: number;
    description: string | null;
    ingredients: string[];
    additionalIngredients: AdditionalIngredientDTO[];
  };
  establishmentOpen: boolean;
  restaurantDeliveryAreas: DeliveryAreaDTO[];
  systemSettings: SystemSettingsDTO;
  useRangoooDelivery: boolean;
  userAreaType: string | null;
}

const ProductDetailsWrapper = ({
  restaurantDeliveryAreas,
  systemSettings,
  useRangoooDelivery,
  ...props
}: ProductDetailsWrapperProps) => {
  return (
    <ProductDetails
      {...props}
      restaurantDeliveryAreas={restaurantDeliveryAreas}
      systemSettings={systemSettings}
      useRangoooDelivery={useRangoooDelivery}
      userAreaType={props.userAreaType}
    />
  );
};

export default ProductDetailsWrapper;
