const { Router } = require('express')

const efficacy = Router()

const efficacyController = require('../controller/efficacyController')

efficacy.post('/', efficacyController.insertEfficacy)
efficacy.get('/', efficacyController.getEfficacyList)

module.exports = efficacy
