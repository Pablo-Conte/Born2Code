/*
  Warnings:

  - Added the required column `historyId` to the `rent_user_library_book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rent_user_library_book" ADD COLUMN     "historyId" TEXT NOT NULL;
