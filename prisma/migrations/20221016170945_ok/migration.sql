-- AlterTable
ALTER TABLE "library_book" ADD COLUMN     "rentuser_bookId" TEXT;

-- AddForeignKey
ALTER TABLE "library_book" ADD CONSTRAINT "library_book_rentuser_bookId_fkey" FOREIGN KEY ("rentuser_bookId") REFERENCES "Rentuser_book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
