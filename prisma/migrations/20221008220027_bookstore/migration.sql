/*
  Warnings:

  - You are about to drop the `biblioteca` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "biblioteca";

-- CreateTable
CREATE TABLE "library" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "library_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "library_name_key" ON "library"("name");
