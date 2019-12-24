const { Router } = require('express')
const router = Router()

const users = require('./users')


/* GET home page. */
router.use('/users', users)


module.exports = router
