
exports.getMyGraphInfo = (Transaction, req, next) => {
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
