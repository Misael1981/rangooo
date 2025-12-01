-- CreateTable
CREATE TABLE "RestaurantConsumptionMethod" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "method" "ConsumptionMethod" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantConsumptionMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RestaurantConsumptionMethod_restaurantId_isActive_idx" ON "RestaurantConsumptionMethod"("restaurantId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantConsumptionMethod_restaurantId_method_key" ON "RestaurantConsumptionMethod"("restaurantId", "method");

-- AddForeignKey
ALTER TABLE "RestaurantConsumptionMethod" ADD CONSTRAINT "RestaurantConsumptionMethod_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
