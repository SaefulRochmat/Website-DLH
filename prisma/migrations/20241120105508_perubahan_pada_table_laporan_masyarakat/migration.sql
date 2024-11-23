/*
  Warnings:

  - You are about to drop the column `email` on the `laporanmasyarakat` table. All the data in the column will be lost.
  - You are about to drop the column `noHp` on the `laporanmasyarakat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `laporanmasyarakat` DROP COLUMN `email`,
    DROP COLUMN `noHp`,
    MODIFY `kontak` VARCHAR(191) NULL;
