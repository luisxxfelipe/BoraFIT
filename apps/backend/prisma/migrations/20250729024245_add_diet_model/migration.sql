-- CreateTable
CREATE TABLE `Diet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `calorias` DOUBLE NOT NULL,
    `proteinas` DOUBLE NOT NULL,
    `carbs` DOUBLE NOT NULL,
    `gorduras` DOUBLE NOT NULL,
    `horarios` VARCHAR(191) NOT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Diet` ADD CONSTRAINT `Diet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
