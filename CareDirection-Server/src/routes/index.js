const { Router } = require('express')

const router = Router()

const users = require('./users')
const product = require('./product')
const nutrient = require('./nutrient')

/* GET home page. */
router.use('/users', users)
router.use('/product', product)
router.use('/nutrient', nutrient)

module.exports = router
