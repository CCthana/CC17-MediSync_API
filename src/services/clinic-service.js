const prisma = require('../models/prisma')
const clinicService = {}

clinicService.findAllClinic = () => {
    return prisma.clinic.findMany({
        select: {
            id: true,
            name: true,
            detail: true,
            image: true
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

module.exports = clinicService