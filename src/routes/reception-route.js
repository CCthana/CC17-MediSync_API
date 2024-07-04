const express = require('express');
const vnController = require('../controllers/vn-controller');
const hnController = require('../controllers/hn-controller');
const receptionController = require('../controllers/reception-controller');

const receptionRouter = express.Router()

// admin reception สร้าง/แก้ไข HN
receptionRouter.post('/createHN', hnController.createHN)
receptionRouter.patch('/updateHN', hnController.updateHN)

// admin reception แก้ไข VN
receptionRouter.post('/createVN', vnController.createVn)
receptionRouter.patch('/updateVN', vnController.updateVnByVn)

// admin ค้นหาใบนัด
receptionRouter.get('/getappoint/:hn',receptionController.getAppointmentByHn)
receptionRouter.get('/getappointByName/:name',receptionController.getAppointmentByName)
receptionRouter.patch('/updateAppointment/:id',receptionController.updateAppointmentByHn)

module.exports = receptionRouter