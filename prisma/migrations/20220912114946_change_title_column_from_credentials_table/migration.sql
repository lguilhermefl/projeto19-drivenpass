/*
  Warnings:

  - You are about to drop the column `tittle` on the `credentials` table. All the data in the column will be lost.
  - Added the required column `title` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "tittle",
ADD COLUMN     "title" TEXT NOT NULL;
