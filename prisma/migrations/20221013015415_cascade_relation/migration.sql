-- DropForeignKey
ALTER TABLE "library_book" DROP CONSTRAINT "library_book_bookId_fkey";

-- DropForeignKey
ALTER TABLE "library_book" DROP CONSTRAINT "library_book_libraryId_fkey";

-- AddForeignKey
ALTER TABLE "library_book" ADD CONSTRAINT "library_book_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_book" ADD CONSTRAINT "library_book_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
