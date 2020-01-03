const request = require('request')
const qs = require('querystring')

const naverConfig = require('../../config/configAll')

/* 네이버 최저가 api */

exports.lowestProductInfo = async (str) => {
  let data
  const encodedStr = qs.escape(str)
  const url = naverConfig.NaverURI1
  const queryParams = encodedStr + naverConfig.NaverURI2
  const option = {
    uri: url + queryParams,
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': naverConfig.XNaverClientId,
      'X-Naver-Client-Secret': naverConfig.XNaverClientSecret,
    },
  }
  await new Promise(async (resolve, reject) => {
    request(option, (e, response, body) => {
      data = body
      data = JSON.parse(body)
      data = data.items
      // console.log(data)

      if (e) reject(e)
      else resolve(data)
    })
  })
  return data
}

// lowestProductInfo('뉴트리디데이 프리미엄 오메가 3 골드 1100')

//
// const inputDatabase = async () => {
//   const data = [
//     {
//       nutrient_name: '오메가3',
//       product_name: '필리 rTG오메가3 영양제 30캡슐 700mg',
//       amount: 0,
//     },
//     {
//       nutrient_name: '오메가3',
//       product_name: '더리얼 알티지 오메가3 맥스1400',
//       amount: 0,
//     },
//     {
//       nutrient_name: '오메가3',
//       product_name: '뉴트리디데이 프리미엄 오메가3 골드 1100',
//       amount: 0,
//     },
//     {
//       nutrient_name: '오메가3',
//       product_name: '비타할로 노르웨이산 오메가 3 플러스',
//       amount: 0,
//     },
//     {
//       nutrient_name: '오메가3',
//       product_name: 'GNM자연의품격 rTG 알티지 오메가3 ',
//       amount: 0,
//     },
//     {
//       nutrient_name: '오메가3',
//       product_name: '홀리데이즈 오메가3 1100 6개월분',
//       amount: 0,
//     },
//     {
//       nutrient_name: '오메가3',
//       product_name: '뉴트리원라이프 알티지 오메가3 1000',
//       amount: 0,
//     },
//     {
//       nutrient_name: '오메가3',
//       product_name: 'GNM자연의품격 오메가3 1200 비타민D',
//       amount: 0,
//     },
//     {
//       nutrient_name: '홍삼',
//       product_name: '정관장 홍삼정 에브리타임 밸런스 30포',
//       amount: 0,
//     },
//     {
//       nutrient_name: '홍삼',
//       product_name: '참다한 홍삼정 프리미엄스틱',
//       amount: 0,
//     },
//     {
//       nutrient_name: '홍삼',
//       product_name: '비단금홍삼액',
//       amount: 0,
//     },
//     {
//       nutrient_name: '홍삼',
//       product_name: '정원삼 6년근 고려홍삼정 365 스틱 100개입',
//       amount: 0,
//     },
//     {
//       nutrient_name: '홍삼',
//       product_name: '한삼인 홍삼정스틱액티브',
//       amount: 0,
//     },
//     {
//       nutrient_name: '홍삼',
//       product_name: '더클래스 6년근 홍삼정 스틱',
//       amount: 0,
//     },
//     {
//       nutrient_name: '홍삼',
//       product_name: '종근당건강 홍삼정애니타임 스틱',
//       amount: 0,
//     },
//     {
//       nutrient_name: '홍삼',
//       product_name: '고려홍삼중앙회 6년근 고려홍삼정 투데이 골드 스틱',
//       amount: 0,
//     },
//     {
//       nutrient_name: '밀크시슬',
//       product_name: 'Now Foods 실리마린 밀크시슬 추출물 300mg 베지 캡슐',
//       amount: 0,
//     },
//     {
//       nutrient_name: '밀크시슬',
//       product_name: '지앤씨 밀크시슬 60정',
//       amount: 0,
//     },
//     {
//       nutrient_name: '밀크시슬',
//       product_name: '종근당건강 헬씨칸 밀크시슬',
//       amount: 0,
//     },
//     {
//       nutrient_name: '밀크시슬',
//       product_name: '뉴트리디데이 프리미엄 밀크시슬 골드 90정',
//       amount: 0,
//     },
//     {
//       nutrient_name: '밀크시슬',
//       product_name: 'GNM자연의품격 건강한 간 밀크시슬',
//       amount: 0,
//     },
//     {
//       nutrient_name: '밀크시슬',
//       product_name: '닥터비 간에좋은 밀크시슬 프리미엄',
//       amount: 0,
//     },
//     {
//       nutrient_name: '밀크시슬',
//       product_name: '홀리데이즈 밀크씨슬 2개월분',
//       amount: 0,
//     },
//     {
//       nutrient_name: '밀크시슬',
//       product_name: '대웅제약 간편한 밀크씨슬',
//       amount: 0,
//     },
//     {
//       nutrient_name: '루테인',
//       product_name: '종근당건강 아이클리어 눈사랑 루테인',
//       amount: 0,
//     },
//     {
//       nutrient_name: '루테인',
//       product_name: 'Doctor\'s Best 루테인 with 옵티루트 10mg 베지캡',
//       amount: 0,
//     },
//     {
//       nutrient_name: '루테인',
//       product_name: '안국건강 New 루테인 미니 100',
//       amount: 0,
//     },
//     {
//       nutrient_name: '루테인',
//       product_name: '나우푸드 루테인 10mg 소프트젤',
//       amount: 0,
//     },
//     {
//       nutrient_name: '루테인',
//       product_name: '루테인 메리골드꽃 눈비타민 눈영양제 수험생 눈건강',
//       amount: 0,
//     },
//     {
//       nutrient_name: '루테인',
//       product_name: '나우푸드 루테인 10mg 소프트젤',
//       amount: 0,
//     },
//     {
//       nutrient_name: '루테인',
//       product_name: '비타할로 루테인 플러스 60캡슐',
//       amount: 0,
//     },
//     {
//       nutrient_name: '루테인',
//       product_name: '뉴트리디데이 프리미엄 루테인 골드 350mg',
//       amount: 0,
//     },
//     {
//       nutrient_name: '종합비타민',
//       product_name: '얼라이브 원스데일리 멀티비타민 60정',
//       amount: 0,
//     },
//     {
//       nutrient_name: '종합비타민',
//       product_name: '종근당건강 원데이21 멀티비타민 앤 미네랄',
//       amount: 0,
//     },
//     {
//       nutrient_name: '종합비타민',
//       product_name: '비타할로 온가족 멀티비타민 플러스 미네랄',
//       amount: 0,
//     },
//     {
//       nutrient_name: '종합비타민',
//       product_name: '종근당건강 슈퍼비젼멀티비타민',
//       amount: 0,
//     },
//     {
//       nutrient_name: '종합비타민',
//       product_name: '솔가 솔로바이트 아이언 프리 종합 비타민',
//       amount: 0,
//     },
//     {
//       nutrient_name: '종합비타민',
//       product_name: '자미에슨 츄어블 멀티비타민 앤 미네랄',
//       amount: 0,
//     },
//     {
//       nutrient_name: '종합비타민',
//       product_name: '비타민하우스 멀티 비타민 웰플러스',
//       amount: 0,
//     },
//     {
//       nutrient_name: '종합비타민',
//       product_name: '홀리데이즈 멀티비타민13 & 미네랄 6 3개월분',
//       amount: 0,
//     },
//     {
//       nutrient_name: '유산균',
//       product_name: '락토핏 생유산균 골드 80p',
//       amount: 0,
//     },
//     {
//       nutrient_name: '유산균',
//       product_name: '세노비스 수퍼바이오틱스 30캡슐 유산균',
//       amount: 0,
//     },
//     {
//       nutrient_name: '유산균',
//       product_name: 'CJ바이오 피부 면역 생유산균 2g x 90포 CJ BYO Probiotics for Skin 90',
//       amount: 0,
//     },
//     {
//       nutrient_name: '유산균',
//       product_name: '내츄럴라이즈 프로 프리 바이오틱스 프롤린 모유 유산균 락토바실러스 가세리 람노서스 17종 생유산균 분말 가루 스틱형',
//       amount: 0,
//     },
//     {
//       nutrient_name: '유산균',
//       product_name: '[Dr. Formulated] 600억 프로바이오틱스 유기 프리바이오틱스',
//       amount: 0,
//     },
//     {
//       nutrient_name: '유산균',
//       product_name: '뉴트리원 프락토올리고당 FOS 3500mg 고함량 프리미엄 프리바이오틱스S',
//       amount: 0,
//     },
//     {
//       nutrient_name: '유산균',
//       product_name: '듀오락 츄어블 패밀리 프로바이오틱스',
//       amount: 0,
//     },
//     {
//       nutrient_name: '유산균',
//       product_name: '뉴트리 가든 프리미엄 프로바이오틱스',
//       amount: 0,
//     },
//   ]
//   for (const i in data) {
//     console.log(i)
//     const option = {
//       uri: 'http://13.124.134.215/product/nutrient/mapping',
//       method: 'POST',
//       form: {
//         product_name: data[i].product_name,
//         nutrient_name: data[i].nutrient_name,
//         amount: data[i].amount,
//       },
//     }
//     console.log(option.form)
//     request(option, (e, response, body) => {
//       console.log(body)
//     })
//   }
// }
// const a = async () => {
//   inputDatabase()
// }
// a()
