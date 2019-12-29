const { Router } = require('express')

const efficacy = Router()

const efficacyController = require('../controller/efficacyController')

efficacy.post('/', efficacyController.insertEfficacy)

module.exports = efficacy
