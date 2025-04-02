/*
  Warnings:

  - Changed the type of `impact` on the `Goal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ImpactLevel" AS ENUM ('MINIMAL', 'MODERATE', 'SIGNIFICANT', 'MAJOR', 'CRITICAL');

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "impact",
ADD COLUMN     "impact" "ImpactLevel" NOT NULL;
