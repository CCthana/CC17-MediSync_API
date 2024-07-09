const prisma = require('../models/prisma')
const vnService = {}

vnService.createVn = (data) => {
    return prisma.visitorNumber.create({data});
}

vnService.updateVnByVn = (id, data) => {
    return prisma.visitorNumber.update({
        where:{id: id},
        data
    });
}

vnService.getAllVnByClinic = (clinicId) => {
    return prisma.visitorNumber.findMany({
        where:{
            AND: [
                    {clinicId: clinicId},
                    {status: "QUEUE"}
            ]
        },include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    gender: true,
                    birthDate: true,
                    nationality: true,
                    
                }
            }
        }
    });
}

vnService.getTreatmentVnByDocTor = (id) => {
    return prisma.visitorNumber.findMany({
        where:{
            AND: [
                {status: "TREATMENT"},
                {doctorId: id}
            ]
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    birthDate: true,
                    gender: true

                }
            },
            doctor: true,
            clinic: true,
        }
    });
}

vnService.getAllVnByStatusPayment = () => {
    return prisma.visitorNumber.findMany({
        where:{ status: "PAYMENT" },
        include: { 
            medicineOrders: {
                include: {
                    medicine: true
                }
            },
            user: {
                select:{
                    hn: true,
                    firstName: true,
                    lastName: true,
                    gender: true,
                    birthDate: true,
                    phone: true,
                    email: true,
                    address: true,
                    nationality: true,
                    appointments: {
                        where: {status: "PENDING"}
                    },
                },
            },
            clinic: true,
            doctor: true, 
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

vnService.getVnByHn = (hn) => {
    return prisma.visitorNumber.findMany({
        where:{hn}
    });
}




module.exports = vnService
