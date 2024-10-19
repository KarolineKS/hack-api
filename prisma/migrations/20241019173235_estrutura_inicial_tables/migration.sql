/*
  Warnings:

  - You are about to drop the `marcas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vinhos` table. If the table is not empty, all the data it contains will be lost.

*/

-- CreateTable
CREATE TABLE `User` (
    `cpf` VARCHAR(11) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(11) NOT NULL,
    `address` VARCHAR(255) NULL,
    `password` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`cpf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `cnpj` VARCHAR(14) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(14) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NULL,

    PRIMARY KEY (`cnpj`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` LONGBLOB NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `companyCnpj` VARCHAR(14) NOT NULL,
    `stock` INTEGER NOT NULL,
    `category` VARCHAR(100) NULL,
    `condition` VARCHAR(191) NULL,
    `expiresIn` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `number` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` INTEGER NOT NULL,
    `userCpf` VARCHAR(191) NOT NULL,
    `orderedAt` DATETIME(3) NOT NULL,
    `delivered` BOOLEAN NOT NULL,

    PRIMARY KEY (`number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_companyCnpj_fkey` FOREIGN KEY (`companyCnpj`) REFERENCES `Company`(`cnpj`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userCpf_fkey` FOREIGN KEY (`userCpf`) REFERENCES `User`(`cpf`) ON DELETE RESTRICT ON UPDATE CASCADE;
