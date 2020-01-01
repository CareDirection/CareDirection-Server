const { Router } = require('express')

const efficacy = Router()

const needAuth = require('../middlewares/userCheck')
const efficacyController = require('../controller/efficacyController')

efficacy.post('/', efficacyController.insertEfficacy)
efficacy.get('/', efficacyController.getEfficacyList)
efficacy.get('/:efficacy_idx/nutrients', efficacyController.getNutrientsListPerEfficacy)

efficacy.get('/list', needAuth, efficacyController.getMyEfficacyList)

module.exports = efficacy
