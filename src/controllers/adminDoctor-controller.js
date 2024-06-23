const vnService = require("../services/vn-service")
const createError = require("../utility/create-error")

const adminDoctorController = {}

adminDoctorController.updateVnByVn = async ( req, res, next ) => {
    try {
        const data = req.body

        if (data.status !== "PAYMENT") {
            data.status = "PAYMENT"
        }
        
        const result = await vnService.updateVnByVn(data)
        console.log('result updateVnByVn', result)

        res.status(200).json({ updateVn: result })

    } catch (err) {
        next(err)
    }
}

module.exports = adminDoctorController