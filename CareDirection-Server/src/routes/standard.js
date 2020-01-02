const { Router } = require('express')

const standard = Router()

const standardController = require('../controller/standardController')

standard.get('/filter', standardController.getStandardFilterCategories)

module.exports = standard
