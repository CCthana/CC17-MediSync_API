const express = require("express");
const adminCareerController = require("../controllers/career-admin-controller");

const adminCareerRouter = express.Router();

adminCareerRouter.get("/", adminCareerController.getAllCareer);
adminCareerRouter.post("/", adminCareerController.createCareer);
adminCareerRouter.patch("/:id", adminCareerController.updateCareer);
adminCareerRouter.delete("/:id", adminCareerController.deleteCareer);

module.exports = adminCareerRouter;
