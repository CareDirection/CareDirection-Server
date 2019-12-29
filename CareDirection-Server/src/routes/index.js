const { Router } = require('express')

const router = Router()

const users = require('./users')
const products = require('./products')
const nutrient = require('./nutrient')

/* GET home page. */
router.use('/users', users)
router.use('/products', products)
router.use('/nutrient', nutrient)

module.exports = router
