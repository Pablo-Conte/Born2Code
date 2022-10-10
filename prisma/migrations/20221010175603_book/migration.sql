/*
  Warnings:

  - Made the column `libraryId` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_libraryId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "libraryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
