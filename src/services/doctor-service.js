const prisma = require('../models/prisma');
const uploadService = require('./upload-service');
const doctorService = {}
const fs = require("fs/promises");

doctorService.findDoctorByFirstnameAndLastname = ( firstName, lastName ) => {
    return prisma.doctor.findFirst({
        where: {
            AND: [{firstName: firstName,
                lastName: lastName}]
        }
    });
}

doctorService.findDoctorById = ( id ) => {
    return prisma.doctor.findFirst({
        where: {id:id}
    });
}

doctorService.findAllDoctor = () => {
    return prisma.doctor.findMany({
        include: {
            clinic: {
                select: {
                    name: true
                }
            }
        }
    });
}

doctorService.findAllDoctorActive = () => {
    return prisma.doctor.findMany({
        where: {isDeleted: false},
        select: {
            id: true,
            clinic: {
                select: {
                    name: true
                }
            },
            firstName: true,
            lastName: true,
            image: true,
            education: true

        }
    });
}

// doctorService.createDoctor = ( data ) => {
//     return prisma.doctor.create({ data })
// }

doctorService.createDoctor = ( data, image ) => {
    return prisma.$transaction( async (tx) => {
        const promises = [];
        if (image !== undefined) {
          console.log("req.files.image", image);
          const result = uploadService
            .upload(image[0].path)
            .then((url) => ({ url, key: "image" })); // เพิ่มเข้าไปเลย
          promises.push(result);
    
          const reesultAll = await Promise.all(promises);
          const dataImage = reesultAll.reduce((acc, el) => {
            acc[el.key] = el.url;
            return acc;
          }, {});
    
          data.image = dataImage.image;
          data.image === "null" && delete data.image;
          await fs.unlink(image[0].path);
        }

        const result = tx.doctor.create({ data })
        return result
    }, {timeout: 20000})
}


doctorService.updateDoctor = ( data ) => {
    return prisma.doctor.update({
        where: { id: data.id },
        data,
        include: {
            clinic: {
                select: {
                    name: true
                }
            }
        }
    });
}

doctorService.deleteDoctor = ( data ) => {
    return prisma.doctor.update({
        where: { id: data.id },
        data
    });
}

doctorService.getAllDoctorByClinic = (id) => {
    return prisma.doctor.findMany({
        where: {clinicId: id},
        select: {
            id: true,
            firstName: true,
            lastName: true,
            clinicId: true
        }
    })
}

doctorService.getAdminDoctorData = (id) => {
    return prisma.doctor.findFirst({
        where: {id: id},
        include: {clinic: true}
    })
}

module.exports = doctorService