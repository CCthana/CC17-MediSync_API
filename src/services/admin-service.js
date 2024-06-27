const prisma = require('../models/prisma')
const adminService = {}

adminService.findAdmin = (userName) => {
    return prisma.admin.findFirst({
        where: {
            userName
        }
    })
}

adminService.createAdmin = ( userName, password, role ) => {
    return prisma.admin.create({
        data: {
            userName,
            password,
            role
        }
    })
}

adminService.findAdimById = (id) => {
    return prisma.admin.findFirst({
        where: {
            id
        }
    })
}

module.exports = adminService