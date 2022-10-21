/*
  Warnings:

  - You are about to drop the `Rentuser_book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rentuser_book" DROP CONSTRAINT "Rentuser_book_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Rentuser_book" DROP CONSTRAINT "Rentuser_book_libraryId_fkey";

-- DropForeignKey
ALTER TABLE "Rentuser_book" DROP CONSTRAINT "Rentuser_book_userId_fkey";

-- DropTable
DROP TABLE "Rentuser_book";

-- CreateTable
CREATE TABLE "rent_user_book" (
    "id" TEXT NOT NULL,
    "library_bookId" TEXT NOT NULL,
    "rented_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "libraryId" TEXT NOT NULL,

    CONSTRAINT "rent_user_book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rent_user_book" ADD CONSTRAINT "rent_user_book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent_user_book" ADD CONSTRAINT "rent_user_book_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent_user_book" ADD CONSTRAINT "rent_user_book_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
