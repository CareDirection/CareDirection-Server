const request = require('request')
const qs = require('querystring')

/* 네이버 최저가 api*/

const lowestProductInfo = async (str) => {
  let data
  const encodedStr = qs.escape(str)
  const url = 'https://openapi.naver.com/v1/search/shop.json'
  const queryParams = `?query=${encodedStr}&display=3&sort=asc`
  const option = {
    uri: url + queryParams,
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': 'BVsw9CzALMdx2sHJUH6q',
      'X-Naver-Client-Secret': 'IGn57uLCYi',
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

// lowestProductInfo('뉴트리디데이 프리미엄 오메가 3 골드 1100')
