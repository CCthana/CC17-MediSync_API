const express = require('express')
const upload = require('../middlewares/upload')
const hrController = require('../controllers/hr-controller')
const adminCareerController = require('../controllers/career-admin-controller')
const authenticateAdmin = require('../middlewares/authenticateAdmin')


const hrRouter = express.Router()

hrRouter.post('/sendemail', upload.fields([
    { name: 'cv', maxCount: 1}
]), hrController.sendEmail)

hrRouter.get("/", adminCareerController.getAllCareer);
hrRouter.post("/", authenticateAdmin, adminCareerController.createCareer);
hrRouter.patch("/", authenticateAdmin, adminCareerController.updateCareer);
hrRouter.delete("/:id", authenticateAdmin, adminCareerController.deleteCareer);

module.exports = hrRouter