const adminService = require('../services/admin-service')
const jwtService = require('../services/jwt-service')
const createError = require('../utility/create-error')

const authenticateAdmin = async (req, res, next) => {
    try {
        
        const authorization = req.headers.authorization
        // console.log('authorization Admin',authorization)

        if (!authorization || !authorization.startsWith('Bearer ')) {
            createError({
                message: 'unauthenticated',
                statusCode: 401
            })
        }

        const accessTokenAdmin = authorization.split(' ')[1]
        // console.log('accessTokenAdmin' , accessTokenAdmin)
        const payload = jwtService.verify(accessTokenAdmin)
        
        const admin = await adminService.findAdimById(payload.id)
        // console.log('admin', admin)
        if (!admin) {
            createError({
                message: 'user was not found',
                statusCode: 400
            })
        }

        delete admin.password

        req.admin = admin
        next()

    } catch (err) {
        next(err)
    }
}

module.exports = authenticateAdmin