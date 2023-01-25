-- CreateTable
CREATE TABLE "discount" (
    "id" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION,
    "bookId" TEXT NOT NULL,
    "newValue" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),

    CONSTRAINT "discount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "discount" ADD CONSTRAINT "discount_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
