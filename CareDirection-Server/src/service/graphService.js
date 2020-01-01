const { Transaction, getConnection } = require('../lib/dbConnection')
const graphDao = require('../dao/graphDao')
const percent = require('../lib/graphFormula')

exports.getMyGraphInfo = async (req, next) => {
  try {
    const result = []
    const tempData = [800, 1.2, 110, 2, 150, 527, 10, 30, 10, 300, 100]
    const data = await graphDao.getParentUserMyGraphInfo(Transaction, req, next)
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
    return result
  } catch (e) {
    console.log(e.message)
  }
}
