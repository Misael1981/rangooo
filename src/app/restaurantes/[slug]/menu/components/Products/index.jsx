import Image from "next/image";

const Products = ({ products }) => {
  return (
    <div className="space-y-6 p-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-8 rounded-md p-4 shadow-2xl"
        >
          <div className="space-y-2">
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {product.description}
            </p>
            <p className="text-sm font-semibold text-green-600">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </p>
          </div>
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
