const prisma = require('../models/prisma')
const vnService = {}

vnService.createVn = (data) => {
    return prisma.visitorNumber.create({data});
}

vnService.updateVnByVn = (data) => {
    return prisma.visitorNumber.update({
        where:{vn: data.vn},
        data
    });
}

vnService.getAllVnByClinic = (clinicId) => {
    return prisma.visitorNumber.findMany({
        where:{
            AND: [
                    {clinicId},
                    {status: "QUEUE"}
            ]
        },
        include: {
            user: true
        }
    });
}

vnService.getAllVnByClinicAndStatusTreatmentAndDoctor = (data) => {
    return prisma.visitorNumber.findMany({
        where:{
            AND: [
                {clinicId: data.clinicId},
                {status: "TREATMENT"},
                {doctorId: data.doctorId}
            ]
        },
        include: {
            user: true
        }
    });
}

vnService.getAllVnByStatusPayment = () => {
    return prisma.visitorNumber.findMany({
        where:{ status: "PAYMENT" },
        include: {
            user: true
        }
    });
}

vnService.getAllVn = () => {
    return prisma.visitorNumber.findMany();
}

vnService.getVnByVn = (vn) => {
    return prisma.visitorNumber.findMany({
        where:{vn}
    });
}

module.exports = vnService