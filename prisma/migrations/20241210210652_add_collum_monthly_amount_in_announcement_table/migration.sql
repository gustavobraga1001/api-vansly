/*
  Warnings:

  - Added the required column `monthlyAmount` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "monthlyAmount" DECIMAL(65,30) NOT NULL;
