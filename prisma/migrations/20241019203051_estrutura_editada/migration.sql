/*
  Warnings:

  - Made the column `address` on table `company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `expiresIn` to the `product` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `company` MODIFY `address` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `category` VARCHAR(100) NOT NULL,
    DROP COLUMN `expiresIn`,
    ADD COLUMN `expiresIn` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `address` VARCHAR(255) NOT NULL;
