const { PrismaClient } = require("@prisma/client");
const uploadService = require("../services/upload-service");
const fs = require("fs/promises");

const prisma = new PrismaClient();

const adminPackageController = {};

adminPackageController.getAllPackage = async (req, res, next) => {
  try {
    const package = await prisma.package.findMany();
    res.status(200).json(package);
  } catch (err) {
    next(err);
  }
};

adminPackageController.createPackage = async (req, res, next) => {
  try {
    const data = req.body;

    data.expireDate = new Date(data.expireDate);
    data.price = parseInt(data.price);

    const promises = [];
    if (req.file !== undefined) {
      const result = uploadService
        .upload(req.file.path)
        .then((url) => ({ url, key: "image" }));
      promises.push(result);

      const reesultAll = await Promise.all(promises);
      const dataImage = reesultAll.reduce((acc, el) => {
        acc[el.key] = el.url;
        return acc;
      }, {});

      data.image = dataImage.image;
      data.image === "null" && delete data.image;
      await fs.unlink(req.file.path);
    }

    const newPackage = await prisma.package.create({
      data
    });
    res.status(201).json({ message: newPackage });
  } catch (err) {
    next(err);
  }
};

adminPackageController.updatePackage = async (req, res, next) => {

  const id  = +req.params.id;
  const data = req.body;

  try {
    // const updateData = {};

    // if (data.name !== undefined) {
    //   updateData.name = data.name;
    // }

    // if (detail !== undefined) {
    //   updateData.detail = detail;
    // }

    // if (image !== undefined) {
    //   updateData.image = image;
    // }

    if (data.expireDate !== undefined) {
      data.expireDate = new Date(data.expireDate);
      // updateData.expireDate = packageExpireDate;
    }

    const promises = [];
    if (req.file !== undefined) {
      const result = uploadService
        .upload(req.file.path)
        .then((url) => ({ url, key: "image" }));
      promises.push(result);

      const reesultAll = await Promise.all(promises);
      const dataImage = reesultAll.reduce((acc, el) => {
        acc[el.key] = el.url;
        return acc;
      }, {});

      data.image = dataImage.image;
      data.image === "null" && delete data.image;
      await fs.unlink(req.file.path);
    }

    console.log('data', data)

    if (!isNaN(parseInt(data.price))) {
      // console.log('price', price)
      data.price = parseInt(data.price);
      // console.log('packagePrice', packagePrice)
      // updateData.price = packagePrice;
    }

    // console.log("Update Data: ", updateData);

    const updatePackage = await prisma.package.update({
      where: { id: +id },
      data
    });

    // console.log("______________________", updatePackage);
    res.status(200).json({ updatePackage });
  } catch (err) {
    next(err);
  }
};

adminPackageController.deletePackage = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.package.delete({
      where: { id: +id },
    });
    res.status(204).json({ message: "delete package" });
  } catch (err) {
    next(err);
  }
};

module.exports = adminPackageController;
