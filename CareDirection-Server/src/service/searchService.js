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
    const userIdx = decode.user_idx ? decode.user_idx : decode.child_user_idx

    const searchResults = await searchDao.searchDoseProducts(connection, query, userIdx)

    return await Promise.all(
      searchResults.map(async (result) => {
        if (result.image_location) {
          result.image_location = await signedUrl.getSignedUrl(result.image_key)
        }// 몬가 이미지 안됨

        result.product_price_per_unit = `(1개 ${(result.product_quantity_price / result.product_quantity_count).toLocaleString('en').split('.')[0]}원)`
        result.product_price = `${Number(result.product_quantity_price).toLocaleString('en')}원`
        result.product_is_import = (result.product_is_import === 1)
        result.product_is_already_managed = result.dose_idx != null

        const pakageType = result.product_package_type === 0 ? '정' : '포'
        result.product_quantity = `${result.product_quantity_count}${pakageType} 기준`
        delete result.product_package_type
        delete result.product_quantity_count
        delete result.product_quantity_price
        delete result.image_key
        delete result.dose_idx

        return result
      }),
    )
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}
