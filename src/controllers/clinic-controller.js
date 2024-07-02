const clinicService = require("../services/clinic-service")
const createError = require("../utility/create-error")

const clinicController = {}

// clinic
clinicController.createClinic = async ( req, res, next ) => {
    try {

        const data = req.body

        const existDoctor = await clinicService.findClinicByname(data.name)

        if (existDoctor) {
            createError({
                message: 'doctor already in use',
                statusCode: 400
            })
        }

        await clinicService.createClinic(data)
        res.status(201).json({ message: 'clinic created'})

    } catch (err) {
        next(err)
    }
}

clinicController.updateClinic = async ( req, res, next ) => {
    try {

        const  data = req.body

        const result = await clinicService.updateClinic(data)
        console.log('result updateClinic', result)

        res.status(200).json({ updateClinic: result})

    } catch (err) {
        next(err)
    }
}

clinicController.getAllClinic = async ( req, res, next ) => {
    try {
        const result = await clinicService.findAllClinic()
        // console.log('reault', result)
        res.status(200).json({clinic: result})
    } catch (err) {
        next(err)
    }
}

module.exports = clinicController