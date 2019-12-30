const request = require('request')
const qs = require('querystring')

const naverConfig = require('../../config/configAll')

/* 네이버 최저가 api*/

const lowestProductInfo = async (str) => {
  let data
  const encodedStr = qs.escape(str)
  const url = naverConfig.NaverURI1
  const queryParams = encodedStr + naverConfig.NaverURI2
  const option = {
    uri: url + queryParams,
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': naverConfig.XNaverClientId,
      'X-Naver-Client-Secret': naverConfig.XNaverClientSecret
    },
  }
  await new Promise(async (resolve, reject) => {
    request(option, (e, response, body) => {
      data = body
      data = JSON.parse(body)
      console.log(data)

      if (e) reject(e)
      else resolve(data)
    })
  })
  return data
}

//lowestProductInfo('뉴트리디데이 프리미엄 오메가 3 골드 1100')
