
const vnService = require("../services/vn-service")
const createError = require("../utility/create-error")

const nurseController = {}

nurseController.updateVnByVn = async ( req, res, next ) => {
    try {
        const id = +req.body.id
        req.body.weight = +req.body.weight
        req.body.height = +req.body.height
        req.body.heartRate = +req.body.heartRate
        req.body.temperature = +req.body.temperature
        req.body.doctorId = +req.body.doctorId

        const data = req.body
        delete data.id

        if (data.status !== "TREATMENT") {
            data.status = "TREATMENT"
        }
        
        const result = await vnService.updateVnByVn(id, data)

        res.status(200).json({ updateVn: result })

    } catch (err) {
        next(err)
    }
}

module.exports = nurseController