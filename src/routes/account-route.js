
const express = require('express');
const vnController = require('../controllers/vn-controller');
const accountController = require('../controllers/account-controller');
const upload = require('../middlewares/upload');
const { validateFile } = require('../middlewares/validateFile');


const accountRouter = express.Router()

accountRouter.get('/getAllVnByStatusPayment', vnController.getAllVnByStatusPayment)
accountRouter.patch(
  '/updateVnByVn',
  upload.fields([
    { name: 'medicalCertificate', maxCount: 1 },
    { name: 'receipt', maxCount: 1 }
  ]), // This should match the field name used in FormData
  validateFile,
  accountController.updateTotalPriceVnByVn
);

module.exports = accountRouter