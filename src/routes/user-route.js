const express = require('express');
const userController = require('../controllers/user-controller');

const userRouter =  express.Router();

userRouter.post('/login', userController.login)

userRouter.get('/account/:id', userController.getUserId)
userRouter.patch('/:hn')
userRouter.get('/appointment', userController.getAppointmentByHn)


module.exports = userRouter;