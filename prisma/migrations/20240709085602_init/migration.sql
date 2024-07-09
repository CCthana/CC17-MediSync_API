/*
  Warnings:

  - The values [COMPPELETED] on the enum `Appointment_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `Clinic_iamge` on the `clinic` table. All the data in the column will be lost.
  - You are about to drop the column `bloodPreasure` on the `visitornumber` table. All the data in the column will be lost.
  - You are about to drop the column `medicine` on the `visitornumber` table. All the data in the column will be lost.
  - The values [COMPPELETED] on the enum `VisitorNumber_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `doctorId` INTEGER NULL,
    ADD COLUMN `firstName` VARCHAR(50) NULL,
    ADD COLUMN `lastName` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `appointment` MODIFY `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `appointmentTime` DATE NULL,
    MODIFY `status` ENUM('PENDING', 'COMPELETED', 'CANCELED') NOT NULL;

-- AlterTable
ALTER TABLE `clinic` DROP COLUMN `Clinic_iamge`,
    ADD COLUMN `Clinic_icon` VARCHAR(256) NULL,
    ADD COLUMN `Clinic_image` VARCHAR(256) NULL,
    ADD COLUMN `location` VARCHAR(128) NULL,
    MODIFY `Clinic_detail` VARCHAR(2048) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `user_password` VARCHAR(128) NOT NULL,
    MODIFY `birthDate` DATE NULL;

-- AlterTable
ALTER TABLE `visitornumber` DROP COLUMN `bloodPreasure`,
    DROP COLUMN `medicine`,
    ADD COLUMN `bloodPressure` VARCHAR(20) NULL,
    MODIFY `status` ENUM('QUEUE', 'TREATMENT', 'PAYMENT', 'COMPELETED') NOT NULL DEFAULT 'QUEUE';

-- CreateTable
CREATE TABLE `Package` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_name` VARCHAR(256) NOT NULL,
    `package_image` VARCHAR(512) NULL,
    `package_detail` VARCHAR(1024) NULL,
    `package_promotion` DATE NULL,
    `package_price` INTEGER NULL,
    `expireDate` DATE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Career` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `career_name` VARCHAR(256) NOT NULL,
    `career_quantity` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicine_name` VARCHAR(256) NOT NULL,
    `medicine_stock` INTEGER NULL,
    `price` DECIMAL(10, 3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicineOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vn` VARCHAR(191) NOT NULL,
    `medicineId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicineOrder` ADD CONSTRAINT `MedicineOrder_vn_fkey` FOREIGN KEY (`vn`) REFERENCES `VisitorNumber`(`vn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicineOrder` ADD CONSTRAINT `MedicineOrder_medicineId_fkey` FOREIGN KEY (`medicineId`) REFERENCES `Medicine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
