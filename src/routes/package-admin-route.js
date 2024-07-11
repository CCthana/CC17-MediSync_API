const express = require("express");
const adminPackageController = require("../controllers/package-admin-controller");
const upload = require("../middlewares/upload");

const adminPackageRouter = express.Router();

adminPackageRouter.get("/", adminPackageController.getAllPackage);

adminPackageRouter.post(
  "/",
  upload.single("image"),
  adminPackageController.createPackage
);

adminPackageRouter.patch("/:id", upload.single("image"), adminPackageController.updatePackage);

adminPackageRouter.delete("/:id", adminPackageController.deletePackage);

module.exports = adminPackageRouter;
