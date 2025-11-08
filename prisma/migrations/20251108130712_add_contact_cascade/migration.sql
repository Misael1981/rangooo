-- DropForeignKey
ALTER TABLE "ContactNumber" DROP CONSTRAINT "ContactNumber_restaurantId_fkey";

-- AddForeignKey
ALTER TABLE "ContactNumber" ADD CONSTRAINT "ContactNumber_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
