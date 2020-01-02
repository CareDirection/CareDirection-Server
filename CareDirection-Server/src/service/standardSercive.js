const { getConnection } = require('../lib/dbConnection')
const standardDao = require('../dao/standardDao')

exports.getStandardFilterCategories = async (req) => {
  const connection = await getConnection()
  try {
    const data = await standardDao.getStandardFilterCategories(connection)
    return [
      {
        filter_standard: data.product_standard1,
        filter_standard_items: [
          `${data.filter_category_first_first}${data.filter_category_unit} ~ ${data.filter_category_first_second}${data.filter_category_unit}`,
          `${data.filter_category_first_second}${data.filter_category_unit} ~ ${data.filter_category_first_third}${data.filter_category_unit}`,
          `${data.filter_category_first_third}${data.filter_category_unit} ~ ${data.filter_category_first_fourth}${data.filter_category_unit}`,
        ],
      },
      {
        filter_standard: data.product_standard2,
        filter_standard_items: [
          data.filter_category_second_first,
          data.filter_category_second_second,
        ],
      },
      {
        filter_standard: data.product_standard3,
        filter_standard_items: [
          data.filter_category_third_first,
          data.filter_category_third_second,
        ],
      },
    ]
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
}
