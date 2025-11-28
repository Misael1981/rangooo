-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'USED', 'EXPIRED');

-- CreateTable
CREATE TABLE "EnrollmentInvite" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "status" "InviteStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnrollmentInvite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EnrollmentInvite_token_key" ON "EnrollmentInvite"("token");

-- CreateIndex
CREATE INDEX "EnrollmentInvite_status_expiresAt_idx" ON "EnrollmentInvite"("status", "expiresAt");

-- AddForeignKey
ALTER TABLE "EnrollmentInvite" ADD CONSTRAINT "EnrollmentInvite_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "LeadApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
