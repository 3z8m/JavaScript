/*
  Warnings:

  - Made the column `diameter_ml` on table `workroll` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `workroll` MODIFY `diameter_ml` DOUBLE NOT NULL;
