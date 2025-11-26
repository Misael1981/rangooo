/*
  Warnings:

  - Added the required column `city` to the `LeadApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `LeadApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LeadApplication" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
