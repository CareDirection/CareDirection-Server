exports.insertNutrient = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const {
      nutrient_type,
      nutrient_name,
      nutrient_recommend_dose,
      nutrient_max_dose,
      nutrient_dose_unit,
      nutrient_common_description,
      nutrient_default_description,
    } = req.body
    const insertNutrientQuery = `
          INSERT INTO nutrient
          VALUES (
              NULL,
              ${nutrient_type},
             "${nutrient_name}",
              ${nutrient_recommend_dose},
              ${nutrient_max_dose},
             "${nutrient_dose_unit}",
             "${nutrient_common_description}",
             "${nutrient_default_description}")
          `
    await connection.query(insertNutrientQuery)

    const findInsertedNutrientIdxQuery = `
          SELECT nutrient_idx
          FROM nutrient
          WHERE nutrient_name = '${nutrient_name}'
    `
    const nutrientIdxes = await connection.query(findInsertedNutrientIdxQuery)

    const insertNutrientImageQuery = `
          INSERT INTO image(nutrient_idx, image_key, image_original_name, image_size)
          VALUES(
              ${nutrientIdxes[0].nutrient_idx}, 
             "${req.file.transforms[0].key}", 
             "${req.file.originalname}", 
             "${req.file.transforms[0].size}" )
     `
    await connection.query(insertNutrientImageQuery)
  }).catch(error => {
    return next(error)
  })
}

exports.getParentMyFunctioinalNutrients = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const result = []
    const Query1 = `SELECT DISTINCT n.nutrient_idx, n.nutrient_name FROM (((((user u JOIN dose d ON (u.user_idx = d.user_idx)) JOIN product USING(product_idx)) JOIN has_nutrient USING(product_idx)) JOIN nutrient n USING(nutrient_idx)) JOIN nutrient_efficacy USING (nutrient_idx)) JOIN efficacy USING(efficacy_idx) WHERE u.user_idx =  ${req.user.user_idx};`
    const myCareNutrientsList = await connection.query(Query1)
    myCareNutrientsList.forEach(async (nutrient, index) => {
      const Query2 = `SELECT efficacy_name FROM (efficacy e JOIN nutrient_efficacy ne USING(efficacy_idx) ) JOIN nutrient n ON(ne.nutrient_idx = n.nutrient_idx) WHERE n.nutrient_idx=${nutrient.nutrient_idx};`
      result[index] = {
        nutrient: myCareNutrientsList[index].nutrient_name,
        efficacy: await connection.query(Query2),
      }
    })
    return result
  }).catch(error => {
    return next(error)
  })
}

exports.getChildMyFunctioinalNutrients = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const result = []
    const Query1 = `
SELECT DISTINCT n.nutrient_idx, n.nutrient_name FROM (((((childuser u JOIN dose d ON (u.childuser_idx = d.childuser_idx)) JOIN product USING(product_idx)) JOIN has_nutrient USING(product_idx)) JOIN nutrient n USING(nutrient_idx)) JOIN nutrient_efficacy USING (nutrient_idx)) JOIN efficacy USING(efficacy_idx) WHERE u.childuser_idx =  ${req.user.childuser_idx}
`
    const myCareNutrientsList = await connection.query(Query1)
    myCareNutrientsList.forEach(async (nutrient, index) => {
      const Query2 = `SELECT efficacy_name FROM (efficacy e JOIN nutrient_efficacy ne USING(efficacy_idx) ) JOIN nutrient n ON(ne.nutrient_idx = n.nutrient_idx) WHERE n.nutrient_idx=${nutrient.nutrient_idx};`
      result[index] = {
        nutrient: myCareNutrientsList[index].nutrient_name,
        efficacy: await connection.query(Query2),
      }
    })
    return result
  }).catch(error => {
    return next(error)
  })
}

// 특정 성분 정보 가져오기
exports.specificInfo = (connection, req) => {
  return new Promise((resolve, reject) => {
    const Query = `
      SELECT nutrient_common_description, image_key 
      FROM nutrient as p1 INNER JOIN image as p2 USING(nutrient_idx) 
      WHERE p1.nutrient_idx = "${req.params.nutrient_idx}"`
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
