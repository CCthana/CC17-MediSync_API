const clinicService = require("../services/clinic-service");
const uploadService = require("../services/upload-service");
const createError = require("../utility/create-error");
const fs = require("fs/promises");

const clinicController = {};

// clinic
clinicController.createClinic = async (req, res, next) => {
  try {
    const data = req.body;
    console.log("req.files", req.files);

    const existClinic = await clinicService.findClinicByname(data.name);

    if (existClinic) {
      createError({
        message: "Clinic already in use",
        statusCode: 400,
      });
    }

    const promises = [];
    if (req.files.icon !== undefined) {
      console.log("req.files.icon", req.files.icon);
      const result = uploadService
        .upload(req.files.icon[0].path)
        .then((url) => ({ url, key: "icon" })); // เพิ่มเข้าไปเลย
      promises.push(result);

      const reesultAll = await Promise.all(promises);
      const dataImage = reesultAll.reduce((acc, el) => {
        acc[el.key] = el.url;
        return acc;
      }, {});

      data.icon = dataImage.icon;
      data.icon === "null" && delete data.icon;
      await fs.unlink(req.files.icon[0].path);
    }

    if (req.files.image !== undefined) {
        console.log("req.files.image", req.files.image);
        const result = uploadService
          .upload(req.files.image[0].path)
          .then((url) => ({ url, key: "icon" })); // เพิ่มเข้าไปเลย
        promises.push(result);
  
        const reesultAll = await Promise.all(promises);
        const dataImage = reesultAll.reduce((acc, el) => {
          acc[el.key] = el.url;
          return acc;
        }, {});
  
        data.image = dataImage.icon;
        data.image === "null" && delete data.icon;
        await fs.unlink(req.files.image[0].path);
      }

    await clinicService.createClinic(data);
    res.status(201).json({ message: "clinic created" });
  } catch (err) {
    next(err);
  }
};

clinicController.updateClinic = async (req, res, next) => {
  try {
    const data = req.body;

    console.log("req.files", req.files);

    if (typeof data.id === "string") {
      data.id = +data.id;
    }

    const promises = [];
    if (req.files.icon !== undefined) {
      console.log("req.files.icon", req.files.icon);
      const result = uploadService
        .upload(req.files.icon[0].path)
        .then((url) => ({ url, key: "icon" })); // เพิ่มเข้าไปเลย
      promises.push(result);

      const reesultAll = await Promise.all(promises);
      const dataImage = reesultAll.reduce((acc, el) => {
        acc[el.key] = el.url;
        return acc;
      }, {});

      data.icon = dataImage.icon;
      data.icon === "null" && delete data.icon;
      await fs.unlink(req.files.icon[0].path);
    }

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
  
        data.image = dataImage.icon;
        data.image === "null" && delete data.icon;
        await fs.unlink(req.files.image[0].path);
      }

    console.log("data updateClinic", data);

    const result = await clinicService.updateClinic(data);

    res.status(200).json({ updateClinic: result });
  } catch (err) {
    next(err);
  }
};

clinicController.getAllClinic = async ( req, res, next ) => {
  try {
      const result = await clinicService.findAllClinic()
      // console.log('reault', result)
      res.status(200).json({clinic: result})
  } catch (err) {
      next(err)
  }
}



clinicController.adminGetAllClinic = async (req, res, next) => {
  try {
    const reault = await clinicService.adminFindAllClinic();
    // console.log('reault adminGetAllClinic', reault)
    res.status(200).json({ clinic: reault });
  } catch (err) {
    next(err);
  }
};

clinicController.adminDeleteClinic = async (req, res, next) => {
    try {
        const id = +req.params.id
        console.log('req adminDeleteClinic', req.params.id)
      await clinicService.adminDeleteClinic(id)
      // console.log('reault adminGetAllClinic', reault)
      res.status(200).json({ message: "clinic deleted" });
    } catch (err) {
      next(err);
    }
  };

module.exports = clinicController;
