exports.insertEfficacy = (connection, req) => {
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

exports.getEfficacyList = (connection) => {
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

exports.getNutrientsListPerEfficacy = (connection, efficacyIdx) => {
  return new Promise((resolve, reject) => {
    const query = `
        SELECT n.nutrient_idx, n.nutrient_name, ne.nutrient_efficacy_comment, i.image_key
        FROM nutrient n
        JOIN nutrient_efficacy ne
        ON n.nutrient_idx = ne.nutrient_idx AND ne.efficacy_idx = ${efficacyIdx}
        LEFT OUTER JOIN image i
        ON ne.nutrient_idx = i.nutrient_idx;
    `
    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
