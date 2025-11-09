const ProductDescription = ({ product }) => {
  return (
    <section className="space-y-2 px-4">
      <p className="text-lg font-semibold">{product.name}</p>
      <p className="text-sm opacity-55">{product.description}</p>
    </section>
  );
};

export default ProductDescription;
