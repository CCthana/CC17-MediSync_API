const prisma = require('../models/prisma')

const appointmentService = {}


appointmentService.getAppointmentByHn = (hn) => {
   return prisma.appointment.findMany ({
      where: {
         hn : {contains: hn},
         status: "PENDING"
      },
      include: {
         user : {
            select: {
               hn: true,
               firstName: true,
               lastName: true,
               gender: true,
               birthDate: true,
               nationality: true
            }
         },
         doctor: {
            select: {
               id: true,
               firstName: true,
               lastName: true,
               clinic: {
                  select: {
                     id: true,
                     name: true
                  }
               }
            }
         },
         
         }
   })
}

appointmentService.getAppointmentsByName = (name) => {
   return prisma.appointment.findMany({
       where: {
           status: "PENDING",
           user: {
               OR: [
                 { firstName: { contains: name } },
                  { lastName: { contains: name } }
                ]
           }
       },
       include: {
           user: {
               select: {
                   hn: true,
                   firstName: true,
                   lastName: true,
                   gender: true,
                   birthDate: true,
                   nationality: true
               }
           },
           doctor: {
               select: {
                   id: true,
                   firstName: true,
                   lastName: true,
                   clinic: {
                       select: {
                           id: true,
                           name: true
                       }
                   }
               }
           }
       }
   });
};

appointmentService.updateAppointmentByHn = (id, status) => prisma.appointment.update({
   where: {id: id},
   data: {status: status}
})

appointmentService.createAppontmentByDoctor = (data) => {
      return prisma.appointment.create({ data })
  }


module.exports = appointmentService