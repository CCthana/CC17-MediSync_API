const express = require('express');
const vnController = require('../controllers/vn-controller');
const adminDoctorController = require('../controllers/adminDoctor-controller');

const adminDoctorRouter = express.Router()

adminDoctorRouter.get('/getAllVnByClinicAndStatusTreatmentAndDoctor', vnController.getAllVnByClinicAndStatusTreatmentAndDoctor)
adminDoctorRouter.patch('/updateVnByVn', adminDoctorController.updateVnByVn)

module.exports = adminDoctorRouter