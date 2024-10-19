/*
  Warnings:

  - The primary key for the `company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `number` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `userCpf` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `companyCnpj` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - Added the required column `id` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountedPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `condition` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userCpf_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_companyCnpj_fkey`;

-- AlterTable
ALTER TABLE `company` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `order` DROP PRIMARY KEY,
    DROP COLUMN `number`,
    DROP COLUMN `userCpf`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `product` DROP COLUMN `companyCnpj`,
    DROP COLUMN `price`,
    ADD COLUMN `companyId` INTEGER NOT NULL,
    ADD COLUMN `discountedPrice` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `fullPrice` DECIMAL(10, 2) NOT NULL,
    MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `condition` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `password`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
