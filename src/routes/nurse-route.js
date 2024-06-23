const express = require('express');
const nurseController = require('../controllers/nurse-controller');
const vnController = require('../controllers/vn-controller');

const nurseRouter = express.Router()

// admin nurse แก้ไข VN เพ่ิมข้อมูลที่ตรวจเบื้องต้น
nurseRouter.patch('/updateVN', nurseController.updateVnByVn) //front ต้องส่งหมอมาด้วย
nurseRouter.get('/getAllVnByClinic', vnController.getAllVnByClinic)

module.exports = nurseRouter