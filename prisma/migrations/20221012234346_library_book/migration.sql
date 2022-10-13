/*
  Warnings:

  - You are about to drop the `_BookToLibrary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BookToLibrary" DROP CONSTRAINT "_BookToLibrary_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToLibrary" DROP CONSTRAINT "_BookToLibrary_B_fkey";

-- DropTable
DROP TABLE "_BookToLibrary";

-- CreateTable
CREATE TABLE "library_book" (
    "libraryId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "library_book_pkey" PRIMARY KEY ("libraryId","bookId")
);

-- AddForeignKey
ALTER TABLE "library_book" ADD CONSTRAINT "library_book_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_book" ADD CONSTRAINT "library_book_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
