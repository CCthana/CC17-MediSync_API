-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` VARCHAR(50) NOT NULL,
    `user_password` VARCHAR(50) NOT NULL,
    `user_firstName` VARCHAR(30) NOT NULL,
    `User_lastName` VARCHAR(30) NOT NULL,
    `user_phone` INTEGER NOT NULL,
    `user_email` VARCHAR(50) NOT NULL,
    `user_address` VARCHAR(256) NULL,
    `birthDate` DATETIME(3) NULL,
    `nationality` VARCHAR(30) NULL,
    `user_gender` ENUM('male', 'female', 'other') NOT NULL,

    UNIQUE INDEX `User_patientId_key`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_role` ENUM('account', 'doctor', 'nurse', 'reception') NOT NULL,
    `admin_account` VARCHAR(50) NOT NULL,
    `admin_password` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `doctorId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `appointmentTime` DATETIME(3) NOT NULL,
    `appointment_status` ENUM('PENDING', 'COMPLETED', 'CANCELED') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clinicId` INTEGER NOT NULL,
    `doctor_firstName` VARCHAR(50) NOT NULL,
    `doctor_lastName` VARCHAR(50) NOT NULL,
    `doctor_age` INTEGER NOT NULL,
    `doctor_education` VARCHAR(50) NOT NULL,
    `doctor_image` VARCHAR(256) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doctor_Time` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doctorId` INTEGER NOT NULL,
    `doctor_dateTime` DATETIME(3) NOT NULL,
    `doctor_day` ENUM('MON', 'TUE', 'WEB', 'THU', 'FRI', 'SAT', 'SUN') NOT NULL,
    `doctor_time` ENUM('MORNING', 'AFTERNOON') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Queue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `doctorTimeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clinic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clinic_name` VARCHAR(50) NOT NULL,
    `detail` VARCHAR(512) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medical_History` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `doctorId` INTEGER NOT NULL,
    `medicineId` INTEGER NOT NULL,
    `visitor_Number` VARCHAR(20) NOT NULL,
    `weight` DECIMAL(65, 30) NULL DEFAULT 0,
    `height` DECIMAL(65, 30) NULL DEFAULT 0,
    `heart_rate` DECIMAL(65, 30) NULL DEFAULT 0,
    `blood_pressure` DECIMAL(65, 30) NULL DEFAULT 0,
    `medicine` VARCHAR(256) NULL,
    `initial_Symptoms` VARCHAR(256) NULL,
    `drug_Allergies` VARCHAR(128) NULL,
    `treatment_Result` VARCHAR(1024) NULL,
    `conclusion` VARCHAR(256) NULL,
    `totalPrice` DECIMAL(65, 30) NULL DEFAULT 0,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `summary` VARCHAR(256) NOT NULL,
    `cure_status` ENUM('OPD', 'ADMIT') NOT NULL,
    `payment_status` ENUM('TREATMENT', 'PAYMENT', 'COMPLETED') NOT NULL DEFAULT 'TREATMENT',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Treatment_Detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `historyId` INTEGER NOT NULL,
    `treatment` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medical_name_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medical_Name` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medical_name` VARCHAR(191) NOT NULL,
    `medical_detail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medical_Certificate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `historyId` INTEGER NOT NULL,
    `doctorId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `pdf` VARCHAR(128) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Doctor_Time` ADD CONSTRAINT `Doctor_Time_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Queue` ADD CONSTRAINT `Queue_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Queue` ADD CONSTRAINT `Queue_doctorTimeId_fkey` FOREIGN KEY (`doctorTimeId`) REFERENCES `Doctor_Time`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medical_History` ADD CONSTRAINT `Medical_History_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medical_History` ADD CONSTRAINT `Medical_History_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medical_History` ADD CONSTRAINT `Medical_History_medicineId_fkey` FOREIGN KEY (`medicineId`) REFERENCES `Medicine`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Treatment_Detail` ADD CONSTRAINT `Treatment_Detail_historyId_fkey` FOREIGN KEY (`historyId`) REFERENCES `Medical_History`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medicine` ADD CONSTRAINT `Medicine_medical_name_id_fkey` FOREIGN KEY (`medical_name_id`) REFERENCES `Medical_Name`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medical_Certificate` ADD CONSTRAINT `Medical_Certificate_historyId_fkey` FOREIGN KEY (`historyId`) REFERENCES `Medical_History`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medical_Certificate` ADD CONSTRAINT `Medical_Certificate_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Medical_Certificate` ADD CONSTRAINT `Medical_Certificate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
