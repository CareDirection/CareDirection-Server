const moment = require('moment')
const { Transaction, getConnection } = require('../lib/dbConnection')
const productDao = require('../dao/productDao')
const getSignedUrl = require('../lib/signedurl')
const lowestProductInfo = require('../lib/lowestProductInfo')

exports.importDose = async (req, next) => {
  const connection = await getConnection()
  try {
    const result = await productDao.importDose(connection, req, next)
    result[0].image_key = await getSignedUrl.getSignedResizedUrl(result[0].image_key)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}
exports.enrollDose = async (req, next) => {
  try {
    const result = await productDao.enrollDose(Transaction, req, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.modifyDose = async (req, next) => {
  const connection = await getConnection()
  try {
    const result = await productDao.modifyDose(connection, req, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

exports.checkParentUserProductDose = async (req, next) => {
  try {
    const currentTime = moment().format('YYYY[-]MM[-]DD')
    console.log(currentTime)
    const result = await productDao.checkParentUserProductDose(Transaction, req, currentTime, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.checkChildUserProductDose = async (req, next) => {
  try {
    const currentTime = moment().format('YYYY[-]MM[-]DD')
    console.log(currentTime)
    const result = await productDao.checkChildUserProductDose(Transaction, req, currentTime, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.uncheckParentUserProductDose = async (req, next) => {
  try {
    const currentTime = moment().format('YYYY[-]MM[-]DD')
    const result = await productDao.uncheckParentUserProductDose(Transaction, req, currentTime, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.uncheckChildUserProductDose = async (req, next) => {
  try {
    const currentTime = moment().format('YYYY[-]MM[-]DD')
    const result = await productDao.uncheckChildUserProductDose(Transaction, req, currentTime, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.getProductStandard = async (req) => {
  const connection = await getConnection()
  const { product_idx } = req.params
  try {
    const data = await productDao.getProductStandard(connection, product_idx)
    console.log(data)
    return [
      {
        standard: data.product_standard1,
        standard_value: data.product_standard1_value,
        standard_description: data.product_standard1_description,
      },
      {
        standard: data.product_standard2,
        standard_value: data.product_standard2_value,
        standard_description: data.product_standard2_description,
      },
      {
        standard: data.product_standard3,
        standard_value: data.product_standard3_value,
        standard_description: data.product_standard3_description,
      },
    ]
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

exports.deleteDoseProduct = async (req) => {
  const connection = await getConnection()
  try {
    if (req.user.type = 'parent') {
      await productDao.deleteParentUserDoseProduct(connection, req)
    } else {
      await productDao.deleteChildUserDoseProduct(connection, req)
    }
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

exports.getProductDetailInfo = async (req, next) => {
  const connection = await getConnection()
  try {
    const result = await productDao.getProductDetailInfo(connection, req, next)
    result[0].image_key = await getSignedUrl.getSignedUrl(result[0].image_key)
    const resultData = []
    result.forEach((element) => {
      resultData.push({
        product_quantity_count: element.product_quantity_count,
        product_quantity_price: element.product_quantity_price,
      })
    })
    resultData.push({
      main_nutrient_name: result[0].main_nutrient_name,
      image_key: result[0].image_key,
      product_company_name: result[0].product_company_name,
      product_name: result[0].product_name,
      product_standard1: result[0].product_standard1,
      product_standard2: result[0].product_standard2,
      product_standard3: result[0].product_standard3,
      product_standard1_value: result[0].product_standard1_value,
      product_standard2_value: result[0].product_standard2_value,
      product_standard3_value: result[0].product_standard3_value,
      product_features_name: result[0].product_features_name,
      product_daily_dose: result[0].product_daily_dose,
      product_detail_name: result[0].product_detail_name,
      product_detail_value: result[0].product_detail_value,
      product_additives: result[0].product_additives,
      product_cautions: result[0].product_cautions,
    })
    return resultData
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}


exports.getLowprice = async (req, next) => {
  const connection = await getConnection()
  try {
    const result = await productDao.getLowprice(connection, req, next)
    const lowpriceArr = await lowestProductInfo.lowestProductInfo(result[0].product_name)
    return [
      {
        mallName: lowpriceArr[0].mallName,
        image: lowpriceArr[0].image,
        lprice: lowpriceArr[0].lprice,
        link: lowpriceArr[0].link,
      },
      {
        mallName: lowpriceArr[1].mallName,
        image: lowpriceArr[1].image,
        lprice: lowpriceArr[1].lprice,
        link: lowpriceArr[1].link,
      },
      {
        mallName: lowpriceArr[2].mallName,
        image: lowpriceArr[2].image,
        lprice: lowpriceArr[2].lprice,
        link: lowpriceArr[2].link,
      },
    ]
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

exports.getProductDetailEfficacy = async (req, next) => {
  const connection = await getConnection()
  try {
    const result = await productDao.getProductDetailEfficacy(connection, req, next)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}
