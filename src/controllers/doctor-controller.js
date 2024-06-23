
const doctorService = require("../services/doctor-service")
const createError = require("../utility/create-error")

const doctorController = {}

// doctor
doctorController.createDoctor = async ( req, res, next ) => {
    try {

        const data = req.body
        console.log('data', data)

        const existDoctor = await doctorService.findDoctorByFirstnameAndLastname(data.firstName, data.lastName)
        console.log('existDoctor', existDoctor)

        if (existDoctor) {
            createError({
                message: 'doctor already in use',
                statusCode: 400
            })
        }

        await doctorService.createDoctor(data)
        res.status(201).json({ message: 'doctor created'})

    } catch (err) {
        next(err)
    }
}

doctorController.updateDoctor = async ( req, res, next ) => {
    try {

        const  data = req.body

        const result = await doctorService.updateDoctor(data)
        console.log('result updateClinic', result)

        res.status(200).json({ updateClinic: result})

    } catch (err) {
        next(err)
    }
}

doctorController.deleteDoctor = async ( req, res, next ) => {
    try {

        const id = req.body.id

        const existDoctor = await doctorService.findDoctorById(id)
        console.log('existDoctor', existDoctor)

        if (!existDoctor) {
            createError({
                message: 'no doctor in the database.',
                statusCode: 400
            })
        }

        await doctorService.deleteDoctor(id)
        res.status(200).json({ message: 'doctor deleted'})

    } catch (err) {
        next(err)
    }
}

// รวม status ที่ไม่ active ไปด้วย
doctorController.getAllDoctor = async ( req, res, next ) => {
    try {
        const reault = await doctorService.findAllDoctor()
        res.status(200).json(reault)
    } catch (err) {
        next(err)
    }
}

module.exports = doctorController