/*
  Warnings:

  - Added the required column `driver_id` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contracts" ADD COLUMN     "driver_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
