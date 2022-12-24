-- CreateTable
CREATE TABLE "EmphasisBook" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "totalRents" INTEGER NOT NULL,

    CONSTRAINT "EmphasisBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmphasisBook_bookId_key" ON "EmphasisBook"("bookId");

-- AddForeignKey
ALTER TABLE "EmphasisBook" ADD CONSTRAINT "EmphasisBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
