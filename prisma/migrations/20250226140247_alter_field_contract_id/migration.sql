/*
  Warnings:

  - You are about to drop the column `contractId` on the `payments` table. All the data in the column will be lost.
  - Added the required column `contract_id` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_contractId_fkey";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "contractId",
ADD COLUMN     "contract_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_contract_id_fkey" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
