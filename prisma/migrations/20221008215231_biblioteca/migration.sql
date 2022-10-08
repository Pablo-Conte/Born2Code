-- CreateTable
CREATE TABLE "biblioteca" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "biblioteca_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "biblioteca_name_key" ON "biblioteca"("name");
