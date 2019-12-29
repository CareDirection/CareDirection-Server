const { Router } = require('express')

const users = Router()

const usersCtrl = require('../controller/userController')
const needAuth = require('../middlewares/userCheck')

/* GET home page. */
users.get('/signup', needAuth, usersCtrl.signUp)

module.exports = users
