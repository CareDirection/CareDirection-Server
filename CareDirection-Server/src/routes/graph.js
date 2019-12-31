const { Router } = require('express')

const graph = Router()

const graphContoller = require('../controller/graphController')
const needAuth = require('../middlewares/userCheck')


graph.get('/graph', needAuth, graphContoller.getMyGraphInfo)

module.exports = graph
