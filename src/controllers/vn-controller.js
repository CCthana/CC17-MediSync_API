const hnService = require("../services/hn-service")
const vnService = require("../services/vn-service")
const createError = require("../utility/create-error")

const vnController = {}

vnController.createVn = async ( req, res, next ) => {
    try {
        const data = req.body
        data.vn = "VN" + Math.round(Math.random()* 1000000) + ""
        data.clinicId = +data.clinicId   
        const exitsHN = await hnService.findHnByHn(data.hn)
        if (!exitsHN) {
            createError({
                message: "no HN in the database.",
                statusCode: 400
            })
        }

        const result = await vnService.createVn(data)
        console.log('result updateVn', result)

        res.status(201).json({ createVn: result })

    } catch (err) {
        next(err)
    }
}

vnController.updateVnByVn = async ( req, res, next ) => {
    try {
        const data = req.body
        console.log('data.vn', data.vn)

        const result = await vnService.updateVnByVn(data)
        console.log('result updateVn', result)

        res.status(200).json({ updateVn: result })

    } catch (err) {
        next(err)
    }
}

vnController.getAllVnByClinic = async ( req, res, next ) => {
    try {
        const clinicId = +req.params.clinicId
        const result = await vnService.getAllVnByClinic(clinicId)
        
        res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}

vnController.getTreatmentVnByDocTor = async ( req, res, next ) => {
    try {
        const id = +req.params.doctorId
       
        const result = await vnService.getTreatmentVnByDocTor(id)
      
        
        res.status(200).json( result )

    } catch (err) {
        next(err)
    }
}

vnController.getAllVnByStatusPayment = async ( req, res, next ) => {
    try {
        const result = await vnService.getAllVnByStatusPayment()
        console.log('result getAllVnByStatusPayment', result)
        

        res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}


vnController.getAllVn = async ( req, res, next ) => {
    try {
        const result = await vnService.getAllVn()
        console.log('result getAllVn', result)

        res.status(200).json({ getAllVn: result })

    } catch (err) {
        next(err)
    }
}

vnController.getVnByVn = async ( req, res, next ) => {
    try {
        const vn = req.body.vn
        const result = await vnService.getVnByVn(vn)
        console.log('result getVnByVn', result)

        res.status(200).json({ getVnByVn: result })

    } catch (err) {
        next(err)
    }
}

vnController.getVnByHn = async ( req, res, next ) => {
    try {
        const hn = req.params.hn
        console.log(hn)
        const result = await vnService.getVnByHn(hn)
        console.log('result getVnByhn', result)

        res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}

vnController.getVnPerDay = async ( req, res, next ) => {
    try {
        const day =  new Date(req.params.day)
        
        console.log(day)
        const result = await vnService.getVnPerDay(day)
        console.log('result getVnByhn', result)

        res.status(200).json(result)

    } catch (err) {
        next(err)
    }
}


module.exports = vnController