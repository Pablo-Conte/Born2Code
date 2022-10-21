/*
  Warnings:

  - You are about to drop the column `bookId` on the `rent_user_book` table. All the data in the column will be lost.
  - You are about to drop the column `libraryId` on the `rent_user_book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rent_user_book" DROP CONSTRAINT "rent_user_book_bookId_fkey";

-- DropForeignKey
ALTER TABLE "rent_user_book" DROP CONSTRAINT "rent_user_book_libraryId_fkey";

-- AlterTable
ALTER TABLE "rent_user_book" DROP COLUMN "bookId",
DROP COLUMN "libraryId";

-- AddForeignKey
ALTER TABLE "rent_user_book" ADD CONSTRAINT "rent_user_book_library_bookId_fkey" FOREIGN KEY ("library_bookId") REFERENCES "library_book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
