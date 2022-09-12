/*
  Warnings:

  - You are about to drop the `wifi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "wifi" DROP CONSTRAINT "wifi_userId_fkey";

-- DropTable
DROP TABLE "wifi";

-- CreateTable
CREATE TABLE "wifiNetworks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "networkName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "wifiNetworks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wifiNetworks_title_userId_key" ON "wifiNetworks"("title", "userId");

-- AddForeignKey
ALTER TABLE "wifiNetworks" ADD CONSTRAINT "wifiNetworks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
