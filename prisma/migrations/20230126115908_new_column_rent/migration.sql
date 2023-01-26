/*
  Warnings:

  - The `percentage` column on the `discount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `newValue` column on the `discount` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[percentage]` on the table `discount` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "discount" DROP COLUMN "percentage",
ADD COLUMN     "percentage" INTEGER,
DROP COLUMN "newValue",
ADD COLUMN     "newValue" INTEGER;

-- AlterTable
ALTER TABLE "rent_user_library_book" ADD COLUMN     "percentage" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "discount_percentage_key" ON "discount"("percentage");

-- AddForeignKey
ALTER TABLE "rent_user_library_book" ADD CONSTRAINT "rent_user_library_book_percentage_fkey" FOREIGN KEY ("percentage") REFERENCES "discount"("percentage") ON DELETE CASCADE ON UPDATE CASCADE;
