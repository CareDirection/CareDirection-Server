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

module.exports = {
  insertEfficacy,
  getEfficacyList,
}
