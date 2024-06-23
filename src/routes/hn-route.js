const express = require('express');
const hnController = require('../controllers/hn-controller');

const hnRouter = express.Router()

hnRouter.get('/getAllHN', hnController.getAllHN)
hnRouter.get('/getHnByHn', hnController.getHnByHn)


module.exports = hnRouter