/*
  Warnings:

  - Added the required column `total_capacity` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "total_capacity" DECIMAL(65,30) NOT NULL;
