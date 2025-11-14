import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const AboutProducts = ({ product, secondProduct }) => {
  return (
    <ScrollArea className="flex h-[350px] flex-col gap-4 bg-white pb-8">
      <h2 className="text-lg font-bold">Sobre os Produtos</h2>
      <div className="space-y-2">
        <h3 className="text-md font-bold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <ul className="list-inside list-disc">
          {product.ingredients.map((ingredient, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-md font-bold">{secondProduct.name}</h3>
        <p className="text-sm text-muted-foreground">
          {secondProduct.description}
        </p>
        <ul className="list-inside list-disc">
          {secondProduct.ingredients.map((ingredient, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default AboutProducts;
