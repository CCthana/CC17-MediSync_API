-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hn` VARCHAR(20) NOT NULL,
    `user_password` VARCHAR(50) NOT NULL,
    `user_firstName` VARCHAR(30) NOT NULL,
    `User_lastName` VARCHAR(30) NOT NULL,
    `user_phone` VARCHAR(20) NULL,
    `user_email` VARCHAR(50) NULL,
    `user_address` VARCHAR(256) NULL,
    `birthDate` DATETIME(3) NULL,
    `nationality` VARCHAR(30) NULL,
    `user_gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `drug_allergies` VARCHAR(128) NULL,

    UNIQUE INDEX `User_hn_key`(`hn`),
    UNIQUE INDEX `User_user_phone_key`(`user_phone`),
    UNIQUE INDEX `User_user_email_key`(`user_email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clinic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Clinic_name` VARCHAR(50) NOT NULL,
    `Clinic_detail` VARCHAR(512) NULL,
    `Clinic_iamge` VARCHAR(256) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clinicId` INTEGER NULL,
    `Doctor_firstName` VARCHAR(50) NOT NULL,
    `Doctor_lastName` VARCHAR(50) NOT NULL,
    `birthDate` DATETIME(3) NULL,
    `education` VARCHAR(50) NULL,
    `image` VARCHAR(256) NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VisitorNumber` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hn` VARCHAR(191) NOT NULL,
    `clinicId` INTEGER NULL,
    `doctorId` INTEGER NULL,
    `vn` VARCHAR(20) NOT NULL,
    `weight` DECIMAL(10, 3) NULL,
    `height` DECIMAL(10, 3) NULL,
    `heartRate` DECIMAL(10, 3) NULL,
    `bloodPreasure` VARCHAR(20) NULL,
    `temperature` DECIMAL(10, 3) NULL,
    `symptoms` VARCHAR(256) NULL,
    `treatmentResult` VARCHAR(1024) NULL,
    `diagnosis` VARCHAR(256) NULL,
    `medicine` VARCHAR(256) NULL,
    `totalPrice` DECIMAL(10, 3) NULL DEFAULT 0,
    `vnType` ENUM('OPD', 'ADMIT') NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `summary` VARCHAR(256) NULL,
    `recipt` VARCHAR(256) NULL,
    `status` ENUM('QUEUE', 'TREATMENT', 'PAYMENT', 'COMPPELETED') NOT NULL DEFAULT 'QUEUE',

    UNIQUE INDEX `VisitorNumber_vn_key`(`vn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MedicalCertificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vn` VARCHAR(191) NOT NULL,
    `hn` VARCHAR(191) NOT NULL,
    `doctorId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `certificate` VARCHAR(256) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hn` VARCHAR(191) NOT NULL,
    `doctorId` INTEGER NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `appointmentTime` DATETIME(3) NOT NULL,
    `status` ENUM('PENDING', 'COMPPELETED', 'CANCELED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(50) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `role` ENUM('RECEPTION', 'NURSE', 'DOCTOR', 'ACCOUNT', 'ADMIN') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitorNumber` ADD CONSTRAINT `VisitorNumber_hn_fkey` FOREIGN KEY (`hn`) REFERENCES `User`(`hn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitorNumber` ADD CONSTRAINT `VisitorNumber_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VisitorNumber` ADD CONSTRAINT `VisitorNumber_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalCertificate` ADD CONSTRAINT `MedicalCertificate_hn_fkey` FOREIGN KEY (`hn`) REFERENCES `User`(`hn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalCertificate` ADD CONSTRAINT `MedicalCertificate_vn_fkey` FOREIGN KEY (`vn`) REFERENCES `VisitorNumber`(`vn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalCertificate` ADD CONSTRAINT `MedicalCertificate_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_hn_fkey` FOREIGN KEY (`hn`) REFERENCES `User`(`hn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
