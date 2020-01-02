const { Router } = require('express')

const router = Router()

const users = require('./users')
const product = require('./product')
const nutrient = require('./nutrient')
const efficacy = require('./efficacy')
const survey = require('./survey')
const search = require('./search')
const graph = require('./graph')
const article = require('./article')
const standard = require('./standard')

/* GET home page. */
router.use('/users', users)
router.use('/product', product)
router.use('/nutrient', nutrient)
router.use('/efficacy', efficacy)
router.use('/survey', survey)
router.use('/search', search)
router.use('/graph', graph)
router.use('/article', article)
router.use('/standard', standard)

module.exports = router
