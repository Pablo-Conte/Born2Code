/*
  Warnings:

  - The primary key for the `EmphasisBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EmphasisBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmphasisBook" DROP CONSTRAINT "EmphasisBook_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "EmphasisBook_pkey" PRIMARY KEY ("bookId");
