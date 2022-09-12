-- CreateTable
CREATE TABLE "safeNotes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "note" VARCHAR(1000) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "safeNotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "safeNotes_title_userId_key" ON "safeNotes"("title", "userId");

-- AddForeignKey
ALTER TABLE "safeNotes" ADD CONSTRAINT "safeNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
