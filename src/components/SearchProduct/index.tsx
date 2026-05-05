import { Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type SearchProductProps = {
  searchValue: string
  setSearchValue: (value: string) => void
}

const SearchProduct = ({ searchValue, setSearchValue }: SearchProductProps) => {
  return (
    <section className="flex gap-2 px-5 py-4">
      <div className="relative w-full">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Busque um sabor ou ingrediente..."
          className="pl-9"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      {searchValue && (
        <Button variant="ghost" size="sm" onClick={() => setSearchValue("")}>
          Limpar
        </Button>
      )}
    </section>
  )
}

export default SearchProduct
