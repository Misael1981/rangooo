"use client"

import {
  AdditionalIngredientDTO,
  DeliveryAreaDTO,
  SystemSettingsDTO,
} from "@/dtos/establishment-menu-data.dto"
import { ScrollArea } from "../ui/scroll-area"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import LogoImage from "../LogoImage"
import { ManageableIngredient } from "@/dtos/cart.dto"
import QuantitySelector from "./components/QuantitySelector"
import DescriptionProduct from "./components/DescriptionProduct"
import AddToBagButton from "../AddToBagButton"

type ProductDetailsProps = {
  establishmentName: string
  establishmentImage: string | null
  product: {
    id: string
    imageUrl: string | null
    name: string
    price: number
    description: string | null
    ingredients: string[]
    additionalIngredients: AdditionalIngredientDTO[]
  }
  establishmentOpen: boolean
  restaurantDeliveryAreas: DeliveryAreaDTO[]
  systemSettings: SystemSettingsDTO
  useRangoooDelivery: boolean
  userAreaType: string | null
}

const ProductDetails = ({
  establishmentName,
  establishmentImage,
  product,
  establishmentOpen,
  restaurantDeliveryAreas,
  systemSettings,
  useRangoooDelivery,
  userAreaType,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedExtras, setSelectedExtras] = useState<ManageableIngredient[]>(
    [],
  )
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([])
  const searchParams = useSearchParams()
  const consumptionMethod = searchParams.get("consumptionMethod") || ""

  const productToCart = {
    lineId: `${product.id}-${JSON.stringify(selectedExtras)}`,
    productId: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
    quantity,
    extras: selectedExtras,
    consumptionMethod: consumptionMethod,
    removedIngredients,
  }

  return (
    <>
      <section>
        <div className="mb-1 flex items-center gap-2">
          <LogoImage
            establishmentImage={establishmentImage}
            width={40}
            height={40}
            alt={establishmentName}
          />
          <div>
            <h2 className="text-muted-foreground text-base">
              {establishmentName}
            </h2>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold">{product.name}</h1>
        </div>
        <QuantitySelector
          price={product.price}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </section>
      <ScrollArea className="max-h-[calc(100vh-220px)] overflow-auto">
        <DescriptionProduct
          title={product.name}
          descriptionProduct={product.description}
          additionalIngredients={product.additionalIngredients}
          ingredients={product.ingredients}
          onExtrasChange={(extras) => setSelectedExtras(extras)}
          onRemovedIngredientsChange={(removed) =>
            setRemovedIngredients(removed)
          }
        />
      </ScrollArea>
      <AddToBagButton
        product={productToCart}
        establishmentOpen={establishmentOpen}
        restaurantDeliveryAreas={restaurantDeliveryAreas}
        systemSettings={systemSettings}
        useRangoooDelivery={useRangoooDelivery}
        userAreaType={userAreaType}
      />
    </>
  )
}

export default ProductDetails
