const { Router } = require('express')

const nutrient = Router()

const nutrientContoller = require('../controller/nutrientController')

nutrient.post('/', nutrientContoller.insertNutrient)

module.exports = nutrient
