const express = require('express');
const userController = require('../controllers/user-controller');
const authenticate = require('../middlewares/authenticate');

const userRouter =  express.Router();



userRouter.get('/account/:id', userController.getUserId)
userRouter.patch('/:hn')


//user page
userRouter.get('/getalluservnbyhn/:hn', authenticate, userController.getAllUserVnByHn)
userRouter.get('/appointment/:hn', authenticate, userController.getAppointmentByHn)
userRouter.patch('/updateUserAccount', authenticate, userController.updateUserAccount)


module.exports = userRouter;