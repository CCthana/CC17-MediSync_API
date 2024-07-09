const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const adminCareerController = {};

adminCareerController.getAllCareer = async (req, res, next) => {
  try {
    const career = await prisma.career.findMany();
    res.status(200).json(career);
  } catch (err) {
    next(err);
  }
};

adminCareerController.createCareer = async (req, res, next) => {
  try {
    const data = req.body;
    console.log("data createCareer", data);
    const newCareer = await prisma.career.createMany({
      data,
    });
    res.status(201).json({ newCareer });
  } catch (err) {
    next(err);
  }
};

adminCareerController.updateCareer = async (req, res, next) => {
  try {
    const id = req.body.id;
    const data = req.body;
    data.quantity = +data.quantity;
    console.log("req.body", req.body);
    console.log("id", id);

    const updateCareer = await prisma.career.update({
      where: { id: +id },
      data,
    });

    console.log("------------------------", updateCareer);
    res.status(200).json({ message: updateCareer });
  } catch (err) {
    next(err);
  }
};

adminCareerController.deleteCareer = async (req, res, next) => {
  const id = req.params;
  id.id = +id.id;

  try {
    await prisma.career.delete({
      where: id,
    });
    res.status(200).json({ message: "delete Career success" });
  } catch (err) {
    next(err);
  }
};

module.exports = adminCareerController;
