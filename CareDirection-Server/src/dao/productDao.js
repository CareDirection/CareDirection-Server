const message = require('../lib/responseMessage')

// 복용제품 등록위한 정보 얻어오는 dao
// eslint-disable-next-line no-unused-vars
exports.importDose = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT product_name, product_daily_dose, image_key FROM product as p1 INNER JOIN image as p2 USING(product_idx) WHERE p1.product_idx = "${req.params.product_idx}"`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}


// 복용제품 등록 dao
exports.enrollParentDose = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const Query1 = `SELECT dose_idx FROM dose WHERE product_idx = "${req.params.product_idx}" AND user_idx = "${req.user.user_idx}"`
    const duplicationCheck = await connection.query(Query1)
    if (duplicationCheck[0]) return 'duplicated'
    const Query2 = `SELECT p2.product_quantity_count FROM product as p1 INNER JOIN product_quantity as p2 USING(product_idx) WHERE p1.product_idx = "${req.params.product_idx}"`
    const dose_initial_count = await connection.query(Query2)
    const Query3 = `INSERT INTO dose(product_idx, user_idx, dose_daily_quantity, dose_alarm, dose_initial_count, dose_start_date) 
                    VALUES("${req.params.product_idx}", "${req.user.user_idx}", "${req.body.dose_daily_quantity}", 
                    "${req.body.dose_alarm}", "${dose_initial_count[0].product_quantity_count}", "${req.body.dose_start_date}")`
    await connection.query(Query3)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}
exports.enrollChildDose = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const Query1 = `SELECT dose_idx FROM dose WHERE product_idx = "${req.params.product_idx}" AND childuser_idx = "${req.user.childuser_idx}"`
    const duplicationCheck = await connection.query(Query1)
    if (duplicationCheck[0]) return 'duplicated'
    const Query2 = `SELECT p2.product_quantity_count FROM product as p1 INNER JOIN product_quantity as p2 USING(product_idx) WHERE p1.product_idx = "${req.params.product_idx}"`
    const dose_initial_count = await connection.query(Query2)
    const Query3 = ` 
      INSERT INTO dose(product_idx, childuser_idx, dose_daily_quantity, dose_alarm, dose_initial_count, dose_start_date)
      VALUES("${req.params.product_idx}", "${req.user.childuser_idx}",
          "${req.body.dose_daily_quantity}", "${req.body.dose_alarm}",
          "${dose_initial_count[0].product_quantity_count}",
          "${req.body.dose_start_date}")
    `
    await connection.query(Query3)
    console.log('success')
  }).catch(error => {
    return next(error)
  })
}

// 복용 제품 수정 dao
exports.modifyParentDose = (connection, req, next) => {
  return new Promise((resolve, reject) => {
    const Query = `UPDATE dose SET dose_daily_quantity="${req.body.dose_daily_quantity}", dose_alarm="${req.body.dose_alarm}",  dose_start_date= "${req.body.dose_start_date}" WHERE product_idx= "${req.params.product_idx}" AND user_idx="${req.user.user_idx}"`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.modifyChildDose = (connection, req, next) => {
  return new Promise((resolve, reject) => {
    const Query = `UPDATE dose SET dose_daily_quantity="${req.body.dose_daily_quantity}", dose_alarm="${req.body.dose_alarm}",  dose_start_date= "${req.body.dose_start_date}" WHERE product_idx= "${req.params.product_idx}" AND childuser_idx="${req.user.childuser_idx}"`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

// 제품 등록 dao
exports.insertProduct = (Transaction, data, next) => {
  return Transaction(async (connection) => {
    const Query1 = `
        INSERT INTO product(
        filter_category_idx, main_nutrient_name, product_name, product_cautions, product_package_type, product_company_name,
        product_is_import, product_daily_dose, product_additives, product_standard1, product_standard2, product_standard3,
        product_standard1_value, product_standard2_value, product_standard3_value, product_standard1_description,
        product_standard2_description, product_standard3_description) 
        VALUES(
        ${data.filter_category_idx},
        "${data.main_nutrient_name}",
        "${data.product_name}",
        "${data.product_cautions}",
        ${data.product_package_type},
        "${data.product_company_name}",
        ${data.product_is_import},
        "${data.product_daily_dose}",
        "${data.product_additives}",
        "${data.product_standard1}",
        "${data.product_standard2}",
        "${data.product_standard3}",
        "${data.product_standard1_value}",
        "${data.product_standard2_value}",
        "${data.product_standard3_value}",
        "${data.product_standard1_description}",
        "${data.product_standard2_description}",
        "${data.product_standard3_description}"
        )
        `
    await connection.query(Query1)
    const Query2 = `SELECT product_idx FROM product WHERE product_name = "${data.product_name}" and product_company_name = "${data.product_company_name}"`
    const product_idx = await connection.query(Query2)
    for (const i in data.count) {
      const Query3 = `INSERT INTO product_quantity(product_idx, product_quantity_count, product_quantity_price) VALUES (${product_idx[0].product_idx}, ${data.count[i]}, ${data.price[i]})`
      await connection.query(Query3)
    }
    const Query4 = `INSERT INTO product_detail(product_idx, product_detail_name, product_detail_value) VALUES (${product_idx[0].product_idx}, "${data.product_detail_name}", "${data.product_detail_value}")`
    await connection.query(Query4)
    const Query5 = `SELECT product_detail_idx FROM product_detail WHERE product_idx=${product_idx[0].product_idx}`
    const product_detail_idx = await connection.query(Query5)
    const Query6 = `INSERT INTO product_detail_child(product_detail_idx, product_detail_child_name, product_detail_child_value) VALUES (${product_detail_idx[0].product_detail_idx}, "${data.product_detail_child_name}", "${data.product_detail_child_value}")`
    await connection.query(Query6)
    const Query7 = `INSERT INTO product_features(product_idx, product_features_name) VALUES (${product_idx[0].product_idx}, "${data.product_features_name}")`
    await connection.query(Query7)
    const Query8 = `INSERT INTO image(product_idx, image_key, image_original_name, image_size) VALUES(${product_idx[0].product_idx}, "${data.file.transforms[0].key}", "${data.file.originalname}", "${data.file.transforms[0].size}" )`
    await connection.query(Query8)
  }).catch(error => {
    return next(error)
  })
}


exports.checkParentUserProductDose = (Transaction, req, currentTime, next) => {
  return Transaction(async (connection) => {
    const Query1 = `SELECT dose_history_idx FROM dose d JOIN dose_history dh USING(dose_idx) WHERE d.user_idx =${req.user.user_idx} and dh.dose_history_time = "${currentTime}"`
    const isEmpty = await connection.query(Query1)
    if (!isEmpty[0]) {
      const Query2 = `SELECT dose_idx FROM dose WHERE product_idx= ${req.params.product_idx} and user_idx = ${req.user.user_idx}`
      const dose_idx = await connection.query(Query2)
      const Query3 = `INSERT INTO dose_history(dose_idx, dose_history_time) VALUES(${dose_idx[0].dose_idx}, "${currentTime}");`
      await connection.query(Query3)
      return message.SUCCESS
    }
    return message.DUPLICATED
  }).catch(error => {
    return next(error)
  })
}

exports.checkChildUserProductDose = (Transaction, req, currentTime, next) => {
  return Transaction(async (connection) => {
    const Query1 = `SELECT dose_history_idx FROM dose d JOIN dose_history dh USING(dose_idx) WHERE d.childuser_idx =${req.user.childuser_idx} and dh.dose_history_time = "${currentTime}"`
    const isEmpty = await connection.query(Query1)
    if (!isEmpty[0]) {
      const Query2 = `SELECT dose_idx FROM dose WHERE product_idx= ${req.params.product_idx} and childuser_idx = ${req.user.childuser_idx};`
      const dose_idx = await connection.query(Query2)
      const Query3 = `INSERT INTO dose_history(dose_idx, dose_history_time) VALUES(${dose_idx[0].dose_idx}, "${currentTime}");`
      await connection.query(Query3)
      return message.SUCCESS
    }
    return message.DUPLICATED
  }).catch(error => {
    return next(error)
  })
}

exports.uncheckParentUserProductDose = (Transaction, req, currentTime, next) => {
  return Transaction(async (connection) => {
    const Query1 = `SELECT dose_history_idx FROM dose d JOIN dose_history dh USING(dose_idx) WHERE d.user_idx =${req.user.user_idx} and dh.dose_history_time = "${currentTime}"`
    const dose_history_idx = await connection.query(Query1)
    const Query2 = `DELETE FROM dose_history WHERE dose_history_idx = ${dose_history_idx[0].dose_history_idx}`
    await connection.query(Query2)
    return message.SUCCESS
  }).catch(error => {
    return next(error)
  })
}

exports.uncheckChildUserProductDose = (Transaction, req, currentTime, next) => {
  return Transaction(async (connection) => {
    const Query1 = `SELECT dose_history_idx FROM dose d JOIN dose_history dh USING(dose_idx) WHERE d.childuser_idx =${req.user.childuser_idx} and dh.dose_history_time = "${currentTime}"`
    console.log(req.user.childuser_idx)
    const dose_history_idx = await connection.query(Query1)
    const Query2 = `DELETE FROM dose_history WHERE dose_history_idx = ${dose_history_idx[0].dose_history_idx}`
    await connection.query(Query2)
    return message.SUCCESS
  }).catch(error => {
    return next(error)
  })
}

exports.getProductStandard = (connection, productIdx) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT product_standard1, product_standard2, product_standard3, product_standard1_value, product_standard2_value, product_standard3_value, product_standard1_description, product_standard2_description, product_standard3_description
    FROM product
    WHERE product_idx = ${productIdx}
    `
    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result[0])
    })
  })
}

exports.deleteParentUserDoseProduct = (connection, req) => {
  return new Promise((resolve, reject) => {
    const query = `
    DELETE FROM dose WHERE user_idx = ${req.user.user_idx} and product_idx= ${req.params.product_idx}
    `
    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.deleteChildUserDoseProduct = (connection, req) => {
  return new Promise((resolve, reject) => {
    const query = `
    DELETE FROM dose WHERE childuser_idx = ${req.user.childuser_idx} and product_idx= ${req.params.product_idx}
    `
    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// 제품 상세 정보 가져오기
exports.getProductDetailInfo = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `
    SELECT DISTINCT main_nutrient_name, product_name, product_company_name, product_package_type, product_cautions, product_package_type, product_is_import, product_daily_dose, product_additives, product_standard1, product_standard2, product_standard3, product_standard1_value, product_standard2_value, product_standard3_value, image_key, product_quantity_count, product_quantity_price, product_features_name, product_detail_name, product_detail_value 
    FROM ((( product p1 JOIN image p2 USING(product_idx)) 
    JOIN product_quantity p3 USING(product_idx)) 
    JOIN product_features p4 USING(product_idx)) 
    JOIN product_detail p5 USING(product_idx) 
    WHERE p1.product_idx = "${req.params.product_idx}"
    `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// 최저가 정보 가져오기
exports.getLowprice = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `SELECT product_name FROM product WHERE product_idx ="${req.params.product_idx}"`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.getProductDetailEfficacy = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `
    // SELECT DISTINCT efficacy_name
    // FROM (((efficacy e JOIN nutrient_efficacy ne USING(efficacy_idx))
    // JOIN nutrient n USING(nutrient_idx))
    // JOIN has_nutrient hn USING(nutrient_idx))
    // JOIN product p USING(product_idx) 
    // WHERE product_idx="${req.params.product_idx}"
    // UNION
    SELECT DISTINCT efficacy_name
    FROM ((efficacy e JOIN nutrient_efficacy ne USING(efficacy_idx))
    JOIN nutrient n USING(nutrient_idx))
    JOIN product p ON (p.main_nutrient_name = n.nutrient_name) 
    WHERE product_idx="${req.params.product_idx}"
    `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

exports.getPranetUserTabList = (Transaction, req, currentTime, next) => {
  return Transaction(async (connection) => {
    const result = []
    const Query1 = `SELECT * FROM user_survey WHERE user_idx= ${req.user.user_idx}`
    const user_survey = await connection.query(Query1)
    const Query2 = `SELECT user_idx FROM user_survey where user_survey_item_value1 = "${user_survey[0].user_survey_item_value1}" and user_survey_item_value2 = "${user_survey[0].user_survey_item_value2}" and user_survey_item_value3 = "${user_survey[0].user_survey_item_value3}" and user_survey_item_value4 = "${user_survey[0].user_survey_item_value4}" and user_survey_item_value5 = "${user_survey[0].user_survey_item_value5}" and user_survey_item_value6 = "${user_survey[0].user_survey_item_value6}" and user_survey_item_value7= "${user_survey[0].user_survey_item_value7}";`
    const user_idx_list = await connection.query(Query2)
    user_idx_list.forEach(async (item) => {
      if (item.user_idx !== req.user.user_idx) {
        const Query3 = `select p.main_nutrient_name as tab_name from product p JOIN dose d ON ( d.product_idx = p.product_idx) WHERE d.user_idx = ${item.user_idx};`
        const temp = await connection.query(Query3)
        result.push(temp[0])
      }
    })
    return result
  }).catch(error => {
    return next(error)
  })
}

exports.getChildUserTabList = (Transaction, req, currentTime, next) => {
  return Transaction(async (connection) => {
    const result = []
    const Query1 = `SELECT * FROM user_survey WHERE childuser_idx= ${req.user.childuser_idx}`
    const user_survey = await connection.query(Query1)
    const Query2 = `SELECT childuser_idx FROM user_survey where user_survey_item_value1 = "${user_survey[0].user_survey_item_value1}" and user_survey_item_value2 = "${user_survey[0].user_survey_item_value2}" and user_survey_item_value3 = "${user_survey[0].user_survey_item_value3}" and user_survey_item_value4 = "${user_survey[0].user_survey_item_value4}" and user_survey_item_value5 = "${user_survey[0].user_survey_item_value5}" and user_survey_item_value6 = "${user_survey[0].user_survey_item_value6}" and user_survey_item_value7= "${user_survey[0].user_survey_item_value7}";`
    const childuser_idx_list = await connection.query(Query2)
    childuser_idx_list.forEach(async (item) => {
      if (item.childuser_idx !== req.user.childuser_idx) {
        const Query3 = `select p.main_nutrient_name as tab_name from product p JOIN dose d ON ( d.product_idx = p.product_idx) WHERE d.childuser_idx = ${item.childuser_idx};`
        const temp = await connection.query(Query3)
        result.push(temp[0])
      }
    })
    return result
  }).catch(error => {
    return next(error)
  })
}

// 특정 복용 제품 팝업 메시지
exports.getDoseinfoParentPopup = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const result = []
    const Query1 = ` 
      SELECT product_name, product_daily_dose, image_key, dose_alarm,  dose_initial_count
      FROM (product as p1 
      JOIN image as p2 USING(product_idx))
      RIGHT JOIN dose p3 USING(product_idx)
      WHERE p1.product_idx = "${req.params.product_idx}" AND p3.user_idx="${req.user.user_idx}"
    `
    const queryPush = await connection.query(Query1)
    result.push(queryPush[0])
    const Query2 = 'SELECT count(*) as count FROM dose_history'
    const dose_history_count = await connection.query(Query2)
    result.push({ remain: Number(queryPush[0].dose_initial_count) - Number(dose_history_count[0].count) })
    console.log('success')
    return result
  }).catch(error => {
    return next(error)
  })
}

exports.getDoseinfoChildPopup = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const result = []
    const Query1 = ` 
      SELECT dose_initial_count, product_name, product_daily_dose, image_key, dose_alarm
      FROM (product as p1 
      JOIN image as p2 USING(product_idx))
      RIGHT JOIN dose p3 USING(product_idx)
      WHERE p1.product_idx = "${req.params.product_idx}" AND p3.childuser_idx="${req.user.childuser_idx}"
    `
    const queryPush = await connection.query(Query1)
    result.push(queryPush[0])
    const Query2 = 'SELECT count(*) as count FROM dose_history'
    const dose_history_count = await connection.query(Query2)
    result.push({ remain: Number(queryPush[0].dose_initial_count) - Number(dose_history_count[0].count) })
    console.log('success')
    return result
  }).catch(error => {
    return next(error)
  })
}


exports.getCurrentDoseProducts = (connection, date, userIdx, childIdx) => {
  const Query = `
  SELECT image_key, product_idx, product_name, product_company_name, product_is_import, product_package_type, product_quantity_count, product_quantity_price, COUNT(CASE WHEN dose_history_time='${date}' THEN 1 END) AS product_is_dosed, COUNT(dose_history_time) AS dose_count
  FROM (
    SELECT i.image_key, p.product_idx, p.product_name, p.product_company_name, p.product_is_import, d.dose_idx, p.product_package_type , MIN(pq.product_quantity_count) AS product_quantity_count, MIN(pq.product_quantity_price) AS product_quantity_price
    FROM product p
      JOIN image i
      ON p.product_idx = i.product_idx
      LEFT OUTER JOIN dose d
      ON d.product_idx = p.product_idx
      JOIN product_quantity pq
      ON p.product_idx = pq.product_idx
    WHERE d.${childIdx === undefined ? 'user_idx' : 'child_user_idx'} = ${childIdx === undefined ? userIdx : childIdx}
    GROUP BY p.product_idx
  ) s
  LEFT OUTER JOIN dose_history dh ON dh.dose_idx = s.dose_idx
  GROUP BY product_idx
  `
  return new Promise((resolve, reject) => {

    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

// 제품 상세 그래프 dao
exports.getProductDetailGraph = (Transaction, req, next) => {
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
    const Query11 = `SELECT has_nutrient_amount FROM has_nutrient WHERE product_idx ="${req.params.product_idx}"`
    const data7 = await connection.query(Query11)
    const result = {
      standardArray,
      change,
    }
    return result
  }).catch(error => {
    return next(error)
  })
}
