const { Router } = require('express')

const users = Router()

const usersCtrl = require('../controller/userController')
const needAuth = require('../middlewares/userCheck')

/* GET home page. */
users.post('/signup', usersCtrl.signUp)
users.post('/signin', usersCtrl.signIn)
users.post('/id', usersCtrl.duplicateId)

module.exports = users
