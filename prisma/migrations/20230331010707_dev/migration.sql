-- CreateTable
CREATE TABLE "Notthing" (
    "not" TEXT NOT NULL,

    CONSTRAINT "Notthing_pkey" PRIMARY KEY ("not")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notthing_not_key" ON "Notthing"("not");
