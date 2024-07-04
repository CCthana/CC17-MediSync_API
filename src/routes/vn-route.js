const express = require('express');
const vnController = require('../controllers/vn-controller');

const vnRouter = express.Router()

vnRouter.get('/getAllVn', vnController.getAllVn)
vnRouter.get('/getAllVnByHn/:hn', vnController.getVnByHn)
vnRouter.get('/getVnByVn', vnController.getVnByVn)

module.exports = vnRouter