const aws = require('aws-sdk')

const awsConfig = '../config/aws_config.json'

aws.config.loadFromPath(awsConfig)
const s3 = new aws.S3({
  region: 'ap-northeast-2',
  signatureVersion: 'v4',
})

const getSignedUrl = async (key) => {
  const options = {
    Bucket: 'care-direction',
    Expires: 3000,
    Key: key,
    ResponseContentDisposition: null,
  }
  const result2 = await new Promise(async (resolve, reject) => {
    try {
      s3.getSignedUrl('getObject', options, (err, result) => {
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
    Bucket: 'care-direction',
    Expires: 3000,
    Key: key,
    ResponseContentDisposition: null,
  }
  const result2 = await new Promise(async (resolve, reject) => {
    try {
      s3.getSignedUrl('getObject', options, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    } catch (e) {
      console.log(e.message)
    }
  })
  return result2
}

module.exports = {
  getSignedUrl,
  getSignedResizedUrl,
}
