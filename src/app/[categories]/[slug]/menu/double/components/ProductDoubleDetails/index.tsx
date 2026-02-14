"use client";

import AddToBagButton from "@/components/AddToBagButton";
import LogoImage from "@/components/LogoImage";
import DescriptionProduct from "@/components/ProductDetails/components/DescriptionProduct";
import QuantitySelector from "@/components/ProductDetails/components/QuantitySelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/contexts/cart-context";
import { ManageableIngredient } from "@/dtos/cart.dto";
import { ProductDTO } from "@/dtos/establishment-menu-data.dto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductDoubleDetailsProps {
  establishmentName: string;
  establishmentImage: string | null;
  flavor1: Partial<ProductDTO>;
  flavor2: Partial<ProductDTO>;
  deliveryFee: number;
}

const ProductDoubleDetails = ({
  establishmentName,
  establishmentImage,
  flavor1,
  flavor2,
  deliveryFee,
}: ProductDoubleDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [extrasFlavor1, setExtrasFlavor1] = useState<ManageableIngredient[]>(
    [],
  );
  const [extrasFlavor2, setExtrasFlavor2] = useState<ManageableIngredient[]>(
    [],
  );
  const [removedFlavor1, setRemovedFlavor1] = useState<string[]>([]);
  const [removedFlavor2, setRemovedFlavor2] = useState<string[]>([]);

  const allExtras = [...extrasFlavor1, ...extrasFlavor2];

  const calculateDoublePrice = (price1: number, price2: number): number => {
    return Math.max(price1, price2);
  };

  const { setDeliveryFee, setConsumptionMethod } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    const method = searchParams.get("consumptionMethod");
    if (method) {
      setConsumptionMethod(method);
    }

    if (deliveryFee !== undefined) {
      setDeliveryFee(Number(deliveryFee));
    }
  }, [searchParams, deliveryFee, setDeliveryFee, setConsumptionMethod]);

  const productsToCart = {
    lineId: `double-${flavor1.id}-${flavor2.id}-${JSON.stringify(allExtras)}-${JSON.stringify(removedFlavor1)}-${JSON.stringify(removedFlavor2)}`,
    productId: flavor1.id || "",
    name: `1/2 ${flavor1.name} | 1/2 ${flavor2.name}`,
    imageUrl: flavor1.imageUrl || null,
    price: calculateDoublePrice(flavor1.price ?? 0, flavor2.price ?? 0),
    isDouble: true,
    removedIngredients: removedFlavor1,
    flavor2: {
      id: flavor2.id || "",
      name: flavor2.name || "",
      removedIngredients: removedFlavor2,
    },
    extras: allExtras,
    quantity: quantity,
    consumptionMethod: searchParams.get("consumptionMethod") || "",
  };

  return (
    <>
      <section>
        <div className="flex gap-2 items-center mb-1">
          <LogoImage
            establishmentImage={establishmentImage}
            width={40}
            height={40}
            alt={establishmentName}
          />
          <div>
            <h2 className="text-base text-muted-foreground">
              {establishmentName}
            </h2>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold">
            1/2 {flavor1.name} e 1/2 {flavor2.name}
          </h1>
        </div>
        <QuantitySelector
          price={calculateDoublePrice(flavor1.price ?? 0, flavor2.price ?? 0)}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </section>
      <ScrollArea className="max-h-[calc(100vh-220px)] overflow-auto">
        <DescriptionProduct
          title={flavor1.name || null}
          descriptionProduct={flavor1.description || null}
          additionalIngredients={flavor1.additionalIngredients || []}
          ingredients={(flavor1.ingredients || []) as unknown as string[]}
          onExtrasChange={(extrasFlavor1) => setExtrasFlavor1(extrasFlavor1)}
          onRemovedIngredientsChange={(removed) => setRemovedFlavor1(removed)}
        />
        <DescriptionProduct
          title={flavor2.name}
          descriptionProduct={flavor2.description || null}
          additionalIngredients={flavor2.additionalIngredients || []}
          ingredients={(flavor2.ingredients || []) as unknown as string[]}
          onExtrasChange={(extrasFlavor2) => setExtrasFlavor2(extrasFlavor2)}
          onRemovedIngredientsChange={(removed) => setRemovedFlavor2(removed)}
        />
      </ScrollArea>
      <AddToBagButton product={productsToCart} />
    </>
  );
};

export default ProductDoubleDetails;
