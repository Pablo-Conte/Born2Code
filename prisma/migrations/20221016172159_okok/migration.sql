/*
  Warnings:

  - You are about to drop the column `rentuser_bookId` on the `library_book` table. All the data in the column will be lost.
  - Added the required column `library_bookId` to the `Rentuser_book` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "library_book" DROP CONSTRAINT "library_book_rentuser_bookId_fkey";

-- AlterTable
ALTER TABLE "Rentuser_book" ADD COLUMN     "library_bookId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "library_book" DROP COLUMN "rentuser_bookId";
