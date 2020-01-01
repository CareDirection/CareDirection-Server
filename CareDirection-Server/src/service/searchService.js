const { Transaction, getConnection } = require('../lib/dbConnection')
const searchDao = require('../dao/searchDao')
const signedUrl = require('../lib/signedurl')
const message = require('../lib/responseMessage')
const jwt = require('../lib/token')


exports.searchTotalList = async (req, next) => {
  try {
    const { filter } = req.query
    let result
    if (filter === 'product') {
      result = await searchDao.searchProductTitleTotalList(Transaction, req, next)
      for (const i in result.searchList) {
        console.log(result.searchList[i].image_key = await signedUrl.getSignedUrl(result.searchList[i].image_key))
      }
    } else {
      result = await searchDao.searchNutrientTitleTotalList(Transaction, req, next)
      for (const i in result.searchList) {
        console.log(result.searchList[i].image_key = await signedUrl.getSignedUrl(result.searchList[i].image_key))
      }
    }
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.searchDoseProduct = async (req) => {
  const { query } = req.query
  const { token } = req.headers
  const connection = await getConnection()

  try {
    const decode = await jwt.decode(token)

    console.log(decode)
    const userIdx = decode.user_idx ? decode.user_idx : decode.child_user_idx

    const searchResult = await searchDao.searchDoseProducts(connection, query, userIdx)
    console.log(searchResult)

    return searchResult

  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}
