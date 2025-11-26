-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "LeadApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "restaurantName" TEXT NOT NULL,
    "notes" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'PENDING',
    "approvedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LeadApplication_status_createdAt_idx" ON "LeadApplication"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "LeadApplication_email_status_key" ON "LeadApplication"("email", "status");
