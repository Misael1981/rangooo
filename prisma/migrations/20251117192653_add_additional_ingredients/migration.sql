-- CreateTable
CREATE TABLE "AdditionalIngredient" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(6,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdditionalIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdditionalIngredientToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AdditionalIngredientToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AdditionalIngredientToProduct_B_index" ON "_AdditionalIngredientToProduct"("B");

-- AddForeignKey
ALTER TABLE "AdditionalIngredient" ADD CONSTRAINT "AdditionalIngredient_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalIngredientToProduct" ADD CONSTRAINT "_AdditionalIngredientToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "AdditionalIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalIngredientToProduct" ADD CONSTRAINT "_AdditionalIngredientToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
