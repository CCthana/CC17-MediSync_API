const hnService = require("../services/hn-service")
const createError = require("../utility/create-error")

const hnController = {}

hnController.createHN = async ( req, res, next ) => {
    try {

        const data = req.body
        data.password = '123456'
        data.hn = "HN" + Math.round(Math.random()* 100000000) + ""
        console.log('data', data)

        const existHN = await hnService.findHnByNameOrPhoneOrEmail(data)
        console.log('existHN', existHN)

        if (existHN.length >= 0) {
            createError({
                message: 'HN already in use',
                statusCode: 400
            })
        }

        delete data.password

        await hnService.createHn(data)
        res.status(201).json({ message: 'HN created'})

    } catch (err) {
        next(err)
    }
}

hnController.updateHN = async ( req, res, next ) => {
    try {

        const data = req.body

        // เชคเลข HN ก่อนว่ามีในระบบไหม
        const existHN = await hnService.findHnByHn(data.hn)

        if (!existHN) {
            createError({
                message: 'information does not exist in the database.',
                statusCode: 400
            })
        }

        const existDataHN = await hnService.findHnByNameOrPhoneOrEmail(data)
        console.log('existDataHN', existDataHN)

        if (existDataHN.length >= 1) {
            createError({
                message: 'information is already in the database.',
                statusCode: 400
            })
        }

        if (data.password) {
            delete data.password
        }

        const result = await hnService.updateHn(data)
        res.status(200).json({ updateHn: result})

    } catch (err) {
        next(err)
    }
}

hnController.getAllHN = async ( req, res, next ) => {
    try {

        const getAllHN = await hnService.getAllHn()
        console.log('getAllHN', getAllHN)

        res.status(200).json({ HN: getAllHN })

    } catch (err) {
        next(err)
    }
}

hnController.getHnByHn = async ( req, res, next ) => {
    try {
        const hn = req.body.hn
        const getHnbyHn = await hnService.findHnByHn(hn)
        console.log('getHnbyHn', getHnbyHn)

        res.status(200).json({ HNByHN: getHnbyHn })

    } catch (err) {
        next(err)
    }
}

module.exports = hnController