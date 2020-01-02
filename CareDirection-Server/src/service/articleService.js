const { Transaction, getConnection } = require('../lib/dbConnection')
const articleDao = require('../dao/articleDao')

exports.insertMainArticle = async (req, next) => {
  try {
    await articleDao.insertMainArticle(Transaction, req, next)
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
