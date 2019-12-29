const aws = require('aws-sdk')
const awsConfig = require('../config/aws_config')

const awsConfig2 = '../config/aws_config.json'
aws.config.loadFromPath(awsConfig2)
const s3 = new aws.S3({
  region: 'ap-northeast-2',
  signatureVersion: 'v4',
})

const getSignedUrl = async (key) => {
  const options = {
    Bucket: awsConfig.bucket,
    Expires: parseInt(awsConfig.Expires),
    Key: key,
    ResponseContentDisposition: null,
  }
  const result2 = await new Promise(async (resolve, reject) => {
    try {
      s3.getSignedUrl(awsConfig.operation, options, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    } catch (e) {
      console.log(e.message)
    }
  })
  return result2
}


const getSignedResizedUrl = async (key) => {
  if (key.substring(0, 14) === 'product/origin') {
    key = `${'product/resize/' + 'resized-'}${key.substr(15, key.length)}`
  } else if (key.substring(0, 19) === 'article/main/origin') {
    key = `${'article/main/resize/' + 'resized-'}${key.substr(20, key.length)}`
  }
  console.log(key)
  // awsConfig.Expires
  const options = {
    Bucket: awsConfig.bucket,
    Expires: parseInt(awsConfig.Expires),
    Key: key,
    ResponseContentDisposition: null,
  }
  const result2 = await new Promise(async (resolve, reject) => {
    try {
      s3.getSignedUrl(awsConfig.operation, options, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    } catch (e) {
      console.log(e.message)
    }
  })
  return await result2
}

module.exports = {
  getSignedUrl,
  getSignedResizedUrl,
}
