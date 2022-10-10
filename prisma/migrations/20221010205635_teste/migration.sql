-- DropForeignKey
ALTER TABLE "book" DROP CONSTRAINT "book_libraryId_fkey";

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
