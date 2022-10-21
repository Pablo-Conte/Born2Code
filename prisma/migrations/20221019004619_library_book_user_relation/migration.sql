/*
  Warnings:

  - You are about to drop the `rent_user_book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "rent_user_book" DROP CONSTRAINT "rent_user_book_library_bookId_fkey";

-- DropForeignKey
ALTER TABLE "rent_user_book" DROP CONSTRAINT "rent_user_book_userId_fkey";

-- DropTable
DROP TABLE "rent_user_book";

-- CreateTable
CREATE TABLE "rent_user_library_book" (
    "id" TEXT NOT NULL,
    "rented_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "library_bookId" TEXT NOT NULL,

    CONSTRAINT "rent_user_library_book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rent_user_library_book" ADD CONSTRAINT "rent_user_library_book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rent_user_library_book" ADD CONSTRAINT "rent_user_library_book_library_bookId_fkey" FOREIGN KEY ("library_bookId") REFERENCES "library_book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
