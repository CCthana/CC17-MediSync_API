const express = require('express');
const vnController = require('../controllers/vn-controller');
const adminDoctorController = require('../controllers/adminDoctor-controller');
const doctorController = require('../controllers/doctor-controller');

const adminDoctorRouter = express.Router()

adminDoctorRouter.get('/getTreatmentVnByDocTor/:doctorId', vnController.getTreatmentVnByDocTor)
adminDoctorRouter.get('/getAdminDoctorData/:doctorId', doctorController.getAdminDoctorData)

adminDoctorRouter.patch('/updateVnById', adminDoctorController.updateVnById)
adminDoctorRouter.post('/createAppointmentByDoctor', adminDoctorController.createAppointmentByDoctor)

module.exports = adminDoctorRouter