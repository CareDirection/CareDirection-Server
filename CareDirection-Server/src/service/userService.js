const crypto = require('crypto')
const { Transaction, getConnection } = require('../lib/dbConnection')
const userDao = require('../dao/userDao')
const jwt = require('../lib/token')


// eslint-disable-next-line consistent-return
exports.signUp = async (data) => {
  const connection = await getConnection()

  // crypto
  data.user_salt = Math.round((new Date().valueOf() * Math.random()))
  data.user_pw = crypto.createHash('sha512').update(data.user_pw + data.user_salt).digest('hex')

  try {
    await userDao.signUp(connection, data)
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

// eslint-disable-next-line consistent-return
exports.signIn = async (data) => {
  const connection = await getConnection()
  try {
    const result = await userDao.signIn(connection, data)

    console.log('prev:', data)

    const password = crypto.createHash('sha512').update(data.user_pw + result.user_salt).digest('hex')

    if (result.user_pw === password) {
      console.log('일치:', password)
      return jwt.encode({ user_id: data.user_id })
    }
    return null
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

exports.userList = async (req, next) => {
  try {
    let result
    const userList = await userDao.userList(Transaction, req, next)
    if (userList.child.length === 0) {
      result = {
        parent: {
          user_name: userList.parent[0].user_name,
        },
      }
    } else {
      result = {
        parent: {
          user_name: userList.parent[0].user_name,
        },
        child: [],
      }
    }
    for (const i in userList.child) {
      result.child[i] = {
        chiduser_name: userList.child[i].childuser_name,
        token: await jwt.encode({ childuser_idx: userList.child[i].childuser_idx }),
      }
    }
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}

exports.duplicateId = async (data) => {
  const connection = await getConnection()

  try {
    const result = await userDao.duplicateId(connection, data)
    console.log('d', result[0])

    if (result[0] != null) {
      return false
    }
    return true
  } catch (e) {
    console.log(e.message)
    return e.message
  } finally {
    connection.release()
  }
}

exports.removeMyChild = async (req) => {
  const connection = await getConnection()
  try {
    const result = await userDao.removeMyChild(connection, req)
    return result
  } catch (e) {
    console.log(e.message)
    return e.message
  }
}
