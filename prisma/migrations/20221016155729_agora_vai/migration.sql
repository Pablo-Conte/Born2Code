/*
  Warnings:

  - The primary key for the `Rentuser_book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Rentuser_book` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Rentuser_book" DROP CONSTRAINT "Rentuser_book_libraryId_fkey";

-- AlterTable
ALTER TABLE "Rentuser_book" DROP CONSTRAINT "Rentuser_book_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Rentuser_book_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Rentuser_book" ADD CONSTRAINT "Rentuser_book_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
