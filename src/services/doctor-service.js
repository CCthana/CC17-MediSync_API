const prisma = require('../models/prisma')
const doctorService = {}

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

doctorService.createDoctor = ( data ) => {
    return prisma.doctor.create({ data })
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