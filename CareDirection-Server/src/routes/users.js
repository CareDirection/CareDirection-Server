const { Router } = require('express')

const users = Router()

const usersCtrl = require('../controller/userController')
const needAuth = require('../middlewares/userCheck')

/* GET home page. */
users.get('/list', needAuth, usersCtrl.userList)
users.post('/signup', usersCtrl.signUp)
users.post('/signin', usersCtrl.signIn)
users.post('/id', usersCtrl.duplicateId)
users.put('/nickname', usersCtrl.modifyName)
users.delete('/child', needAuth, usersCtrl.removeMyChild)

users.post('/info', needAuth, usersCtrl.serveyInfo)

module.exports = users
