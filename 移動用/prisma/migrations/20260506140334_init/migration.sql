-- CreateTable
CREATE TABLE `Workroll` (
    `id` VARCHAR(191) NOT NULL,
    `roll_id` VARCHAR(191) NOT NULL,
    `roll_type` VARCHAR(191) NOT NULL,
    `grinding_type` VARCHAR(191) NOT NULL,
    `grinding_amount` DOUBLE NOT NULL,
    `diameter` DOUBLE NOT NULL,
    `ra_i` DOUBLE NULL,
    `ra_h` DOUBLE NULL,
    `judgement` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NULL,
    `operation_date` VARCHAR(191) NOT NULL,
    `start_time` VARCHAR(191) NOT NULL,
    `end_time` VARCHAR(191) NOT NULL,
    `operator` VARCHAR(191) NOT NULL,
    `operation_group` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
