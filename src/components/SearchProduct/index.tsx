import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type SearchProductProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const SearchProduct = ({ searchValue, setSearchValue }: SearchProductProps) => {
  return (
    <section className="flex gap-2 px-5 py-4">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Busque um sabor ou ingrediente..."
          className="pl-9"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      {/* O botão agora é opcional, já que a busca é em tempo real, 
          mas mantivemos o visual se você quiser limpar o campo */}
      {searchValue && (
        <Button variant="ghost" size="sm" onClick={() => setSearchValue("")}>
          Limpar
        </Button>
      )}
    </section>
  );
};

export default SearchProduct;
