const prisma = require('../models/prisma')
const hnService = {}

hnService.getAllHn = () => {
    return prisma.user.findMany()
}

hnService.findHnByHn = (hn) => {
    return prisma.user.findUnique({
        where:{hn}
    })
}

hnService.findHnById = (id) => {
    return prisma.user.findUnique({
        where:{id}
    })
}

hnService.findHnByNameOrPhoneOrEmail = (data) => {
    return prisma.user.findMany({
        where: {
            OR: [
                {
                    AND: [
                        { firstName: data.firstName },
                        { lastName: data.lastName }
                    ]
                },
                { phone: data.phone },
                { email: data.email }
            ]
        }
    });
}

hnService.findHnByName = (name) => {
    return prisma.user.findMany({
        where: {
            OR: [
                { firstName: { contains: name } },
                { lastName: { contains: name } }
            ]
        },
        select : {
            hn: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            address: true,
            gender: true,
            nationality: true,
            birthDate: true
        }
    })
}

hnService.findHnByPhone = (phone) => {
    return prisma.user.findMany({
        where: {
          phone: { contains: phone }  
        },
        select : {
            hn: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
            address: true,
            gender: true,
            nationality: true,
            birthDate: true
        }

    })
}

hnService.createHn = (data) => {
    return prisma.user.create({ data })
}

hnService.updateHn = (data) => {
    return prisma.user.update({ 
        where:{hn: data.hn},
        data
     })
}

module.exports = hnService