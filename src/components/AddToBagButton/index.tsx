"use client"

import { useContext, useState } from "react"
import { Button } from "../ui/button"
import { AddToBagButtonProps } from "@/dtos/cart.dto"
import DialogEstablishmentClosed from "../DialogEstablishmentClosed"
import { useSearchParams } from "next/navigation"
import { CartContext } from "@/contexts/cart-context"
import { calcDeliveryFee } from "@/helpers/calc-delivery"

const AddToBagButton = ({
  product,
  establishmentOpen,
  restaurantDeliveryAreas,
  systemSettings,
  useRangoooDelivery,
  userAreaType,
}: AddToBagButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    toogleCart,
    addToCart,
    setDeliveryFee,
    setConsumptionMethod,
    setUserAreaType,
    setRestaurantSettings,
    setRestaurantDeliveryAreas,
    setUseRangoooDelivery,
  } = useContext(CartContext)
  const searchParams = useSearchParams()
  const consumptionMethod = searchParams.get("consumptionMethod")

  const handleAddToBag = () => {
    if (!establishmentOpen) {
      setIsDialogOpen(true)
      return
    }

    const method = consumptionMethod?.toUpperCase() || "DELIVERY"
    setConsumptionMethod(method)

    if (method === "DELIVERY" && userAreaType) {
      const fee = calcDeliveryFee(
        userAreaType,
        systemSettings!,
        restaurantDeliveryAreas,
        useRangoooDelivery,
      )

      const finalFee = useRangoooDelivery ? fee / 100 : fee
      setDeliveryFee(finalFee)

      setUserAreaType(userAreaType)
    } else {
      setDeliveryFee(0)
      setUserAreaType(userAreaType || null)
    }

    setRestaurantSettings(systemSettings)
    setRestaurantDeliveryAreas(restaurantDeliveryAreas)
    setUseRangoooDelivery(useRangoooDelivery)

    toogleCart()
    addToCart(product)
  }

  return (
    <div className="absolute right-0 bottom-4 left-0 px-4 pt-10">
      <Button className="w-full" onClick={handleAddToBag}>
        Adicionar à sacola
      </Button>
      <DialogEstablishmentClosed
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  )
}

export default AddToBagButton
