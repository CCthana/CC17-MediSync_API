const express = require('express');
const medicineController = require('../controllers/medicine-controller');
const medicineRoute = express.Router()

medicineRoute.post('/createMedicine', medicineController.createMedicine)
medicineRoute.get('/allMedicine', medicineController.getallMedicine)
medicineRoute.patch('/updateMedById', medicineController.updateMedicineById)

medicineRoute.get('/allMedicineAdmin', medicineController.adminGetallMedicine)


module.exports = medicineRoute