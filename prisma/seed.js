const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const password = bcrypt.hashSync("123456");
const adminData = [
  { role: "account", account: "admin_account", password },
  { role: "doctor", account: "admin_doctor", password },
  { role: "nurse", account: "admin_nurse", password },
  { role: "reception", account: "admin_reception", password },
];

const clinicData = [
  {
    name: "Medicine Department",
    detail: "",
  },
  {
    name: "Operation Room",
    detail: "",
  },
  {
    name: "Pediatric Department",
    detail: "",
  },
  {
    name: "Cardiac Care Unit",
    detail: "",
  },
];

const medicineName = [
  {
    name: "Aspirin",
    detail: "",
  },
  {
    name: "Bandage",
    detail: "",
  },
  {
    name: "Paracetamol",
    detail: "",
  },
  {
    name: "Cough medicine",
    detail: "",
  },
];

const run = async () => {
  await prisma.admin.createMany({ data: adminData });
  await prisma.clinic.createMany({ data: clinicData });
  await prisma.medicineName.createMany({ data: medicineName });
};

run();
