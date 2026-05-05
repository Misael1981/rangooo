"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

type HeaderDoubleImagesProps = {
  imageUrl1: string | null
  imageUrl2: string | null
  alt1: string
  alt2: string
}

const HeaderDoubleImages = ({
  imageUrl1,
  imageUrl2,
  alt1,
  alt2,
}: HeaderDoubleImagesProps) => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  const handleCartClick = () => {
    console.log("Clicou no carrinho!")
  }

  return (
    <header className="relative min-h-83 w-full">
      <div className="relative flex w-full snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <div className="relative h-83 min-w-[90%] shrink-0 snap-center">
          <div className="absolute top-0 left-0 z-10 h-full w-full bg-black/50" />
          <Image
            src={imageUrl1 || "/default-image.jpg"}
            alt={alt1}
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-83 min-w-[90%] shrink-0 snap-center">
          <div className="absolute top-0 left-0 z-10 h-full w-full bg-black/50" />
          <Image
            src={imageUrl2 || "/default-image.jpg"}
            alt={alt2}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 left-4 z-20 rounded-full"
        onClick={handleBack}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 z-20 rounded-full"
        onClick={handleCartClick}
      >
        <ShoppingCart />
      </Button>
    </header>
  )
}

export default HeaderDoubleImages
