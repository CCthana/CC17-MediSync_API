const prisma = require('../models/prisma');

const userService = {};


userService.getUserId = (userId) => prisma.user.findMany({
   where: {id: userId}, 
   include: {
      visitorNumbers: true
      }
});

userService.getAppointmentByHn = (userHn) => prisma.appointment.findMany({
   where: {hn: userHn},
   include: {
      doctor: {
         include: {
            clinic: true
         }
      },
      
      }
})


module.exports = userService;