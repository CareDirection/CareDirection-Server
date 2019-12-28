// const insertNutrient = (connection, req) => {
//   return new Promise((resolve, reject) => {
//     const params = serializeInsertNutrientParams(req)
//     const query = `
//         INSERT INTO nutrients
//         VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)
//         `
//     connection.query(query, params)
//   })
// }
//
// const serializeInsertNutrientParams = (req) => {
//   const {
//     nutrient_type,
//     nutrient_name,
//     nutrient_recommend_dose,
//     nutrient_max_dose,
//     nutrient_dose_unit,
//     nutrient_common_description,
//     nutrient_default_description,
//   } = req.body
//   return [nutrient_type, nutrient_name, nutrient_recommend_dose, nutrient_max_dose, nutrient_dose_unit, nutrient_common_description, nutrient_default_description]
// }
//


const insertNutrient = (connection, req) => {
  return new Promise((resolve, reject) => {
    const {
      nutrient_type,
      nutrient_name,
      nutrient_recommend_dose,
      nutrient_max_dose,
      nutrient_dose_unit,
      nutrient_common_description,
      nutrient_default_description,
    } = req.body
    const query = `
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
    connection.query(query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}

module.exports = {
  insertNutrient,
}
