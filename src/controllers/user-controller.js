const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");
const createError = require("../utility/create-error");

const userController = {}

userController.getUserId = async (req, res, next) => {
   try {
      const userId = +req.params.id
      console.log(userId)
      const result = await userService.getUserId(userId)

      res.status(200).json({message: result});
   } catch (err) {
      next(err)
   }
};

userController.getAppointmentByHn = async (req, res, next) => {
   try {
      const userHn = req.body.hn
      console.log(userHn)
      const result = await userService.getAppointmentByHn(userHn)

      res.status(200).json({message: result});
   } catch (err) {
      next(err)
   }
}

userController.login = async (req, res, next) => {
   try {
      
      const existUser = await userService.findUserByEmail(req.body.email);

      if(!existUser) {
         createError({ message: 'invalid email', statusCode: 400 });
      }

      const isMatch = await hashService.compare(req.body.password, existUser.password);

      if(!isMatch){
         createError({message: 'invalid password', statusCode: 400});
      }

      const accessToken = jwtService.sign({ id: existUser.id });

      res.status(200).json({accessToken});

   } catch (err) {
      next(err)
   }
}



module.exports = userController;