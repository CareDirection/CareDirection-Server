const { Router } = require('express')

const nutrient = Router()

const nutrientContoller = require('../controller/nutrientController')
const needAuth = require('../middlewares/userCheck')


nutrient.post('/', nutrientContoller.insertNutrient)
nutrient.get('/function', needAuth, nutrientContoller.getMyFunctioinalNutrients)
nutrient.get('/:nutrient_idx', needAuth, nutrientContoller.specificInfo)

module.exports = nutrient
