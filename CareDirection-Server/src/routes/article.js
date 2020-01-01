const { Router } = require('express')

const artcle = Router()

const { multer } = require('../../config/multer')

const articleController = require('../controller/articleController')

const upload_main = multer('article/main')
const upload_sub = multer('article/sub')

artcle.post('/', upload_main.single('main_file'), upload_sub.fields([{ name: 'sub_file', maxCount: 8 }]), articleController.insertArticle)


module.exports = artcle
