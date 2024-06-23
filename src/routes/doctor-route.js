const express = require('express');
const doctorController = require('../controllers/doctor-controller');

const doctorRouter = express.Router()

doctorRouter.get('/getAllDoctor', doctorController.getAllDoctor)

module.exports = doctorRouter