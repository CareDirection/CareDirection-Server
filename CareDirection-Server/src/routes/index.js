const { Router } = require('express')

const router = Router()

const users = require('./users')
const product = require('./product')
const nutrient = require('./nutrient')
const efficacy = require('./efficacy')
const survey = require('./survey')

/* GET home page. */
router.use('/users', users)
router.use('/product', product)
router.use('/nutrient', nutrient)
router.use('/efficacy', efficacy)
router.use('/survey', survey)

module.exports = router
