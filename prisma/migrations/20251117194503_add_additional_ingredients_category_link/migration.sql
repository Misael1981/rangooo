-- CreateTable
CREATE TABLE "_AdditionalIngredientToMenuCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AdditionalIngredientToMenuCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AdditionalIngredientToMenuCategory_B_index" ON "_AdditionalIngredientToMenuCategory"("B");

-- AddForeignKey
ALTER TABLE "_AdditionalIngredientToMenuCategory" ADD CONSTRAINT "_AdditionalIngredientToMenuCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "AdditionalIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalIngredientToMenuCategory" ADD CONSTRAINT "_AdditionalIngredientToMenuCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "MenuCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
