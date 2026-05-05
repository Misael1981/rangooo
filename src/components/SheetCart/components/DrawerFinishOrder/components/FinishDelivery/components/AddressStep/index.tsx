"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { calcDeliveryFee } from "@/helpers/calc-delivery"
import { formatCurrency } from "@/helpers/format-currency"
import { useRestaurant } from "@/contexts/restaurant-context"
import { z } from "zod"
import { addressSchema } from "@/dtos/change-address-for.dto"
import ChangeAddressDialog from "../ChangeAddressDialog"

export type AddressFormData = z.infer<typeof addressSchema>

type AddressStepProps = {
  userAddress?: AddressFormData
  onAddressChange?: (data: AddressFormData) => void
}

const AREA_TYPE_LABEL = {
  URBAN: "Zona Urbana",
  RURAL: "Zona Rural",
  DISTRICT: "Distrito",
}

const AddressStep = ({ userAddress, onAddressChange }: AddressStepProps) => {
  const [isChangeAddressDialogOpen, setIsChangeAddressDialogOpen] =
    useState(false)
  const [currentAddress, setCurrentAddress] = useState(userAddress)

  const { setDeliveryFee, deliveryFee } = useCart()
  const { restaurantSettings, restaurantDeliveryAreas, useRangoooDelivery } =
    useRestaurant()

  // Recalcula o frete sempre que o endereço ou dados do restaurante mudarem
  useEffect(() => {
    if (!currentAddress?.areaType) return
    if (!restaurantSettings) return
    if (!restaurantDeliveryAreas) return

    const fee = calcDeliveryFee(
      currentAddress.areaType,
      restaurantSettings,
      restaurantDeliveryAreas,
      useRangoooDelivery,
    )

    setDeliveryFee(useRangoooDelivery ? fee / 100 : fee)
  }, [
    currentAddress?.areaType,
    restaurantSettings,
    restaurantDeliveryAreas,
    useRangoooDelivery,
    setDeliveryFee,
  ])

  const handleAddressSubmit = (data: AddressFormData) => {
    setCurrentAddress(data) // atualiza exibição local
    onAddressChange?.(data) // notifica o pai (CheckoutWizardDelivery)
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Confirme seu endereço</h3>
      <p className="text-muted-foreground text-sm">
        Verifique se o endereço está correto ou faça ajustes se necessário
      </p>

      <div className="w-full py-4">
        {currentAddress?.areaType && (
          <div className="flex justify-end py-2">
            <Badge variant="default" className="bg-orange-400">
              {AREA_TYPE_LABEL[currentAddress.areaType]}
            </Badge>
          </div>
        )}
        <p>{`${currentAddress?.street} - ${currentAddress?.number} ${currentAddress?.complement || ""} - ${currentAddress?.neighborhood} - ${currentAddress?.city}`}</p>
        {currentAddress?.reference && <p>{currentAddress.reference}</p>}
        <Button
          variant="ghost"
          className="text-red-500"
          onClick={() => setIsChangeAddressDialogOpen(true)}
        >
          Mudar Endereço
        </Button>
        <div className="mt-2 text-center text-sm">
          <span>
            Preço da entrega:{" "}
            <strong className="font-bold text-green-600">
              {formatCurrency(deliveryFee)}
            </strong>
          </span>
        </div>
        <ChangeAddressDialog
          isOpen={isChangeAddressDialogOpen}
          onOpenChange={setIsChangeAddressDialogOpen}
          userAddress={currentAddress}
          onSubmitAddress={handleAddressSubmit}
        />
      </div>
    </div>
  )
}

export default AddressStep
