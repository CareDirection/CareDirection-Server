const { Transaction, getConnection } = require('../lib/dbConnection')
const searchDao = require('../dao/searchDao')
const signedUrl = require('../lib/signedurl')
const message = require('../lib/responseMessage')


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
