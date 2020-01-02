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
