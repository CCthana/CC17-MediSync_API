const express = require('express');
const adminController = require('../controllers/admin-controller');
const doctorController = require('../controllers/doctor-controller');
const clinicController = require('../controllers/clinic-controller');

const adminRouter = express.Router()

// admin สร้าง/แก้ไข/softDelete doctor
adminRouter.post('/createDoctor', doctorController.createDoctor)
adminRouter.patch('/updateDoctor', doctorController.updateDoctor)
adminRouter.patch('/deleteDoctor', doctorController.deleteDoctor)

// admin สร้าง/แก้ไข clinic
adminRouter.post('/createClinic', clinicController.createClinic)
adminRouter.patch('/updateClinic', clinicController.updateClinic)

module.exports = adminRouter