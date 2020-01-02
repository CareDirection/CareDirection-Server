const { Router } = require('express')

const artcle = Router()

const { multer } = require('../../config/multer')

const articleController = require('../controller/articleController')

const upload_main = multer('article/main')
const upload_sub = multer('article/sub')

// article main title
artcle.post('/main', upload_main.single('main_file'), articleController.insertMainArticle)
// article sub title
artcle.post('/:article_idx/sub', upload_sub.single('sub_file'), articleController.insertSubArticle)
// 아티클 리스트 가져오기
artcle.get('/', articleController.getArticleList)
// 아티클 상세보기


module.exports = artcle
