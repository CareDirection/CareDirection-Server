const { Router } = require('express')
const users = Router()

const usersCtrl = require('../controller/userController')
const needAuth = require('../middlewares/userCheck')

/* GET home page. */
users.get('/singup', needAuth, usersCtrl.singUp)

module.exports = users
