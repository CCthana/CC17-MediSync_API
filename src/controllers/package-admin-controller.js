const { PrismaClient } = require("@prisma/client");
const uploadService = require("../services/upload-service");

const prisma = new PrismaClient();

const adminPackageController = {};

adminPackageController.getAllPackage = async (req, res, next) => {
  try {
    const package = await prisma.package.findMany();
    console.log('package', package)
    res.status(200).json(package);
  } catch (err) {
    next(err);
  }
};

adminPackageController.createPackage = async (req, res, next) => {
  const { name, detail, promotion, price } = req.body;

  try {
    const image = await uploadService.upload(req.file.path);

    const promotionDate = new Date(promotion);
    const packagePrice = parseInt(price);

    const newPackage = await prisma.package.create({
      data: {
        name,
        detail,
        image,
        promotion: promotionDate,
        price: packagePrice,
      },
    });
    res.status(201).json({ message: newPackage });
  } catch (err) {
    next(err);
  }
};

adminPackageController.updatePackage = async (req, res, next) => {
  const id  = +req.params.id;
  // console.log('id', id)
  const { name, detail, image, promotion, price } = req.body;
  console.log('req.body', req.body)

  try {
    const updateData = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (detail !== undefined) {
      updateData.detail = detail;
    }

    if (image !== undefined) {
      updateData.image = image;
    }

    if (promotion !== undefined) {
      const packagePromotion = new Date(promotion);
      updateData.promotion = packagePromotion;
    }

    if (!isNaN(parseInt(price))) {
      console.log('price', price)
      const packagePrice = parseInt(price);
      console.log('packagePrice', packagePrice)
      updateData.price = packagePrice;
    }

    // console.log("Update Data: ", updateData);

    const updatePackage = await prisma.package.update({
      where: { id: +id },
      data: updateData,
    });

    // console.log("______________________", updatePackage);
    res.status(201).json({ updatePackage });
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
