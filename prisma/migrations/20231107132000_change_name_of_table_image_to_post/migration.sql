/*
  Warnings:

  - You are about to drop the column `imageUuid` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `imageUuid` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `postUuid` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_imageUuid_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_userUuid_fkey`;

-- DropForeignKey
ALTER TABLE `Tag` DROP FOREIGN KEY `Tag_imageUuid_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `imageUuid`,
    ADD COLUMN `postUuid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Tag` DROP COLUMN `imageUuid`,
    ADD COLUMN `postUuid` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Image`;

-- CreateTable
CREATE TABLE `Post` (
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `url` VARCHAR(191) NOT NULL,
    `userUuid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userUuid_fkey` FOREIGN KEY (`userUuid`) REFERENCES `tb_users`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postUuid_fkey` FOREIGN KEY (`postUuid`) REFERENCES `Post`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_postUuid_fkey` FOREIGN KEY (`postUuid`) REFERENCES `Post`(`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;
