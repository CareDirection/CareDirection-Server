const { Router } = require('express')

const nutrient = Router()

const nutrientController = require('../controller/nutrientController')
const { multer } = require('../../config/multer')
const needAuth = require('../middlewares/userCheck')

const upload = multer('ect')


nutrient.post('/', upload.single('image'), nutrientController.insertNutrient)
nutrient.get('/function', needAuth, nutrientController.getMyFunctioinalNutrients)

nutrient.get('/:nutrient_idx', needAuth, nutrientController.specificInfo)

module.exports = nutrient
