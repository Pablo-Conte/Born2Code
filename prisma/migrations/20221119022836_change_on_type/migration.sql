/*
  Warnings:

  - The `totalValue` column on the `history_rent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "history_rent" DROP COLUMN "totalValue",
ADD COLUMN     "totalValue" DOUBLE PRECISION;
