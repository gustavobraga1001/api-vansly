/*
  Warnings:

  - You are about to drop the column `path` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `images` table. All the data in the column will be lost.
  - Added the required column `url` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_vehicleId_fkey";

-- AlterTable
ALTER TABLE "images" DROP COLUMN "path",
DROP COLUMN "vehicleId",
ADD COLUMN     "url" TEXT NOT NULL;
