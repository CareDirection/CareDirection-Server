/* sql Transcation */
exports.dose = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    // 복용제품 등록 user_idx product_idx 받고,
    // product_idx로 product -> product_quantity 테이블로가서 product_quantity 가져와서 dose_initial_count에 저장
    console.log('user_idx: ')
    console.log(req.user.user_idx)

    const Query0 = `SELECT p2.product_quantity_count FROM product as p1 INNER JOIN product_quantity as p2 WHERE product_idx = "${req.body.product_idx}"`
    const dose_initial_count = await connection.query(Query0)
    const Query1 = `INSERT INTO dose(product_idx, user_idx, dose_daily_quantity, dose_initial_count, dose_start_date) 
                    VALUES("${req.params.product_idx}", "${req.user.user_idx}", "${req.body.dose_daily_quantity}", "${dose_initial_count}", "${req.body.dose_start_date}")`
    await connection.query(Query1)
    const Query2 = `SELECT dose_idx FROM dose WHERE product_idx = "${req.body.product_idx}"`
    const dose_idx = await connection.query(Query2)
    console.log('success')
    return dose_idx[0]
  }).catch(error => {
    return next(error)
  })
}

