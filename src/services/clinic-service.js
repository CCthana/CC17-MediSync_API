const prisma = require('../models/prisma')
const clinicService = {}

clinicService.findAllClinic = () => {
    return prisma.clinic.findMany({
        select: {
            id: true,
            name: true,
            detail: true,
            image: true,
            icon: true,
            location: true
        }
    });
}

clinicService.adminFindAllClinic = () => {
    return prisma.clinic.findMany({
        select: {
            id: true,
            name: true,
            detail: true,
            image: true,
            icon: true,
            location: true,
            updatedAt: true
        }
    });
}

clinicService.findClinicByname = (name) => {
    return prisma.clinic.findFirst({
        where: {
            name
        }
    });
}

clinicService.createClinic = (data) => {
    return prisma.clinic.create({data});
}

clinicService.updateClinic = (data) => {
    return prisma.clinic.update({
        where:{id: data.id},
        data
    });
}

clinicService.adminDeleteClinic = (id) => {
    return prisma.clinic.delete({
        where:{id}
    });
}

module.exports = clinicService