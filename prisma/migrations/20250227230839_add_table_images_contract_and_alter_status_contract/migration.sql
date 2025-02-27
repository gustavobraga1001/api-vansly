/*
  Warnings:

  - Made the column `institution` on table `contracts` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `status` on the `contracts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StageContract" AS ENUM ('ACEITO', 'PENDENTE', 'NEGADO');

-- AlterTable
ALTER TABLE "contracts" ALTER COLUMN "landing" DROP NOT NULL,
ALTER COLUMN "institution" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StageContract" NOT NULL;

-- CreateTable
CREATE TABLE "images_documents" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,

    CONSTRAINT "images_documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images_documents" ADD CONSTRAINT "images_documents_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
