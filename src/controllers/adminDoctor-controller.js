const appointmentService = require("../services/appointment-service")
const medicineService = require("../services/medicine-service")
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

adminDoctorController.updateVnAndOrderMed = async (req, res, next) => {
    try {
       const data = req.body
       const doctorId = +data.doctorId 
       const medicine = data.medicine
       const id = +data.id

       if (data.status !== "PAYMENT") {
        data.status = "PAYMENT"
    }
 
       delete data.medicine
       delete data.id

       console.log(">>>>>>>>>>>>>>>>>>>>",data)

       console.log("/////////// medicine /////////////", medicine)
 
       const result = await medicineService.createMedOrderAndUpdateVN(data, doctorId, medicine, id)
 
       res.status(201).json(result)
    } catch (err) {
       next(err)
    }
 }
module.exports = adminDoctorController