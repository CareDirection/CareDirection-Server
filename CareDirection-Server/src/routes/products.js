const { Router } = require('express')

const products = Router()

const productsCtrl = require('../controller/productController')
const { multer } = require('../../config/multer')
const needAuth = require('../middlewares/userCheck')

const upload = multer('product')

// 복용제품 등록 위한 정보 가져오기
// products.get('/:product_idx/dose', needAuth, productsCtrl.dose)
// 현재 복용제품 추가
products.post('/:product_idx/dose', needAuth, productsCtrl.dose)
// 현재 복용 제품 정보수정
// products.put('/:product_idx/dose', needAuth, productsCtrl.dose)

// ADMIN 제품 등록하기
products.post('/', upload.single('file'), productsCtrl.insertProduct)

/*
// 제품 디테일
products.get('/:productIdx/info', needAuth, productsCtrl)
// 제품 디테일 그래프
products.get('/:productIdx/graph', needAuth, productsCtrl)
// 제품 디테일 효능
products.get('/:productIdx/efficacy', needAuth, productsCtrl)
// 최저가 정보
products.get('/:productIdx/lowprice', needAuth, productsCtrl)
*/
module.exports = products
