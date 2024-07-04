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
  const { name, quantity } = req.body;

  const careerQuantity = parseInt(quantity);

  try {
    const newCareer = await prisma.career.create({
      data: { name, quantity: careerQuantity },
    });
    res.status(200).json({ message: newCareer });
  } catch (err) {
    next(err);
  }
};

adminCareerController.updateCareer = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    // สร้างวัตถุสำหรับการอัพเดทข้อมูล
    const updateData = {};

    // ตรวจสอบและเพิ่มฟิลด์ที่มีค่า
    if (name !== undefined) {
      updateData.name = name;
    }

    if (quantity !== undefined) {
      updateData.quantity = parseInt(quantity);
    }
    const updateCareer = await prisma.career.update({
      where: { id: +id },
      data: updateData,
    });

    console.log("------------------------", updateCareer);
    res.status(201).json({ message: updateCareer });
  } catch (err) {
    next(err);
  }
};

adminCareerController.deleteCareer = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.career.delete({
      where: { id },
    });
    res.status(200).json({ message: "delete Career success" });
  } catch (err) {
    next(err);
  }
};

module.exports = adminCareerController;
