-- CreateTable
CREATE TABLE `marcas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,
    `cidade` VARCHAR(20) NOT NULL,
    `representante` VARCHAR(30) NOT NULL,
    `fone` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vinhos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(30) NOT NULL,
    `preco` DECIMAL(9, 2) NOT NULL,
    `quant` SMALLINT NOT NULL,
    `teor` DECIMAL(6, 2) NOT NULL,
    `ano` SMALLINT NOT NULL,
    `marcaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vinhos` ADD CONSTRAINT `vinhos_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
