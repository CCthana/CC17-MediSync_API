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
    return prisma.doctor.findMany();
}

doctorService.findAllDoctorActive = () => {
    return prisma.doctor.findMany({
        where: {isDeleted: false},
        select: {
            id: true,
            clinicId: true,
            firstName: true,
            lastName: true,
            image: true,
        }
    });
}

doctorService.createDoctor = ( data ) => {
    return prisma.doctor.create({ data })
}

doctorService.updateDoctor = ( data ) => {
    return prisma.doctor.update({
        where: { id: data.id },
        data
    });
}

doctorService.deleteDoctor = ( id ) => {
    return prisma.doctor.update({
        where: { id },
        data: { isDeleted: true }
    });
}

module.exports = doctorService