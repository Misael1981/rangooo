import { PiChefHatLight } from "react-icons/pi";

const ProductDescription = ({ product }) => {
  return (
    <section className="space-y-6 px-4 pb-16">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sobre</h3>
        <p className="text-sm opacity-55">{product.description}</p>
      </div>
      <div className="space-y-2">
        <h3 className="flex items-center text-lg font-semibold">
          <PiChefHatLight className="mr-2" />
          Ingredientes
        </h3>
        <ul className="list-inside list-disc text-sm opacity-55">
          {product.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductDescription;
