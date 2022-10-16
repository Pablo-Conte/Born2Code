/*
  Warnings:

  - You are about to drop the `Rentuser_book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `library` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `library_book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rentuser_book" DROP CONSTRAINT "Rentuser_book_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Rentuser_book" DROP CONSTRAINT "Rentuser_book_userId_fkey";

-- DropForeignKey
ALTER TABLE "library_book" DROP CONSTRAINT "library_book_bookId_fkey";

-- DropForeignKey
ALTER TABLE "library_book" DROP CONSTRAINT "library_book_libraryId_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userId_fkey";

-- DropTable
DROP TABLE "Rentuser_book";

-- DropTable
DROP TABLE "book";

-- DropTable
DROP TABLE "library";

-- DropTable
DROP TABLE "library_book";

-- DropTable
DROP TABLE "tokens";
