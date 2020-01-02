const { Router } = require('express')

const artcle = Router()

const { multer } = require('../../config/multer')

const articleController = require('../controller/articleController')

const upload_main = multer('article/main')
const upload_sub = multer('article/sub')

artcle.post('/main', upload_main.single('main_file'), articleController.insertMainArticle)
// upload_sub.fields([{ name: 'sub_file', maxCount: 8 }]), insertSubArticle
artcle.post('/:article_idx/sub', upload_sub.single('sub_file'), articleController.insertSubArticle)

module.exports = artcle
