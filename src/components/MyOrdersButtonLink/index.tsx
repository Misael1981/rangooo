import Link from "next/link"
import { Button } from "../ui/button"
import { ScrollTextIcon } from "lucide-react"

const MyOrdersButtonLink = () => {
  return (
    <Link href="/meus-pedidos">
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 z-20 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </Link>
  )
}

export default MyOrdersButtonLink
