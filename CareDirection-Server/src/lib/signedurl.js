const aws = require('aws-sdk')
const awsConfig = require('../../config/aws_config')

aws.config.loadFromPath(awsConfig)
const s3 = new aws.S3({
  region: 'ap-northeast-2',
  signatureVersion: 'v4',
})

const getSignedUrl = async (key) => {
  const options = {
    Bucket: awsConfig.bucket,
    Expires: awsConfig.Expires,
    Key: key,
    ResponseContentDisposition: null,
  }
  const result2 = await new Promise(async (resolve, reject) => {
    s3.getSignedUrl(awsConfig.operation, options, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })

  return result2
}

module.exports = {
  getSignedUrl,
}
