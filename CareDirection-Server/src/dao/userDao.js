/* sql */
// exports.singUp = (connection) => {
//     return new Promise((resolve, reject) => {
//         const Query = `
//         SELECT * FROM users
//         `
//         connection.query(Query, (err, result) => {
//             err && reject(err)
//             resolve(result)
//         })
//     })
// }


/* sql Transcation */
exports.signUp = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const Query1 = `INSERT INTO USER(user_id, user_pw, user_nickname) VALUES("${req.body.id}", "${req.body.pw}", "${req.body.nickname}")`
    await connection.query(Query1)
    const Query2 = `SELECT user_idx FROM USER WHERE user_id = "${req.body.id}"`
    const user_idx = await connection.query(Query2)
    console.log('success')
    return user_idx[0]
  }).catch(error => {
    return next(error)
  })
}

/* nosql */
// exports.signIn = async (req) => {
//     const id = req.body.id // req.body는 클라이언트(사용자)가 입력한 데이터를 받아오는 곳 console.log(req.body)찍어보면 클라이언트쪽에서 어떤 데이터를 보냈는지 콘솔로 확인할 수 있어요!
//     const pw = req.body.pw // -> 예전 문법
//     // es6 문법
//     // const { id, pw } = req.body -> 실제 타이핑 수를 줄여주는 문법으로 req.body 하위에 있는 id, pw를 가져오는 동시에 id,pw를 바로 변수명으로 사용가능
//     // async await은 말로 설명해드릴게욤
//     const result = await user.find({
//         user_id: id,
//         user_pw: pw,
//     })
//     return result[0]
// }

exports.userList = (Transaction, req, next) => {
  return Transaction(async (connection) => {
    const Query1 = `SELECT user_name FROM user WHERE user_idx = ${req.user.user_idx};`
    const parent = await connection.query(Query1)
    const Query2 = `SELECT childuser_idx, childuser_name FROM user u JOIN childuser c USING(user_idx) where u.user_idx = ${req.user.user_idx};`
    const child = await connection.query(Query2)
    console.log('success')
    const result = {
      parent,
      child,
    }
    return result
  }).catch(error => {
    return next(error)
  })
}
