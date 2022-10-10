/*
  Warnings:

  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_libraryId_fkey";

-- DropTable
DROP TABLE "Book";

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL,
    "libraryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book_name_key" ON "book"("name");

-- AddForeignKey
ALTER TABLE "book" ADD CONSTRAINT "book_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "library"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
