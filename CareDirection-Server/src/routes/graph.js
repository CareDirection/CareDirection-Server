const { Router } = require('express')

const graph = Router()

const graphController = require('../controller/graphController')
const needAuth = require('../middlewares/userCheck')

graph.get('/', needAuth, graphController.getMyGraphInfo)
graph.get('/detailed', needAuth, graphController.getMyGraphDetailInfo)

module.exports = graph
