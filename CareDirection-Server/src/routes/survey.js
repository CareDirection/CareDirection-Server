const { Router } = require('express')

const survey = Router()

const needAuth = require('../middlewares/userCheck')
const surveyController = require('../controller/surveyController')

survey.post('/lifecycle', needAuth, surveyController.lifecycle)

module.exports = survey
