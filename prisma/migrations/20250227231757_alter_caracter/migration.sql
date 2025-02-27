/*
  Warnings:

  - You are about to drop the column `driverId` on the `images_documents` table. All the data in the column will be lost.
  - Added the required column `driver_id` to the `images_documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "images_documents" DROP CONSTRAINT "images_documents_driverId_fkey";

-- AlterTable
ALTER TABLE "images_documents" DROP COLUMN "driverId",
ADD COLUMN     "driver_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "images_documents" ADD CONSTRAINT "images_documents_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
