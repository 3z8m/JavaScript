/*
  Warnings:

  - You are about to drop the column `diameter` on the `workroll` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `workroll` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `workroll` table. All the data in the column will be lost.
  - Added the required column `diameter_rg` to the `Workroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grinding_number` to the `Workroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processing_time` to the `Workroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workroll` DROP COLUMN `diameter`,
    DROP COLUMN `end_time`,
    DROP COLUMN `start_time`,
    ADD COLUMN `diameter_ml` DOUBLE NULL,
    ADD COLUMN `diameter_rg` DOUBLE NOT NULL,
    ADD COLUMN `grinding_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `non_processing_code1` VARCHAR(191) NULL,
    ADD COLUMN `non_processing_code2` VARCHAR(191) NULL,
    ADD COLUMN `non_processing_code3` VARCHAR(191) NULL,
    ADD COLUMN `non_processing_code4` VARCHAR(191) NULL,
    ADD COLUMN `non_processing_code5` VARCHAR(191) NULL,
    ADD COLUMN `non_processing_time1` DOUBLE NULL,
    ADD COLUMN `non_processing_time2` DOUBLE NULL,
    ADD COLUMN `non_processing_time3` DOUBLE NULL,
    ADD COLUMN `non_processing_time4` DOUBLE NULL,
    ADD COLUMN `non_processing_time5` DOUBLE NULL,
    ADD COLUMN `processing_time` DOUBLE NOT NULL,
    ADD COLUMN `width` DOUBLE NULL;
