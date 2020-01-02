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

exports.getMyGraphDetailInfo = async (req, next) => {
  const connection = await getConnection()
  try {
    let change_data_max = null
    let change_data_rec = null

    const tempData = [800, 1.2, 110, 2, 150, 527, 10, 30, 10, 300, 100]
    const data = await graphDao.getParentUserMyGraphDetailInfo(Transaction, req, next)
    data.standardArray.forEach(async (item) => {
      let maxSum = 0
      let minSum = 0

      data.change.forEach(item2 => {
        if (item.standard_case_nutrient_name === item2.name) {
          if (item2.line === '상한선') {
            item.my_change_description += item2.description
            maxSum = Number(item.standard_case_max_value) + Number(item2.value)
            item.standard_case_max_value_default = Number(item.standard_case_max_value)
            item.standard_case_max_value = Number(maxSum)
          } else {
            item.my_change_description += item2.description

            minSum = Number(item.standard_case_recommend_value) + Number(item2.value)
            item.standard_case_recommend_value_default = Number(item.standard_case_recommend_value)
            item.standard_case_recommend_value = Number(minSum)
          }
        }
      })
    })
    
    const result = []
    for(const i in data.standardArray) {
      const info = data.standardArray[i]
      const defaultData = await graphDao.getNutrientDefaultData(connection, info)

      console.log("info:", info)
      if (info.standard_case_max_value_default !== undefined) {
        change_data_max = `상한 섭취량 조정 ${info.standard_case_max_value_default}${defaultData[0].nutrient_unit} -> ${info.standard_case_max_value}${defaultData[0].nutrient_unit}`
      } else {
        change_data_max = null
      }

      if (info.standard_case_recommend_value_default !== undefined) {
        change_data_rec = `권장 섭취량 조정 ${info.standard_case_recommend_value_default}${defaultData[0].nutrient_unit} -> ${info.standard_case_recommend_value}${defaultData[0].nutrient_unit}`
      } else {
        change_data_rec = null
      }

      let line = ""
      if(info.standard_case_recommend_value_default !== undefined && info.standard_case_max_value_default !== undefined){
        line = "\n"
      }

      const temp = {
        nutrient_name: info.standard_case_nutrient_name,
        my_change_value_description: `${change_data_max}${line}${change_data_rec}`,
        my_current_value_percent: percent.formulaForMyData(tempData[i], Number(info.standard_case_recommend_value), Number(info.standard_case_max_value)),
        description: `${defaultData[0].nutrient_default_description}\n${info.my_change_description}\n\n${defaultData[0].nutrient_contain_food}`,
      }
      result.push(temp)
    }
    return result
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
}
