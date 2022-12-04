/*
  Warnings:

  - Added the required column `email` to the `library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "library" ADD COLUMN     "email" TEXT NOT NULL;
