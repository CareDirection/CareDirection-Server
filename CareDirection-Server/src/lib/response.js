const _ = require('lodash')

const respondJson = (message, obj, res, status) => {

  console.log(status)
  res
    .status(status)
    .json({
      status,
      message,
      data: _.isEmpty(obj) ? {} : obj,
    })

}

const respondJsonWithoutData = (message, res, status) => {

  console.log(status)
  res
    .status(status)
    .json({
      status,
      message,
    })
}

const respondOnError = (message, res, status) => {
  console.log(status)

  res
    .status(status)
    .json({
      status,
      message,
    })

}

module.exports = {
  respondJson,
  respondJsonWithoutData,
  respondOnError,
}
