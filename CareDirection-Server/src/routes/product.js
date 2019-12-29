const { Router } = require('express')

const product = Router()

const productsCtrl = require('../controller/productController')
const { multer } = require('../../config/multer')
const needAuth = require('../middlewares/userCheck')

const upload = multer('product')

// 복용제품 등록 위한 정보 가져오기
product.get('/:product_idx/dose', needAuth, productsCtrl.importDose)
// 현재 복용제품 추가
product.post('/:product_idx/dose', needAuth, productsCtrl.enrollDose)
// 현재 복용 제품 정보수정
// products.put('/:product_idx/dose', needAuth, productsCtrl.dose)

// ADMIN 제품 등록하기
product.post('/', upload.single('file'), productsCtrl.insertProduct)

/*
// 제품 디테일
product.get('/:productIdx/info', needAuth, productsCtrl)
// 제품 디테일 그래프
product.get('/:productIdx/graph', needAuth, productsCtrl)
// 제품 디테일 효능
product.get('/:productIdx/efficacy', needAuth, productsCtrl)
// 최저가 정보
product.get('/:productIdx/lowprice', needAuth, productsCtrl)
*/
module.exports = product
