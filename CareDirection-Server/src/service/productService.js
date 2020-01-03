const moment = require('moment')
const { Transaction, getConnection } = require('../lib/dbConnection')
const productDao = require('../dao/productDao')
const getSignedUrl = require('../lib/signedurl')
const lowestProductInfo = require('../lib/lowestProductInfo')
const percent = require('../lib/graphFormula')

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
    let result
    if (req.user.type === 'parent') {
      result = await productDao.enrollParentDose(Transaction, req, next)
    } else {
      result = await productDao.enrollChildDose(Transaction, req, next)
    }
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.modifyDose = async (req, next) => {
  const connection = await getConnection()
  try {
    let result
    if (req.user.type === 'parent') {
      result = await productDao.modifyParentDose(connection, req, next)
    } else {
      result = await productDao.modifyChildDose(connection, req, next)
    }
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
    const lowpriceArr = await lowestProductInfo.lowestProductInfo(result[0].product_name)
    let i = 0
    const resultData = []
    result.forEach((element) => {
      resultData.push({
        count_price: {
          product_quantity_count: element.product_quantity_count,
          product_quantity_price: element.product_quantity_price,
        },
      })
      i += 1
    })
    resultData.push({
      common_data: {
        main_nutrient_name: result[0].main_nutrient_name,
        image_key: result[0].image_key,
        product_company_name: result[0].product_company_name,
        product_name: result[0].product_name,
        product_package_type: result[0].product_package_type,
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
      },
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

exports.getTabList = async (req, next) => {
  try {
    let result
    if (req.user.type === 'parent') {
      result = await productDao.getPranetUserTabList(Transaction, req, next)
    } else {
      result = await productDao.getChildUserTabList(Transaction, req, next)
    }
    result.unshift({
      tab_name: '홍삼',
    })
    result.unshift({
      tab_name: '오메가3',
    })
    if(result[result.length -1] == null) {
      result.pop()
    }
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.getDoseinfoPopup = async (req, next) => {
  try {
    let result
    if (req.user.type === 'parent') {
      result = await productDao.getDoseinfoParentPopup(Transaction, req, next)
    } else {
      result = await productDao.getDoseinfoChildPopup(Transaction, req, next)
    }
    result[0].image_key = await getSignedUrl.getSignedResizedUrl(result[0].image_key)
    // console.log(result)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}
// 제품 등록 service
exports.insertProduct = async (next, data) => {
  try {
    await productDao.insertProduct(Transaction, data, next)
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.getCurrentDoseProducts = async (req) => {
  const connection = await getConnection()
  try {
    const { user_idx, child_user_idx } = req.user
    const { date } = req.query

    const doseList = await productDao.getCurrentDoseProducts(connection, date, user_idx, child_user_idx)

    return await Promise.all(
      doseList.map(async (doseItem) => {

        if (doseItem.image_key) {
          doseItem.image_location = await getSignedUrl.getSignedUrl(doseItem.image_key)
        }

        doseItem.product_price_per_unit = `(1개 ${(doseItem.product_quantity_price / doseItem.product_quantity_count).toLocaleString('en').split('.')[0]}원)`
        doseItem.product_price = `${Number(doseItem.product_quantity_price).toLocaleString('en')}원`
        doseItem.product_is_import = (doseItem.product_is_import === 1)

        const pakageType = doseItem.product_package_type === 0 ? '정' : '포'
        doseItem.product_quantity = `${doseItem.product_quantity_count}${pakageType} 기준`
        doseItem.product_is_dosed = (doseItem.product_is_dosed >= 1)
        doseItem.product_remain = (doseItem.product_quantity_count - doseItem.dose_count)
        delete doseItem.product_package_type
        delete doseItem.product_quantity_count
        delete doseItem.product_quantity_price
        delete doseItem.image_key
        delete doseItem.dose_idx
        delete doseItem.dose_count

        return doseItem
      }),
    )
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

exports.getProductDetailGraph = async (req, next) => {
  try {
    const result = []
    let data
    const tempData = [800, 1.2, 110, 2, 150, 527, 10, 30, 10, 300, 100]
    const nutrientName = ['비타민A', '비타민B2', '비타민C', '비타민D', '비타민E', '칼슘', '칼륨', '셀레늄', '철분', '엽산', '마그네슘']
    if (req.user.type === 'parent') {
      data = await productDao.getProductDetailParentGraph(Transaction, req, next)
      data.plusXValue.forEach(async (item) => {
        let i = 0
        nutrientName.forEach(item2 => {
          if (item.nutrient_name === item2) tempData[i] += item.has_nutrient_amount
          i += 1
        })
      })
      data.standardArray.forEach(async (item) => {
        let maxSum = 0
        let minSum = 0
        data.change.forEach(item2 => {
          if (item.standard_case_nutrient_name === item2.name) {
            if (item2.line === '상한선') {
              maxSum = Number(item.standard_case_max_value) + Number(item2.value)
              item.standard_case_max_value = Number(maxSum)
            } else {
              minSum = Number(item.standard_case_recommend_value) + Number(item2.value)
              item.standard_case_recommend_value = Number(minSum)
            }
          }
        })
      })
      data.standardArray.forEach(async (info, index) => {
        const temp = {
          nutrient_name: info.standard_case_nutrient_name,
          nutrient_percent: percent.formulaForMyData(tempData[index], Number(info.standard_case_recommend_value), Number(info.standard_case_max_value)),
        }
        result.push(temp)
      })
    } else {
      data = await productDao.getProductDetailChildGraph(Transaction, req, next)
      data.plusXValue.forEach(async (item) => {
        let i = 0
        nutrientName.forEach(item2 => {
          if (item.nutrient_name === item2) tempData[i] += item.has_nutrient_amount
          i += 1
        })
      })
      // console.log(tempData)
      data.standardArray.forEach(async (item) => {
        let maxSum = 0
        let minSum = 0
        data.change.forEach(item2 => {
          if (item.standard_case_nutrient_name === item2.name) {
            if (item2.line === '상한선') {
              maxSum = Number(item.standard_case_max_value) + Number(item2.value)
              item.standard_case_max_value = Number(maxSum)
            } else {
              minSum = Number(item.standard_case_recommend_value) + Number(item2.value)
              item.standard_case_recommend_value = Number(minSum)
            }
          }
        })
      })
      data.standardArray.forEach(async (info, index) => {
        const temp = {
          nutrient_name: info.standard_case_nutrient_name,
          nutrient_percent: percent.formulaForMyData(tempData[index], Number(info.standard_case_recommend_value), Number(info.standard_case_max_value)),
        }
        result.push(temp)
      })
    }

    return result
  } catch (e) {
    console.log(e.message)
  }
}

exports.mappingProductToNutrient = async (req, next) => {
  try {
    await productDao.mappingProductToNutrient(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.insertImage = async (req, next) => {
  try {
    await productDao.insertImage(Transaction, req, next)
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}
