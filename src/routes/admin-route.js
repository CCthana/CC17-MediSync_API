const express = require('express');
const adminController = require('../controllers/admin-controller');
const doctorController = require('../controllers/doctor-controller');
const clinicController = require('../controllers/clinic-controller');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const upload = require('../middlewares/upload');

const adminRouter = express.Router()

adminRouter.post('/register', adminController.createAdmin)
adminRouter.post('/login', adminController.loginAdmin)
adminRouter.get('/me',authenticateAdmin ,adminController.getAdmin)

// admin สร้าง/แก้ไข/softDelete doctor
adminRouter.post('/createDoctor', authenticateAdmin, upload.fields([
    { name: 'image', maxCount: 1}
]), doctorController.createDoctor)
adminRouter.patch('/updateDoctor', authenticateAdmin, upload.fields([
    { name: 'image', maxCount: 1}
]), doctorController.updateDoctor)
adminRouter.patch('/deleteDoctor', authenticateAdmin, doctorController.deleteDoctor)

// admin สร้าง/แก้ไข clinic
adminRouter.post('/createClinic', upload.fields([
    { name: 'icon', maxCount: 1}, { name: 'image', maxCount: 1}
]), clinicController.createClinic)

adminRouter.patch('/updateClinic', upload.fields([
    { name: 'icon', maxCount: 1}, { name: 'image', maxCount: 1}
]), clinicController.updateClinic)

adminRouter.get('/getAllClinic', clinicController.adminGetAllClinic)
adminRouter.delete('/deleteClinic/:id', clinicController.adminDeleteClinic)


module.exports = adminRouter