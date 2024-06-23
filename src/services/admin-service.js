const prisma = require('../models/prisma')
const adminService = {}

adminService.findDoctorByfirstnameAndLastname = (firstName, lastName) => {
    return prisma.admin.findFirst({
        where: {
            AND: [
                firstName, lastName
            ]
        }
    })
}

adminService.createDoctor = (data) => {
    return prisma.admin.create({data})
}

module.exports = adminService