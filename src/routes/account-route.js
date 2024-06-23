const express = require('express');
const vnController = require('../controllers/vn-controller');
const accountController = require('../controllers/account-controller');

const accountRouter = express.Router()

accountRouter.get('/getAllVnByStatusPayment', vnController.getAllVnByStatusPayment)
accountRouter.patch('/updateVnByVn', accountController.updateTotalPriceVnByVn)

module.exports = accountRouter