const { Router } = require('express')

const efficacy = Router()

const efficacyController = require('../controller/efficacyController')

efficacy.post('/', efficacyController.insertEfficacy)
efficacy.get('/', efficacyController.getEfficacyList)
efficacy.get('/:efficacy_idx/nutrients', efficacyController.getNutrientsListPerEfficacy)

module.exports = efficacy
