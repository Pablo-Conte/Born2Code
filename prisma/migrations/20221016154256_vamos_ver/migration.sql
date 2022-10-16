/*
  Warnings:

  - The primary key for the `Rentuser_book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `libraryId` to the `Rentuser_book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rentuser_book" DROP CONSTRAINT "Rentuser_book_pkey",
ADD COLUMN     "libraryId" TEXT NOT NULL,
ADD CONSTRAINT "Rentuser_book_pkey" PRIMARY KEY ("userId", "bookId", "libraryId");

-- AddForeignKey
ALTER TABLE "Rentuser_book" ADD CONSTRAINT "Rentuser_book_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
