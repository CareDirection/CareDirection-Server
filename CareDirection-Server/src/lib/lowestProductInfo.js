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
//       product_name: '더리얼 알티지 오메가3 맥스1400',
//       nutrient_name: '비타민E',
//       amount: 3.6,
//     },
//     {
//       product_name: '뉴트리디데이 프리미엄 오메가3 골드 1100',
//       nutrient_name: '비타민D',
//       amount: 25,
//     },
//     {
//       product_name: '비타할로 노르웨이산 오메가 3 플러스',
//       nutrient_name: '비타민D',
//       amount: 10,
//     },
//     {
//       product_name: '비타할로 노르웨이산 오메가 3 플러스',
//       nutrient_name: '비타민E',
//       amount: 11,
//     },
//     {
//       product_name: 'GNM자연의품격 rTG 알티지 오메가3 ',
//       nutrient_name: '비타민E',
//       amount: 3.3,
//     },
//     {
//       product_name: '홀리데이즈 오메가3 1100 6개월분',
//       nutrient_name: '비타민D',
//       amount: 25,
//     },
//     {
//       product_name: 'GNM자연의품격 오메가3 1200 비타민D',
//       nutrient_name: '비타민D',
//       amount: 25,
//     },
//     {
//       product_name: '솔가 츄어블 비타민 D3 1000IU',
//       nutrient_name: '비타민D',
//       amount: 1000,
//     },
//     {
//       product_name: '솔가 비타민 D3 5000IU 베지터블 캡슐',
//       nutrient_name: '비타민D',
//       amount: 5000,
//     },
//     {
//       product_name: '닥터스베스트 비타민 D3 5000lu 베지 소프트젤',
//       nutrient_name: '비타민D',
//       amount: 5000,
//     },
//     {
//       product_name: '\n나우푸드 비타민D NOW Vitamin D-3 5000 IU 240 Softgels',
//       nutrient_name: '비타민D',
//       amount: 5000,
//     },
//     {
//       product_name: '레인보우라이트 써니 비타민 D3 1000IU 레몬 구미',
//       nutrient_name: '비타민D',
//       amount: 1000,
//     },
//     {
//       product_name: '비타민 D3 5000IU 소프트젤, 360정',
//       nutrient_name: '비타민D',
//       amount: 5000,
//     },
//     {
//       product_name: 'Carlson Labs 칼슨랩 비타민 D3 Vitamin 2000IU 360정',
//       nutrient_name: '비타민D',
//       amount: 2000,
//     },
//     {
//       product_name: '대웅생명과학 비타민D3 2000IU',
//       nutrient_name: '비타민D',
//       amount: 2000,
//     },
//     {
//       product_name: 'MRM 식물성 비타민 D3 5000 IU 60 식물성 캡슐',
//       nutrient_name: '비타민D',
//       amount: 5000,
//     },
//     {
//       product_name: '종근당건강 헬씨칸 밀크시슬',
//       nutrient_name: '비타민B2',
//       amount: 1.5,
//     },
//     {
//       product_name: 'GNM자연의품격 건강한 간 밀크시슬',
//       nutrient_name: '비타민B2',
//       amount: 1.2,
//     },
//     {
//       product_name: '닥터비 간에좋은 밀크시슬 프리미엄',
//       nutrient_name: '비타민B2',
//       amount: 1.4,
//     },
//     {
//       product_name: '닥터비 간에좋은 밀크시슬 프리미엄',
//       nutrient_name: '엽산',
//       amount: 400,
//     },
//     {
//       product_name: '홀리데이즈 밀크씨슬 2개월분',
//       nutrient_name: '비타민A',
//       amount: 480,
//     },
//     {
//       product_name: '홀리데이즈 밀크씨슬 3개월분',
//       nutrient_name: '엽산',
//       amount: 240,
//     },
//     {
//       product_name: '종근당건강 아이클리어 눈사랑 루테인',
//       nutrient_name: '비타민A',
//       amount: 700,
//     },
//     {
//       product_name: '종근당건강 아이클리어 눈사랑 루테인',
//       nutrient_name: '비타민C',
//       amount: 20,
//     },
//     {
//       product_name: '종근당건강 아이클리어 눈사랑 루테인',
//       nutrient_name: '비타민D',
//       amount: 10,
//     },
//     {
//       product_name: '종근당건강 아이클리어 눈사랑 루테인',
//       nutrient_name: '비타민E',
//       amount: 3.3,
//     },
//     {
//       product_name: '루테인 메리골드꽃 눈비타민 눈영양제 수험생 눈건강',
//       nutrient_name: '비타민C',
//       amount: 50,
//     },
//     {
//       product_name: '루테인 메리골드꽃 눈비타민 눈영양제 수험생 눈건강',
//       nutrient_name: '비타민E',
//       amount: 22,
//     },
//     {
//       product_name: '루테인 메리골드꽃 눈비타민 눈영양제 수험생 눈건강',
//       nutrient_name: '셀레늄',
//       amount: 35,
//     },
//     {
//       product_name: '나우푸드 루테인 10mg 소프트젤',
//       nutrient_name: '비타민A',
//       amount: 210,
//     },
//     {
//       product_name: '나우푸드 루테인 11mg 소프트젤',
//       nutrient_name: '비타민B2',
//       amount: 0.42,
//     },
//     {
//       product_name: '나우푸드 루테인 12mg 소프트젤',
//       nutrient_name: '셀레늄',
//       amount: 17,
//     },
//     {
//       product_name: '비타할로 루테인 플러스 60캡슐',
//       nutrient_name: '비타민B2',
//       amount: 0.7,
//     },
//     {
//       product_name: '비타할로 루테인 플러스 61캡슐',
//       nutrient_name: '비타민E',
//       amount: 5.5,
//     },
//     {
//       product_name: '비타할로 루테인 플러스 62캡슐',
//       nutrient_name: '셀레늄',
//       amount: 27.5,
//     },
//     {
//       product_name: '뉴트리디데이 프리미엄 루테인 골드 350mg',
//       nutrient_name: '비타민A',
//       amount: 700,
//     },
//     {
//       product_name: '뉴트리디데이 프리미엄 루테인 골드 351mg',
//       nutrient_name: '비타민E',
//       amount: 5,
//     },
//     {
//       product_name: '얼라이브 원스데일리 멀티비타민 60정',
//       nutrient_name: '비타민A',
//       amount: 555,
//     },
//     {
//       product_name: '얼라이브 원스데일리 멀티비타민 61정',
//       nutrient_name: '비타민B2',
//       amount: 35,
//     },
//     {
//       product_name: '얼라이브 원스데일리 멀티비타민 62정',
//       nutrient_name: '비타민C',
//       amount: 250,
//     },
//     {
//       product_name: '얼라이브 원스데일리 멀티비타민 63정',
//       nutrient_name: '비타민D',
//       amount: 10,
//     },
//     {
//       product_name: '얼라이브 원스데일리 멀티비타민 64정',
//       nutrient_name: '비타민E',
//       amount: 25,
//     },
//     {
//       product_name: '얼라이브 원스데일리 멀티비타민 65정',
//       nutrient_name: '칼슘',
//       amount: 100,
//     },
//     {
//       product_name: '얼라이브 원스데일리 멀티비타민 66정',
//       nutrient_name: '셀레늄',
//       amount: 100,
//     },
//     {
//       product_name: '얼라이브 원스데일리 멀티비타민 67정',
//       nutrient_name: '철분',
//       amount: 15,
//     },
//     {
//       product_name: '얼라이브 원스데일리 멀티비타민 68정',
//       nutrient_name: '엽산',
//       amount: 400,
//     },
//     {
//       product_name: '얼라이브 원스데일리 멀티비타민 69정',
//       nutrient_name: '마그네슘',
//       amount: 75,
//     },
//     {
//       product_name: '종근당건강 원데이21 멀티비타민 앤 미네랄',
//       nutrient_name: '비타민A',
//       amount: 700,
//     },
//     {
//       product_name: '종근당건강 원데이22 멀티비타민 앤 미네랄',
//       nutrient_name: '비타민B2',
//       amount: 1.2,
//     },
//     {
//       product_name: '종근당건강 원데이23 멀티비타민 앤 미네랄',
//       nutrient_name: '비타민C',
//       amount: 100,
//     },
//     {
//       product_name: '종근당건강 원데이24 멀티비타민 앤 미네랄',
//       nutrient_name: '비타민D',
//       amount: 10,
//     },
//     {
//       product_name: '종근당건강 원데이25 멀티비타민 앤 미네랄',
//       nutrient_name: '비타민E',
//       amount: 11,
//     },
//     {
//       product_name: '종근당건강 원데이26 멀티비타민 앤 미네랄',
//       nutrient_name: '셀레늄',
//       amount: 55,
//     },
//     {
//       product_name: '종근당건강 원데이27 멀티비타민 앤 미네랄',
//       nutrient_name: '철분',
//       amount: 12,
//     },
//     {
//       product_name: '종근당건강 원데이28 멀티비타민 앤 미네랄',
//       nutrient_name: '엽산',
//       amount: 600,
//     },
//     {
//       product_name: '비타할로 온가족 멀티비타민 플러스 미네랄',
//       nutrient_name: '비타민A',
//       amount: 490,
//     },
//     {
//       product_name: '비타할로 온가족 멀티비타민 플러스 미네랄',
//       nutrient_name: '비타민B2',
//       amount: 1.1,
//     },
//     {
//       product_name: '비타할로 온가족 멀티비타민 플러스 미네랄',
//       nutrient_name: '비타민C',
//       amount: 80,
//     },
//     {
//       product_name: '비타할로 온가족 멀티비타민 플러스 미네랄',
//       nutrient_name: '비타민D',
//       amount: 8,
//     },
//     {
//       product_name: '비타할로 온가족 멀티비타민 플러스 미네랄',
//       nutrient_name: '비타민E',
//       amount: 4.4,
//     },
//     {
//       product_name: '비타할로 온가족 멀티비타민 플러스 미네랄',
//       nutrient_name: '셀레늄',
//       amount: 11,
//     },
//     {
//       product_name: '비타할로 온가족 멀티비타민 플러스 미네랄',
//       nutrient_name: '엽산',
//       amount: 400,
//     },
//     {
//       product_name: '종근당건강 슈퍼비젼멀티비타민',
//       nutrient_name: '비타민A',
//       amount: 221,
//     },
//     {
//       product_name: '종근당건강 슈퍼비젼멀티비타민',
//       nutrient_name: '비타민B2',
//       amount: 0.42,
//     },
//     {
//       product_name: '종근당건강 슈퍼비젼멀티비타민',
//       nutrient_name: '비타민C',
//       amount: 54,
//     },
//     {
//       product_name: '종근당건강 슈퍼비젼멀티비타민',
//       nutrient_name: '비타민D',
//       amount: 3.22,
//     },
//     {
//       product_name: '종근당건강 슈퍼비젼멀티비타민',
//       nutrient_name: '비타민E',
//       amount: 4.54,
//     },
//     {
//       product_name: '종근당건강 슈퍼비젼멀티비타민',
//       nutrient_name: '엽산',
//       amount: 214,
//     },
//     {
//       product_name: '솔가 솔로바이트 아이언 프리 종합 비타민',
//       nutrient_name: '비타민A',
//       amount: 750,
//     },
//     {
//       product_name: '솔가 솔로바이트 아이언 프리 종합 비타민',
//       nutrient_name: '비타민B2',
//       amount: 25,
//     },
//     {
//       product_name: '솔가 솔로바이트 아이언 프리 종합 비타민',
//       nutrient_name: '비타민C',
//       amount: 150,
//     },
//     {
//       product_name: '솔가 솔로바이트 아이언 프리 종합 비타민',
//       nutrient_name: '비타민D',
//       amount: 10,
//     },
//     {
//       product_name: '솔가 솔로바이트 아이언 프리 종합 비타민',
//       nutrient_name: '비타민E',
//       amount: 124,
//     },
//     {
//       product_name: '자미에슨 츄어블 멀티비타민 앤 미네랄',
//       nutrient_name: '비타민A',
//       amount: 300,
//     },
//     {
//       product_name: '자미에슨 츄어블 멀티비타민 앤 미네랄',
//       nutrient_name: '비타민B2',
//       amount: 1.3,
//     },
//     {
//       product_name: '자미에슨 츄어블 멀티비타민 앤 미네랄',
//       nutrient_name: '비타민C',
//       amount: 80,
//     },
//     {
//       product_name: '자미에슨 츄어블 멀티비타민 앤 미네랄',
//       nutrient_name: '비타민D',
//       amount: 5,
//     },
//     {
//       product_name: '자미에슨 츄어블 멀티비타민 앤 미네랄',
//       nutrient_name: '비타민E',
//       amount: 10,
//     },
//     {
//       product_name: '자미에슨 츄어블 멀티비타민 앤 미네랄',
//       nutrient_name: '철분',
//       amount: 4.75,
//     },
//     {
//       product_name: '자미에슨 츄어블 멀티비타민 앤 미네랄',
//       nutrient_name: '엽산',
//       amount: 3.7,
//     },
//     {
//       product_name: '비타민하우스 멀티 비타민 웰플러스',
//       nutrient_name: '비타민A',
//       amount: 300,
//     },
//     {
//       product_name: '비타민하우스 멀티 비타민 웰플러스',
//       nutrient_name: '비타민C',
//       amount: 35,
//     },
//     {
//       product_name: '비타민하우스 멀티 비타민 웰플러스',
//       nutrient_name: '비타민D',
//       amount: 2.5,
//     },
//     {
//       product_name: '비타민하우스 멀티 비타민 웰플러스',
//       nutrient_name: '비타민E',
//       amount: 3.6,
//     },
//     {
//       product_name: '비타민하우스 멀티 비타민 웰플러스',
//       nutrient_name: '셀레늄',
//       amount: 18.7,
//     },
//     {
//       product_name: '비타민하우스 멀티 비타민 웰플러스',
//       nutrient_name: '엽산',
//       amount: 400,
//     },
//     {
//       product_name: '홀리데이즈 멀티비타민13 & 미네랄 6 3개월분',
//       nutrient_name: '비타민A',
//       amount: 700,
//     },
//     {
//       product_name: '홀리데이즈 멀티비타민13 & 미네랄 6 4개월분',
//       nutrient_name: '비타민B2',
//       amount: 1.4,
//     },
//     {
//       product_name: '홀리데이즈 멀티비타민13 & 미네랄 6 5개월분',
//       nutrient_name: '비타민C',
//       amount: 100,
//     },
//     {
//       product_name: '홀리데이즈 멀티비타민13 & 미네랄 6 6개월분',
//       nutrient_name: '비타민D',
//       amount: 10,
//     },
//     {
//       product_name: '홀리데이즈 멀티비타민13 & 미네랄 6 7개월분',
//       nutrient_name: '비타민E',
//       amount: 11,
//     },
//     {
//       product_name: '홀리데이즈 멀티비타민13 & 미네랄 6 10개월분',
//       nutrient_name: '셀레늄',
//       amount: 55,
//     },
//     {
//       product_name: '홀리데이즈 멀티비타민13 & 미네랄 6 11개월분',
//       nutrient_name: '철분',
//       amount: 12,
//     },
//     {
//       product_name: '홀리데이즈 멀티비타민13 & 미네랄 6 12개월분',
//       nutrient_name: '엽산',
//       amount: 400,
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
//     request(option, (e, response, body) => {
//       console.log(body)
//     })
//   }
// }
// const a = async () => {
//   inputDatabase()
// }
// a()
