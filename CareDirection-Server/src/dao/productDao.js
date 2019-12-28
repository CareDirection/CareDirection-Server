/* sql */
exports.dose = (connection) => {
  return new Promise((resolve, reject) => {
    const Query = `
        //doseDailyQuantity, doseStartDate 저장 date split 하기
        SELECT * FROM users
        `
    connection.query(Query, (err, result) => {
      err && reject(err)
      resolve(result)
    })
  })
}
