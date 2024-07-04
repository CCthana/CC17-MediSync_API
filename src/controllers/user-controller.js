const hashService = require("../services/hash-service");
const hnService = require("../services/hn-service");
const userService = require("../services/user-service");
const vnService = require("../services/vn-service");


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
      const userHn = req.params.hn
      console.log(userHn)
      const result = await userService.getAppointmentByHn(userHn)

      res.status(200).json(result);
   } catch (err) {
      next(err)
   }
};

userController.getAllUserVnByHn = async (req, res, next) => {
   try {

      const hn = req.params.hn
      console.log(hn)
      const result = await vnService.getVnByHn(hn)
      console.log(result)
      res.status(200).json(result);
   } catch (err) {
      next(err)
   }
};

userController.updateUserAccount = async (req, res, next) => {
   try {
    
      const data = req.body ;
      const password = req.body.password;

      console.log(data)
    
      
      if (password) {
         const hashedPassword = await hashService.hash(password);
         data.password = hashedPassword;
      }
      console.log(data, '============================================')

      const result = await hnService.updateHn(data);
     
      res.status(201).json(result);
      
   } catch (err) {
      next(err)
   }
};


module.exports = userController;