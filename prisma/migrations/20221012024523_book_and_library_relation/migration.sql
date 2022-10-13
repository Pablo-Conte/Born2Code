/*
  Warnings:

  - You are about to drop the column `libraryId` on the `book` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "book" DROP CONSTRAINT "book_libraryId_fkey";

-- AlterTable
ALTER TABLE "book" DROP COLUMN "libraryId";

-- CreateTable
CREATE TABLE "_BookToLibrary" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookToLibrary_AB_unique" ON "_BookToLibrary"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToLibrary_B_index" ON "_BookToLibrary"("B");

-- AddForeignKey
ALTER TABLE "_BookToLibrary" ADD CONSTRAINT "_BookToLibrary_A_fkey" FOREIGN KEY ("A") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToLibrary" ADD CONSTRAINT "_BookToLibrary_B_fkey" FOREIGN KEY ("B") REFERENCES "library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
