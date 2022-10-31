-- CreateTable
CREATE TABLE "HistoryRent" (
    "id" TEXT NOT NULL,
    "libraryid" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalValue" TEXT NOT NULL,

    CONSTRAINT "HistoryRent_pkey" PRIMARY KEY ("id")
);
