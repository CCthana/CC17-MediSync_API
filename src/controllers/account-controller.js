const vnService = require("../services/vn-service")
const createError = require("../utility/create-error")

const accountController = {}

accountController.updateTotalPriceVnByVn = async ( req, res, next ) => {
    try {
        const data = req.body

        if (data.status !== "COMPPELETED") {
            data.status = "COMPPELETED"
        }
        
        const result = await vnService.updateVnByVn(data)
        console.log('result updateTotalPriceVnByVn', result)

        


        res.status(200).json({ updateVn: result })

    } catch (err) {
        next(err)
    }
}

module.exports = accountController