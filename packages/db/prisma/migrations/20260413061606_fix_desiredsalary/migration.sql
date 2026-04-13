/*
  Warnings:

  - You are about to drop the column `desiredSalary` on the `Preference` table. All the data in the column will be lost.
  - Added the required column `desiredsalary` to the `Preference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Preference" DROP COLUMN "desiredSalary",
ADD COLUMN     "desiredsalary" TEXT NOT NULL;
