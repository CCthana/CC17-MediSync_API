const express = require('express');
const adminController = require('../controllers/admin-controller');
const doctorController = require('../controllers/doctor-controller');
const clinicController = require('../controllers/clinic-controller');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const vnController = require('../controllers/vn-controller');

const adminRouter = express.Router()

adminRouter.post('/register', adminController.createAdmin)
adminRouter.post('/login', adminController.loginAdmin)
adminRouter.get('/me',authenticateAdmin ,adminController.getAdmin)



// admin สร้าง/แก้ไข/softDelete doctor
adminRouter.post('/createDoctor', doctorController.createDoctor)
adminRouter.patch('/updateDoctor', doctorController.updateDoctor)
adminRouter.patch('/deleteDoctor', doctorController.deleteDoctor)

// admin สร้าง/แก้ไข clinic
adminRouter.post('/createClinic', clinicController.createClinic)
adminRouter.patch('/updateClinic', clinicController.updateClinic)

module.exports = adminRouter