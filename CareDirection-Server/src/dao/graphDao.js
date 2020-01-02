
exports.getParentUserMyGraphInfo = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    console.log(req.user.user_idx)
    const change = []
    const Query1 = `SELECT user_gender, user_birth  FROM user WHERE user_idx = ${req.user.user_idx};`
    const userData = await connection.query(Query1)
    const Query2 = `SELECT case_filter_idx FROM case_filter WHERE case_filter_gender = ${userData[0].user_gender} AND case_filter_birth = ${userData[0].user_birth};`
    const case_filter_idx = await connection.query(Query2)
    const Query3 = `SELECT * FROM standard_case WHERE case_filter_idx = ${case_filter_idx[0].case_filter_idx}`
    const standardArray = await connection.query(Query3)
    const Query4 = `SELECT * FROM user_survey WHERE user_idx = ${req.user.user_idx}`
    const userAnswer = await connection.query(Query4)
    // user_survey_item_value1
    const Query5 = `select standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 1 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value3}";`
    const data1 = await connection.query(Query5)
    data1.forEach(item => {
      change.push(item)
    })
    const Query6 = `select standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 2 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value4}";`
    const data2 = await connection.query(Query6)
    data2.forEach(item => {
      change.push(item)
    })
    const Query7 = `select standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 3 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value5}";`
    const data3 = await connection.query(Query7)
    data3.forEach(item => {
      change.push(item)
    })
    const Query8 = `select standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 4 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value6}";`
    const data4 = await connection.query(Query8)
    data4.forEach(item => {
      change.push(item)
    })
    const Query9 = `select standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 5 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value7}";`
    const data5 = await connection.query(Query9)
    data5.forEach(item => {
      change.push(item)
    })
    const diseaseArray = userAnswer[0].user_survey_item_value1.split(',')
    diseaseArray.forEach(async (item) => {
      const Query10 = `select standard_condition_case_change_nutrient_name as name, standard_condition_case_change_line as line, standard_condition_case_value as value from standard_condition_case where standard_condition_case_name = "${item}"`
      const data6 = await connection.query(Query10)
      data6.forEach(item2 => {
        change.push(item2)
      })
    })
    const result = {
      standardArray,
      change,
    }
    return result
  }).catch(error => {
    return next(error)
  })
}

exports.getParentUserMyGraphDetailInfo = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    console.log(req.user.user_idx)
    const change = []
    const Query1 = `SELECT user_gender, user_birth  FROM user WHERE user_idx = ${req.user.user_idx};`
    const userData = await connection.query(Query1)
    const Query2 = `SELECT case_filter_idx FROM case_filter WHERE case_filter_gender = ${userData[0].user_gender} AND case_filter_birth = ${userData[0].user_birth};`
    const case_filter_idx = await connection.query(Query2)
    const Query3 = `SELECT * FROM standard_case WHERE case_filter_idx = ${case_filter_idx[0].case_filter_idx}`
    const standardArray = await connection.query(Query3)
    const Query4 = `SELECT * FROM user_survey WHERE user_idx = ${req.user.user_idx}`
    const userAnswer = await connection.query(Query4)

    // const testQuery = `SELECT nutrient_default_description AS description, nutrient_contain_food AS food FROM nutrient WHERE nutrient_idx = ${req.user.user_idx}`


    const Query5 = `select standard_lifecycle_description as description, standard_lifecycle_food as food, standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 1 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value3}";`
    const data1 = await connection.query(Query5)
    data1.forEach(item => {
      change.push(item)
      console.log(change)
    })
    const Query6 = `select standard_lifecycle_description as description, standard_lifecycle_food as food, standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 2 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value4}";`
    const data2 = await connection.query(Query6)
    data2.forEach(item => {
      change.push(item)
      console.log(change)

    })
    const Query7 = `select standard_lifecycle_description as description, standard_lifecycle_food as food, standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 3 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value5}";`
    const data3 = await connection.query(Query7)
    data3.forEach(item => {
      change.push(item)
      console.log(change)

    })
    const Query8 = `select standard_lifecycle_description as description, standard_lifecycle_food as food, standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 4 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value6}";`
    const data4 = await connection.query(Query8)
    data4.forEach(item => {
      change.push(item)
      console.log(change)

    })
    const Query9 = `select standard_lifecycle_description as description, standard_lifecycle_food as food, standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 5 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value7}";`
    const data5 = await connection.query(Query9)
    data5.forEach(item => {
      change.push(item)
      console.log(change)

    })
    const diseaseArray = userAnswer[0].user_survey_item_value1.split(',')
    diseaseArray.forEach(async (item) => {
      const Query10 = `select standard_condition_case_change_nutrient_name as name, standard_condition_case_change_line as line, standard_condition_case_value as value from standard_condition_case where standard_condition_case_name = "${item}"`
      const data6 = await connection.query(Query10)
      data6.forEach(item2 => {
        change.push(item2)
      })
    })
    const result = {
      standardArray,
      change,
    }
    return result
  }).catch(error => {
    return next(error)
  })
}


exports.getChildUserMyGraphInfo = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    console.log(req.user.user_idx)
    const change = []
    const Query1 = `SELECT childuser_gender, childuser_birth  FROM childuser WHERE childuser_idx = ${req.user.childuser_idx};`
    const userData = await connection.query(Query1)
    if (Number(userData[0].childuser_birth) <= 1981) {
      userData[0].childuser_birth = 3
    } else if (Number(userData[0].childuser_birth) > 1981 && Number(userData[0].childuser_birth) <= 2001) {
      userData[0].childuser_birth = 2
    } else {
      userData[0].childuser_birth = 1
    }
    const Query2 = `SELECT case_filter_idx FROM case_filter WHERE case_filter_gender = ${userData[0].childuser_gender} AND case_filter_birth = ${userData[0].childuser_birth};`
    const case_filter_idx = await connection.query(Query2)
    const Query3 = `SELECT * FROM standard_case WHERE case_filter_idx = ${case_filter_idx[0].case_filter_idx}`
    const standardArray = await connection.query(Query3)
    const Query4 = `SELECT * FROM user_survey WHERE childuser_idx = ${req.user.childuser_idx}`
    const userAnswer = await connection.query(Query4)
    // user_survey_item_value1
    const Query5 = `select standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 1 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value3}";`
    const data1 = await connection.query(Query5)
    data1.forEach(item => {
      change.push(item)
    })
    const Query6 = `select standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 2 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value4}";`
    const data2 = await connection.query(Query6)
    data2.forEach(item => {
      change.push(item)
    })
    const Query7 = `select standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 3 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value5}";`
    const data3 = await connection.query(Query7)
    data3.forEach(item => {
      change.push(item)
    })
    const Query8 = `select standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 4 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value6}";`
    const data4 = await connection.query(Query8)
    data4.forEach(item => {
      change.push(item)
    })
    const Query9 = `select standard_lifecycle_change_nutrient_name as name, standard_lifecycle_change_line as line, standard_lifecycle_change_value as value from standard_lifecycle_case where standard_lifecycle_case_type = 5 and standard_lifecycle_answer = "${userAnswer[0].user_survey_item_value7}";`
    const data5 = await connection.query(Query9)
    data5.forEach(item => {
      change.push(item)
    })
    const diseaseArray = userAnswer[0].user_survey_item_value1.split(',')
    diseaseArray.forEach(async (item) => {
      const Query10 = `select standard_condition_case_change_nutrient_name as name, standard_condition_case_change_line as line, standard_condition_case_value as value from standard_condition_case where standard_condition_case_name = "${item}"`
      const data6 = await connection.query(Query10)
      data6.forEach(item2 => {
        change.push(item2)
      })
    })
    const result = {
      standardArray,
      change,
    }
    return result
  }).catch(error => {
    return next(error)
  })
}
