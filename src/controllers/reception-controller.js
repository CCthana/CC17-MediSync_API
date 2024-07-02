
const appointmentService = require("../services/appointment-service")


const receptionController = {}

receptionController.getAppointmentByHn = async (req, res, next) => {
   try {
      const hn = req.params.hn
      const result = await appointmentService.getAppointmentByHn(hn)

      res.status(200).json(result)

   } catch (err) {
      next(err)
   }
}

receptionController.getAppointmentByName = async (req, res, next) => {
   try {
      const name = req.params.name
      const result = await appointmentService.getAppointmentsByName(name)

      res.status(200).json(result)

   } catch (err) {
      next(err)
   }
}

receptionController.updateAppointmentByHn = async (req, res, next) => {
   try {
      const id = +req.params.id
      const data = req.body
      const status = data.status
      
      const result = await appointmentService.updateAppointmentByHn(id, status)
      res.status(200).json(result)

   } catch (err) {
      next(err)
   }
}

module.exports = receptionController