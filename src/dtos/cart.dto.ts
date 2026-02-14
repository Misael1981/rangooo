export type ManageableIngredient = {
  id?: string;
  name: string;
  price?: number;
};

export type AddToBagButtonProps = {
  product: {
    lineId: string;
    productId: string;
    imageUrl: string | null;
    name: string;
    price: number;
    extras: ManageableIngredient[];
    quantity: number;
    consumptionMethod: string;
  };
};
