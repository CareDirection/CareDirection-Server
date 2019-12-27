const FCM = require('fcm-push')
const serverKey = require('../../config/fcm_config')

const fcm = new FCM(serverKey.serverKey)


const push = (clientToken, notiTitle, notiBody) => {
  const message = {
    to: `/topics/${clientToken}`, // 클라이언트 토큰
    notification: {
      title: notiTitle, // 알림의 제목
      body: notiBody, // 알림의 본문
    },
  }
  fcm.send(message, (err, response) => {
    if (err) {
      console.log('Something has gone wrong!')
      console.log(err)
    } else {
      console.log('Successfully sent with response: ', response)
    }
  })
}

push('caredirection-2fddf', '약 알림', '6시에 오메가3')

module.exports = push
