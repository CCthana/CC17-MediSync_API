const express = require('express');
const doctorController = require('../controllers/doctor-controller');

const doctorRouter = express.Router()

doctorRouter.get('/getAllDoctor', doctorController.getAllDoctor)
doctorRouter.get('/getAllDoctorActive', doctorController.getAllDoctorActive)

module.exports = doctorRouter