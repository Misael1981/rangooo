"use client";

import { useCart } from "@/contexts/cart-context";
import { calcDeliveryFee } from "@/helpers/calc-delivery";
import { useEffect, useState } from "react";

const AddressStep = ({ userAddress }: AddressStepProps) => {
  const [isChangeAddressDialogOpen, setIsChangeAddressDialogOpen] =
    useState(false);

  // 1. Pega as funções de atualização do contexto
  const {
    setDeliveryFee,
    setUserAreaType,
    systemSettings,
    restaurantDeliveryAreas,
    useRangoooDelivery,
  } = useCart();

  // 2. Sempre que o userAddress mudar (vindo do Wizard ou do Dialog), a gente recalcula
  useEffect(() => {
    if (userAddress?.areaType) {
      // Avisa ao contexto qual é a nova área
      setUserAreaType(userAddress.areaType);

      // Faz a conta marota
      const fee = calcDeliveryFee(
        userAddress.areaType,
        systemSettings,
        restaurantDeliveryAreas,
        useRangoooDelivery,
      );

      // Converte se for Rangooo, senão usa o valor cheio
      const finalFee = useRangoooDelivery ? fee / 100 : fee;

      setDeliveryFee(finalFee);
    }
  }, [
    userAddress,
    setDeliveryFee,
    setUserAreaType,
    systemSettings,
    restaurantDeliveryAreas,
    useRangoooDelivery,
  ]);

  return (
    <>
      <h1>Endereço</h1>
    </>
  );
};
