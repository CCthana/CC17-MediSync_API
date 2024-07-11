const express = require('express');
const vnController = require('../controllers/vn-controller');

const vnRouter = express.Router()

vnRouter.get('/getAllVn', vnController.getAllVn)
vnRouter.get('/getAllVnByHn/:hn', vnController.getVnByHn)
vnRouter.get('/getVnByVn', vnController.getVnByVn)

vnRouter.get('/getVnPerDay/:day', vnController.getVnPerDay)

module.exports = vnRouter