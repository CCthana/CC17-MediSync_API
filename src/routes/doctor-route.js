const express = require('express');
const doctorController = require('../controllers/doctor-controller');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

const doctorRouter = express.Router()

doctorRouter.get('/getAllDoctor', authenticateAdmin, doctorController.getAllDoctor)
doctorRouter.get('/getAllDoctorActive', doctorController.getAllDoctorActive)
doctorRouter.get('/doctorActiveByClinic/:clinicId', doctorController.getAllDoctorByClinic)


module.exports = doctorRouter  
