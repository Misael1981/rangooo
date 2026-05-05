"use client"

import { ChevronLeftIcon } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

type SecondaryHeaderProps = {
  title: string
}

const SecondaryHeader = ({ title }: SecondaryHeaderProps) => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }
  return (
    <header className="bg-primary flex w-full items-center gap-2 p-4">
      <Button
        variant="secondary"
        size="icon"
        className="rounded-full"
        onClick={handleBack}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </Button>
      <h1 className="text-lg font-semibold text-white">{title}</h1>
    </header>
  )
}

export default SecondaryHeader
