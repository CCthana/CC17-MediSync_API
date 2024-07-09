const vnService = require("../services/vn-service")
const createError = require("../utility/create-error")

const accountController = {}

accountController.updateTotalPriceVnByVn = async ( req, res, next ) => {
    try {
        const id = req.body.id
        const data = req.body
        console.log(id);
        delete data.id

        if (data.status !== "COMPELETED") {
            data.status = "COMPELETED"
        }
        console.log("++++ data +++++",data)
        console.log("++++ id +++++",id)
        
        const result = await vnService.updateVnByVn(id, data)
        console.log('result updateTotalPriceVnByVn', result)

        


        res.status(200).json({ updateVn: result })

    } catch (err) {
        next(err)
    }
}

module.exports = accountController