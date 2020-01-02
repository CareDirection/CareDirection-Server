exports.getStandardFilterCategories = (connection, productIdx) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT p.product_standard1, p.product_standard2, p.product_standard3, fc.filter_category_first_first, fc.filter_category_first_second, fc.filter_category_first_third, fc.filter_category_first_fourth, fc.filter_category_first_unit, fc.filter_category_second_first,fc.filter_category_second_second, fc.filter_category_third_first, fc.filter_category_third_second
        FROM filter_category fc
            JOIN product p 
            ON fc.filter_category_idx = p.filter_category_idx
        WHERE p.product_idx = ${productIdx}
    `
    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}
