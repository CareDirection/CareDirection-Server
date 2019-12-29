const { Router } = require('express')

const users = Router()

const usersCtrl = require('../controller/userController')
const needAuth = require('../middlewares/userCheck')

/* GET home page. */
users.post('/signup', usersCtrl.signUp)
//users.get('/signin', needAuth, usersCtrl.singIn)

module.exports = users
