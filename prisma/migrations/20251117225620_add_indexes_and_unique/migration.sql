/*
  Warnings:

  - You are about to drop the `_AdditionalIngredientToMenuCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdditionalIngredientToProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[restaurantId,name]` on the table `AdditionalIngredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AdditionalIngredient" DROP CONSTRAINT "AdditionalIngredient_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "_AdditionalIngredientToMenuCategory" DROP CONSTRAINT "_AdditionalIngredientToMenuCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdditionalIngredientToMenuCategory" DROP CONSTRAINT "_AdditionalIngredientToMenuCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_AdditionalIngredientToProduct" DROP CONSTRAINT "_AdditionalIngredientToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdditionalIngredientToProduct" DROP CONSTRAINT "_AdditionalIngredientToProduct_B_fkey";

-- DropTable
DROP TABLE "_AdditionalIngredientToMenuCategory";

-- DropTable
DROP TABLE "_AdditionalIngredientToProduct";

-- CreateTable
CREATE TABLE "AdditionalOptionGroup" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "minSelection" INTEGER NOT NULL DEFAULT 0,
    "maxSelection" INTEGER NOT NULL DEFAULT 1,
    "menuCategoryId" TEXT,
    "productId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdditionalOptionGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionGroupItem" (
    "id" TEXT NOT NULL,
    "additionalIngredientId" TEXT NOT NULL,
    "optionGroupId" TEXT NOT NULL,
    "customPrice" DECIMAL(6,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OptionGroupItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdditionalOptionGroup_restaurantId_idx" ON "AdditionalOptionGroup"("restaurantId");

-- CreateIndex
CREATE INDEX "AdditionalOptionGroup_menuCategoryId_idx" ON "AdditionalOptionGroup"("menuCategoryId");

-- CreateIndex
CREATE INDEX "AdditionalOptionGroup_productId_idx" ON "AdditionalOptionGroup"("productId");

-- CreateIndex
CREATE INDEX "OptionGroupItem_optionGroupId_idx" ON "OptionGroupItem"("optionGroupId");

-- CreateIndex
CREATE INDEX "OptionGroupItem_additionalIngredientId_idx" ON "OptionGroupItem"("additionalIngredientId");

-- CreateIndex
CREATE UNIQUE INDEX "OptionGroupItem_additionalIngredientId_optionGroupId_key" ON "OptionGroupItem"("additionalIngredientId", "optionGroupId");

-- CreateIndex
CREATE INDEX "AdditionalIngredient_restaurantId_idx" ON "AdditionalIngredient"("restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalIngredient_restaurantId_name_key" ON "AdditionalIngredient"("restaurantId", "name");

-- AddForeignKey
ALTER TABLE "AdditionalOptionGroup" ADD CONSTRAINT "AdditionalOptionGroup_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalOptionGroup" ADD CONSTRAINT "AdditionalOptionGroup_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdditionalOptionGroup" ADD CONSTRAINT "AdditionalOptionGroup_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionGroupItem" ADD CONSTRAINT "OptionGroupItem_additionalIngredientId_fkey" FOREIGN KEY ("additionalIngredientId") REFERENCES "AdditionalIngredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionGroupItem" ADD CONSTRAINT "OptionGroupItem_optionGroupId_fkey" FOREIGN KEY ("optionGroupId") REFERENCES "AdditionalOptionGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
