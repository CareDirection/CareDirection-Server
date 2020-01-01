const { Router } = require('express')

const search = Router()

const searchCtrl = require('../controller/searchController')

/* GET home page. */
search.get('/', searchCtrl.searchTotalList)

search.get('/dose/product', searchCtrl.searchDoseProduct)

module.exports = search
