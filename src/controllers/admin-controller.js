const adminService = require("../services/admin-service")
const hashService = require("../services/hash-service")
const jwtService = require("../services/jwt-service")
const vnService = require("../services/vn-service")
const createError = require("../utility/create-error")

const adminController = {}

adminController.createAdmin = async (req, res, next) => {
    try {
        const { userName, password, role } = req.body

        const existAdmin = await adminService.findAdmin(userName)

        if (existAdmin) {
            createError({
                message: 'username already in use',
                statusCode: 400
            })
        }

        const hashPassword = await hashService.hash(password)
        await adminService.createAdmin(userName, hashPassword, role)

        res.status(201).json({ message: 'user created'})

    } catch (err) {
        next(err)
    }
}

adminController.loginAdmin = async ( req, res, next) => {
    try {
        const { userName, password } = req.body

        const existAdmin = await adminService.findAdmin(userName)
        // console.log('existAdmin loginAdmin', existAdmin)

        if (!existAdmin) {
            createError({
                message: 'username or password invalid',
                statusCode: 400
            })
        }
        
        const isMatch = await hashService.compare(password, existAdmin.password)
        // console.log('isMatch loginAdmin', isMatch)

        if (!isMatch) {
            createError({
                message: 'username or password invalid',
                statusCode: 400
            })
        }

        const accessTokenAdmin = jwtService.sign({ id: existAdmin.id,
            doctorId: existAdmin.doctorId
        })
        // console.log('accessTokenAdmin loginAdmin', accessTokenAdmin)

        res.status(200).json({ accessTokenAdmin })
    } catch (err) {
        next(err)
    }
}

adminController.getAdmin = async (req, res, next) => {
    res.status(200).json({admin: req.admin})
}



module.exports = adminController