const { Router } = require('express')

const router = Router()

const users = require('./users')
const products = require('./products')

/* GET home page. */
router.use('/users', users)
router.use('/products', products)

module.exports = router
