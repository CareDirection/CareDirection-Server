const { Router } = require('express')

const search = Router()

const searchCtrl = require('../controller/searchController')

/* GET home page. */
search.get('/', searchCtrl.searchTotalList)

module.exports = search
