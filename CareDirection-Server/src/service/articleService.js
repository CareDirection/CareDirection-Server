const moment = require('moment')
const { Transaction, getConnection } = require('../lib/dbConnection')
const articleDao = require('../dao/articleDao')
const getSignedUrl = require('../lib/signedurl')

exports.insertMainArticle = async (req, next) => {
  try {
    const currentTime = moment().format('YYYY[. ]MM[. ]DD')
    await articleDao.insertMainArticle(Transaction, req, next, currentTime)
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.insertSubArticle = async (req, next) => {
  try {
    await articleDao.insertSubArticle(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.getArticleList = async () => {
  const connection = await getConnection()
  try {
    const result = await articleDao.getArticleList(connection)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.getArticle = async (req, next) => {
  try {
    const result = await articleDao.getArticle(Transaction, req, next)
    result.main_contents.image_key = await getSignedUrl.getSignedUrl(result.main_contents.image_key)
    for (const i in result.sub_contents) {
      result.sub_contents[i].image_key = await getSignedUrl.getSignedUrl(result.sub_contents[i].image_key)
    }
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}
