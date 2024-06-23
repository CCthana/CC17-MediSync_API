const express = require('express');
const adminController = require('../controllers/admin-controller');

const adminRouter = express.Router()

// adminRouter.get('/allDoctor', adminController.getAllDoctor)
// adminRouter.post('/createDoctor', adminController.createDoctor)

module.exports = adminRouter