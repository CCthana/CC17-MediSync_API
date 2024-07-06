const doctorService = require("../services/doctor-service");
const uploadService = require("../services/upload-service");
const createError = require("../utility/create-error");
const fs = require("fs/promises");

const doctorController = {};

// doctor
doctorController.createDoctor = async (req, res, next) => {
  try {
    const data = req.body;
    console.log("data", data);

    const existDoctor = await doctorService.findDoctorByFirstnameAndLastname(
      data.firstName,
      data.lastName
    );
    console.log("existDoctor", existDoctor);

    if (existDoctor) {
      createError({
        message: "doctor already in use",
        statusCode: 400,
      });
    }

    if (typeof data.clinicId === "string") {
      data.clinicId = +data.clinicId;
    }

    if (data.birthDate) {
      data.birthDate = new Date(data.birthDate);
    }

    const createDoctor = await doctorService.createDoctor(data, req.files.image)
    console.log('createDoctor', createDoctor)
    res.status(201).json({ message: "doctor created", createDoctor });
  } catch (err) {
    next(err);
  }
};

doctorController.updateDoctor = async (req, res, next) => {
  try {
    const data = req.body;

    if (typeof data.id === "string") {
      data.id = +data.id;
    }

    if (typeof data.clinicId === "string") {
      data.clinicId = +data.clinicId;
    }

    if (data.birthDate) {
      data.birthDate = new Date(data.birthDate);
    }

    const promises = [];
    if (req.files.image !== undefined) {
      console.log("req.files.image", req.files.image);
      const result = uploadService
        .upload(req.files.image[0].path)
        .then((url) => ({ url, key: "image" })); // เพิ่มเข้าไปเลย
      promises.push(result);

      const reesultAll = await Promise.all(promises);
      const dataImage = reesultAll.reduce((acc, el) => {
        acc[el.key] = el.url;
        return acc;
      }, {});

      data.image = dataImage.image;
      data.image === "null" && delete data.image;
      await fs.unlink(req.files.image[0].path);
    }

    const result = await doctorService.updateDoctor(data);
    console.log("result updateDoctor", result);

    res.status(200).json({ updateDoctor: result });
  } catch (err) {
    next(err);
  }
};

doctorController.deleteDoctor = async (req, res, next) => {
  try {
    const data = req.body;

    const existDoctor = await doctorService.findDoctorById(data.id);
    console.log("existDoctor", existDoctor);

    if (!existDoctor) {
      createError({
        message: "no doctor in the database.",
        statusCode: 400,
      });
    }

    await doctorService.deleteDoctor(data);
    res.status(200).json({ message: "doctor deleted" });
  } catch (err) {
    next(err);
  }
};

// รวม status ที่ไม่ active ไปด้วย
doctorController.getAllDoctor = async (req, res, next) => {
  try {
    const reault = await doctorService.findAllDoctor();
    console.log("reault getAllDoctor", reault);
    res.status(200).json(reault);
  } catch (err) {
    next(err);
  }
};

doctorController.getAllDoctorActive = async ( req, res, next ) => {
    try {
        const result = await doctorService.findAllDoctorActive()
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}


doctorController.getAllDoctorByClinic = async (req, res, next) => {
    try {

        const clinicId = +req.params.clinicId
        console.log("+++++++++++++++++",clinicId)
        const result = await doctorService.getAllDoctorByClinic(clinicId)
        res.status(200).json(result);
        
    } catch (err) {
        next(err)
    }
}

doctorController.getAdminDoctorData = async (req, res, next) => {
    try {
        const id = +req.params.doctorId

        console.log(id)

        const result = await doctorService.getAdminDoctorData(id)

        res.status(200).json(result)
        
    } catch (err) {
        next(err)
    }
}

module.exports = doctorController
