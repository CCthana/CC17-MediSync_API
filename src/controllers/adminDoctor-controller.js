const appointmentService = require("../services/appointment-service")
const vnService = require("../services/vn-service")
const createError = require("../utility/create-error")

const adminDoctorController = {}

adminDoctorController.updateVnById = async ( req, res, next ) => {
    try {
        const id = +req.body.id
        const data = req.body
        delete data.id
       
        if (data.status !== "PAYMENT") {
            data.status = "PAYMENT"
        }
        
        const result = await vnService.updateVnByVn(id, data)
        console.log('result updateVnByVn', result)

        res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}


adminDoctorController.createAppointmentByDoctor = async (req, res, next) => {
    try {
    req.body.doctorId = +req.body.doctorId
    
        
     const data = req.body
     data.appointmentTime = new Date(data.appointmentTime)   

     if (data.status !== "PENDING") {
        data.status = "PENDING"
    }
   
     const result = await appointmentService.createAppontmentByDoctor(data)

     res.status(201).json(result)
    } catch (err) {
       next(err) 
    }
}

module.exports = adminDoctorController