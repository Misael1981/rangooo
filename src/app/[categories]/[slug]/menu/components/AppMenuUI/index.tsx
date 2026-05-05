"use client"

import dynamic from "next/dynamic"
import { Loader2 } from "lucide-react"
import { EstablishmentMenuDataDTO } from "@/dtos/establishment-menu-data.dto"

const MENU_MAP = {
  pizzarias: dynamic(() => import("../pizzarias/PizzariaMenuUI"), {
    loading: () => (
      <Loader2 className="mx-auto mt-20 animate-spin text-red-500" />
    ),
  }),
  default: dynamic(() => import("../default/DefaultMenuUI")),
} as const

type MenuCategory = keyof typeof MENU_MAP

type AppMenuUIProps = {
  category: string
  establishment: EstablishmentMenuDataDTO
}

const AppMenuUI = ({ category, establishment }: AppMenuUIProps) => {
  const categoryKey: MenuCategory =
    category in MENU_MAP ? (category as MenuCategory) : "default"

  const SpecificMenuUI = MENU_MAP[categoryKey]

  return <SpecificMenuUI establishment={establishment} />
}

export default AppMenuUI
