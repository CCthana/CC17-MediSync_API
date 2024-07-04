const express = require('express')
const upload = require('../middlewares/upload')
const hrController = require('../controllers/hr-controller')


const hrRouter = express.Router()

hrRouter.post('/sendemail', upload.fields([
    { name: 'cv', maxCount: 1}
]), hrController.sendEmail)

module.exports = hrRouter