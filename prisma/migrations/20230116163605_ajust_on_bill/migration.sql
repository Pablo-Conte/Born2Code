-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_userId_fkey";

-- DropIndex
DROP INDEX "Bill_userId_key";
