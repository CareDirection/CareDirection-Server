const { getConnection } = require('../lib/dbConnection')
const efficacyDao = require('../dao/efficacyDao')
const { getSignedUrl } = require('../lib/signedurl')

exports.insertEfficacy = async (req) => {
  const connection = await getConnection()
  try {
    efficacyDao.insertEfficacy(connection, req)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
}

exports.getEfficacyList = async () => {
  const connection = await getConnection()
  try {
    return await efficacyDao.getEfficacyList(connection)
  } catch (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
}

exports.getNutrientsListPerEfficacy = async (req) => {
  const efficacyIdx = req.params.efficacy_idx
  const connection = await getConnection()
  try {
    const nutrientList = await efficacyDao.getNutrientsListPerEfficacy(connection, efficacyIdx)

    return await Promise.all(
      nutrientList.map(async (nutrient) => {
        if (nutrient.image_key) {
          nutrient.image_location = await getSignedUrl(nutrient.image_key)
        }
        delete nutrient.image_key
        return nutrient
      }),
    )
  } catch
  (e) {
    console.log(e.message)
  } finally {
    connection.release()
  }
}