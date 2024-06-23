const express = require('express');
const vnController = require('../controllers/vn-controller');
const hnController = require('../controllers/hn-controller');

const receptionRouter = express.Router()

// admin reception สร้าง/แก้ไข HN
receptionRouter.post('/createHN', hnController.createHN)
receptionRouter.patch('/updateHN', hnController.updateHN)

// admin reception แก้ไข VN
receptionRouter.post('/createVN', vnController.createVn)
receptionRouter.patch('/updateVN', vnController.updateVnByVn)

module.exports = receptionRouter