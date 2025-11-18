/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `AdditionalIngredient` table. All the data in the column will be lost.
  - You are about to drop the `AdditionalOptionGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OptionGroupItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[menu_category_id,name]` on the table `AdditionalIngredient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `menu_category_id` to the `AdditionalIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdditionalOptionGroup" DROP CONSTRAINT "AdditionalOptionGroup_menuCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "AdditionalOptionGroup" DROP CONSTRAINT "AdditionalOptionGroup_productId_fkey";

-- DropForeignKey
ALTER TABLE "AdditionalOptionGroup" DROP CONSTRAINT "AdditionalOptionGroup_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "OptionGroupItem" DROP CONSTRAINT "OptionGroupItem_additionalIngredientId_fkey";

-- DropForeignKey
ALTER TABLE "OptionGroupItem" DROP CONSTRAINT "OptionGroupItem_optionGroupId_fkey";

-- DropIndex
DROP INDEX "AdditionalIngredient_restaurantId_idx";

-- DropIndex
DROP INDEX "AdditionalIngredient_restaurantId_name_key";

-- AlterTable
ALTER TABLE "AdditionalIngredient" DROP COLUMN "restaurantId",
ADD COLUMN     "menu_category_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "additionalIngredients" JSONB;

-- DropTable
DROP TABLE "AdditionalOptionGroup";

-- DropTable
DROP TABLE "OptionGroupItem";

-- CreateIndex
CREATE INDEX "AdditionalIngredient_menu_category_id_idx" ON "AdditionalIngredient"("menu_category_id");

-- CreateIndex
CREATE UNIQUE INDEX "AdditionalIngredient_menu_category_id_name_key" ON "AdditionalIngredient"("menu_category_id", "name");

-- AddForeignKey
ALTER TABLE "AdditionalIngredient" ADD CONSTRAINT "AdditionalIngredient_menu_category_id_fkey" FOREIGN KEY ("menu_category_id") REFERENCES "MenuCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
