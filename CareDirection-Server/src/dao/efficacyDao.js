const insertEfficacy = (connection, req) => {
  return new Promise((resolve, reject) => {
    const { efficacy_name } = req.body
    const query = `
        INSERT INTO efficacy
        VALUES( NULL, "${efficacy_name}")
        `
    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

const getEfficacyList = (connection) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT * FROM efficacy
    `
    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

const getNutrientsListPerEfficacy = (connection, efficacyIdx) => {
  return new Promise((resolve, reject) => {
    const query = `
    SELECT n.nutrient_idx, n.nutrient_name, ne.nutrient_efficacy_comment, i.image_key
    FROM nutrient n
    JOIN nutrient_efficacy ne
    ON n.nutrient_idx = ne.nutrient_idx AND ne.efficacy_idx = ${efficacyIdx}
    LEFT OUTER JOIN image i
    ON ne.nutrient_efficacy_idx = i.nutrient_efficacy_idx;
    `
    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

const getMyEfficacyList = (connection, req) => {
  return new Promise((resolve, reject) => {

    const query = `
        SELECT DISTINCT e.*
    FROM (((( user u JOIN dose d USING (user_idx))
    JOIN product p USING (product_idx))
    JOIN has_nutrient hn USING (product_idx))
    JOIN nutrient n USING (nutrient_idx))
    JOIN nutrient_efficacy ne USING (nutrient_idx)
    JOIN efficacy e USING (efficacy_idx)
    WHERE user_idx = "${req.user.user_idx}"     
    `

    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

const getChildEfficacyList = (connection, req) => {
  return new Promise((resolve, reject) => {

    const query = `
    SELECT DISTINCT e.*
    FROM (((((( childuser cu JOIN user u ON (cu.childuser_idx = u.user_idx))
    jOIN dose d USING (user_idx))
    JOIN product p USING (product_idx))
    JOIN has_nutrient hn USING (product_idx))
    JOIN nutrient n USING (nutrient_idx))
    JOIN nutrient_efficacy ne USING (nutrient_idx))
    JOIN efficacy e USING (efficacy_idx)
    WHERE childuser_idx = "${req.user.childuser_idx}"     
    `

    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

/*/!* sql Transcation *!/
exports.signUp = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const Query1 = `
    SELECT DISTINCT p.main_nutrient_name
    FROM (( user u JOIN dose d USING (user_idx))
    JOIN product p USING (product_idx))
    WHERE user_idx = "${req.user.childuser_idx}"
    `
    await connection.query(Query1)
    const Query2 = `SELECT user_idx FROM USER WHERE user_email = "${req.body.user_email}"`
    const user_idx = await connection.query(Query2)
    console.log('success')
    return user_idx[0]
  }).catch(error => {
    return next(error)
  })
}*/

module.exports = {
  insertEfficacy,
  getEfficacyList,
  getNutrientsListPerEfficacy,
  getMyEfficacyList,
  getChildEfficacyList,
}
