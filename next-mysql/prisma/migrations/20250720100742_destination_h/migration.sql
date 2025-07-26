-- CreateTable
CREATE TABLE `Destination_H` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `order` VARCHAR(191) NOT NULL,
    `row` VARCHAR(191) NOT NULL,
    `presence` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `lunch` VARCHAR(191) NOT NULL,
    `lunch_default` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
