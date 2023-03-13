-- DropForeignKey
ALTER TABLE "EmphasisBook" DROP CONSTRAINT "EmphasisBook_bookId_fkey";

-- AddForeignKey
ALTER TABLE "EmphasisBook" ADD CONSTRAINT "EmphasisBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
