const jwt = require('jsonwebtoken')


exports.encode = (payload, subject, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, {
      issuer: 'service',
      algorithm: 'HS256',
      expiresIn: 60000 * 60 * 24 * 10 * 10 * 10, // 1000일
      subject,
    }, (err, result) => {
      err && reject(new Error(err))
      resolve(result)
    })
  })
}

exports.decode = (token, secret) => {
  return new Promise((resolve) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log(err)
        resolve({})
      }
      resolve(decoded)
    })
  })
}
