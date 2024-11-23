/*
  Warnings:

  - Added the required column `kategori` to the `LaporanMasyarakat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kontak` to the `LaporanMasyarakat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lokasi` to the `LaporanMasyarakat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `laporanmasyarakat` ADD COLUMN `kategori` VARCHAR(191) NOT NULL,
    ADD COLUMN `kontak` VARCHAR(191) NOT NULL,
    ADD COLUMN `lokasi` VARCHAR(191) NOT NULL;
