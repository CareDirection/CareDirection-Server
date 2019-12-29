const { Router } = require('express')

const router = Router()

const users = require('./users')
const products = require('./products')
const nutrient = require('./nutrient')
const efficacy = require('./efficacy')

/* GET home page. */
router.use('/users', users)
router.use('/product', products)
router.use('/nutrient', nutrient)
router.use('/efficacy', efficacy)

module.exports = router
