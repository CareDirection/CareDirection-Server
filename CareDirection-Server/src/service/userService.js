const { Transaction, getConnection } = require('../lib/dbConnection')
const userDao = require('../dao/userDao')
const jwt = require('../lib/token')

exports.signUp = async (next) => {
  // const connection = await getConnection()

  try {
    const result = await userDao.signUp(Transaction, next)
    return result
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
        }
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
