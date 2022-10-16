/*
  Warnings:

  - You are about to drop the column `rented` on the `book` table. All the data in the column will be lost.
  - The primary key for the `library_book` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `library_book` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "book" DROP COLUMN "rented";

-- AlterTable
ALTER TABLE "library_book" DROP CONSTRAINT "library_book_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "rented" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "library_book_pkey" PRIMARY KEY ("id");
