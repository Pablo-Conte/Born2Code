/*
  Warnings:

  - You are about to drop the `HistoryRent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "HistoryRent";

-- CreateTable
CREATE TABLE "history_rent" (
    "id" TEXT NOT NULL,
    "libraryid" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "totalValue" TEXT,

    CONSTRAINT "history_rent_pkey" PRIMARY KEY ("id")
);
