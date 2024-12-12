/*
  Warnings:

  - The values [MORNING,AFTERNOON,EVENING] on the enum `Period` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `shift` on the `contracts` table. All the data in the column will be lost.
  - You are about to drop the column `adress` on the `stops` table. All the data in the column will be lost.
  - You are about to drop the column `adress` on the `users` table. All the data in the column will be lost.
  - Added the required column `period` to the `contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `stops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Period_new" AS ENUM ('MANHA', 'TARDE', 'NOITE');
ALTER TABLE "contracts" ALTER COLUMN "period" TYPE "Period_new" USING ("period"::text::"Period_new");
ALTER TABLE "routes" ALTER COLUMN "period" TYPE "Period_new" USING ("period"::text::"Period_new");
ALTER TYPE "Period" RENAME TO "Period_old";
ALTER TYPE "Period_new" RENAME TO "Period";
DROP TYPE "Period_old";
COMMIT;

-- AlterTable
ALTER TABLE "contracts" DROP COLUMN "shift",
ADD COLUMN     "period" "Period" NOT NULL;

-- AlterTable
ALTER TABLE "stops" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "adress";
