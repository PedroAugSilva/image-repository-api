/*
  Warnings:

  - You are about to drop the column `url` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `tagName` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `url`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Tag` DROP COLUMN `tagName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
