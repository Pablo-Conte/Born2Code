-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "library" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "library_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hourValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "library_book" (
    "id" TEXT NOT NULL,
    "libraryId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "rented" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "library_book_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokens_userId_key" ON "tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "library_name_key" ON "library"("name");

-- CreateIndex
CREATE UNIQUE INDEX "book_name_key" ON "book"("name");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_book" ADD CONSTRAINT "library_book_libraryId_fkey" FOREIGN KEY ("libraryId") REFERENCES "library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "library_book" ADD CONSTRAINT "library_book_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
