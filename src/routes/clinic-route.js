const express = require('express');
const clinicController = require('../controllers/clinic-controller');

const clinicRouter = express.Router()

clinicRouter.get('/getAllClinic', clinicController.getAllClinic)

module.exports = clinicRouter