/*
  Warnings:

  - You are about to drop the column `category` on the `Bill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bill" DROP COLUMN "category",
ALTER COLUMN "isPaid" SET DEFAULT false;
