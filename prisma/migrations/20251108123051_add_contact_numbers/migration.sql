/*
  Warnings:

  - You are about to drop the column `phones` on the `Restaurant` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('PHONE', 'WHATSAPP');

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "phones",
ADD COLUMN     "socialMedia" JSONB;

-- CreateTable
CREATE TABLE "ContactNumber" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "type" "ContactType" NOT NULL,
    "number" TEXT NOT NULL,
    "label" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactNumber_restaurantId_type_idx" ON "ContactNumber"("restaurantId", "type");

-- AddForeignKey
ALTER TABLE "ContactNumber" ADD CONSTRAINT "ContactNumber_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
