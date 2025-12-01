-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'MEAL_VOUCHER', 'FOOD_VOUCHER', 'ONLINE');

-- CreateEnum
CREATE TYPE "CardBrand" AS ENUM ('VISA', 'MASTERCARD', 'ELO', 'AMERICAN_EXPRESS', 'HIPERCARD', 'DINERS_CLUB', 'DISCOVER', 'AURA');

-- CreateTable
CREATE TABLE "RestaurantPaymentMethod" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "cardBrands" "CardBrand"[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantPaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RestaurantPaymentMethod_restaurantId_isActive_idx" ON "RestaurantPaymentMethod"("restaurantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantPaymentMethod_restaurantId_method_key" ON "RestaurantPaymentMethod"("restaurantId", "method");

-- AddForeignKey
ALTER TABLE "RestaurantPaymentMethod" ADD CONSTRAINT "RestaurantPaymentMethod_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
