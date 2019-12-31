const message = require('../lib/responseMessage')

exports.searchProductTitleTotalList = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const Query1 = `
SELECT DISTINCT p.product_idx, i.image_key, p.product_name, p.product_company_name, p.product_is_import, (SELECT MIN(product_quantity_price)  FROM product_quantity WHERE product_idx=p.product_idx) as product_quantity_price, (SELECT MIN(product_quantity_count) FROM product_quantity WHERE product_idx=p.product_idx) as product_quantity_count  FROM (product p JOIN product_quantity q USING(product_idx)) JOIN image i USING(product_idx) WHERE p.product_name LIKE "%${req.query.query}%" ;
`
    const searchList = await connection.query(Query1)
    if (searchList.length === 0) {
      return new Error(message.SEARCH_DATA_EMPTY)
    }
    const Query2 = `SELECT product_idx, product_standard1, product_standard2, product_standard3, product_standard1_value, product_standard2_value, product_standard3_value FROM product WHERE product_idx= ${searchList[0].product_idx}`
    const topData = await connection.query(Query2)
    console.log('success')
    const result = {
      topData: topData[0],
      searchList,
    }
    return result
  }).catch(error => {
    return next(error)
  })
}

exports.searchNutrientTitleTotalList = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const Query1 = `
SELECT DISTINCT p.product_idx, i.image_key, p.product_name, p.product_company_name, p.product_is_import, (SELECT MIN(product_quantity_price)  FROM product_quantity WHERE product_idx=p.product_idx) as product_quantity_price, (SELECT MIN(product_quantity_count) FROM product_quantity WHERE product_idx=p.product_idx) as product_quantity_count  FROM (product p JOIN product_quantity q USING(product_idx)) JOIN image i USING(product_idx) WHERE p.main_nutrient_name LIKE "%${req.query.query}%" ;
    `
    const searchList = await connection.query(Query1)
    if (searchList.length === 0) {
      return message.SEARCH_DATA_EMPTY
    }
    const Query2 = `SELECT product_idx, product_standard1, product_standard2, product_standard3, product_standard1_value, product_standard2_value, product_standard3_value FROM product WHERE product_idx= ${searchList[0].product_idx}`
    const topData = await connection.query(Query2)
    console.log('success')
    const result = {
      topData: topData[0],
      searchList,
    }
    return result
  }).catch(error => {
    return next(error)
  })
}

exports.searchDoseProduct = (connection, query, userIdx) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT * i.image_key, p.product_idx, p.product_name, p.product_company_name, p.product_is_import, d.dose_idx
    FROM product p
    JOIN image i
    ON p.product_idx = i.product_idx
    ON d.product_idx = p.product_idx AND d.user_idx = ${userIdx}
    LEFT OUTER JOIN dose d
    WHERE p.product_name LIKE '%${query}%'
    `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
