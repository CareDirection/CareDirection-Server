### JWT

```javascript
"dependencies": {
    "jsonwebtoken": "version"
}
```



#### JWT 란?

* JWT의 등장

Http는 ConnectionLess이기 때문에, 로그인 등의 사용자 인증 정보를 보관하기 위해서는 세션과 쿠키를 사용하여 정보를 저장해야 한다. 그러나 클라이언트에 개인정보를 저장하는 방식인 `쿠키`는 보안성이 취약하며, 서버에 데이터를 저장하는 `세션` 은 메모리 낭비가 될 수 있다. 이러한 세션과 쿠키의 단점 보완을 위해 JWT가 등장한다. 

* JWT의 개념

JWT이란 JSON Web Token 의 약자로, 서버와 클라이언트간 정보를 주고 받을 때 **보호할 데이터를 토큰으로 치환하여 원본 데이터 대신 토큰을 사용하는 기술**을 말한다. **토큰 자체가 의미를 갖는 Claim 기반의 토큰** 방식이다. 

* JWT의 장점

통신을 할 때 만 생기고,  토큰 전송 과정 중간에 토큰이 탈취 당하더라도 데이터에 대한 정보가 암호화 되어있어 공격자가 본래 내용을 알 수 없기 때문에 보안점이 좋다는 장점이 있다.



#### 구조

![image-20191223152041647](/Users/yangseunghui/Library/Application Support/typora-user-images/image-20191223152041647.png)

`.` 을 구분자로하여 `Header`, ` Payload`,`  Signature` 세 부분으로 구성됩니다. [공식홈페이지](https://jwt.io/) 의 디버거 기능을 이용하면, decoded 부분의 데이터를 변경하면 encoded 의 내용이 실시간으로 바뀌는 모습을 볼 수 있다.

* Header(헤더)

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**alg** 에는 어떤 암호화 알고리즘을 적용 할 것인지, **type** 는 토큰의 타입을 지정합니다. 일반적으로 `HS256` , `RSA` 암호화 알고리즘을 적용합니다.

* Payload(데이터)

  토큰에 담길 정보를 가지고 있다. 

```json
{
  "sub": "12345ssss",
  "name": "John Doe",
  "iat": 1516239022
}
```

* Signature(서명)

Header와 Payload의 데이터 무결성과 변조 방지를 위한 서명으로, Header + Payload 를 합친 후, Secret 키와 함께 Header의 해싱 알고리즘으로 인코딩한다.

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload)
)
```

* 토큰생성!

```javascript
const token = base64urlEncoding(header) + '.' + base64urlEncoding(payload) + '.' + base64urlEncoding(signature)
```



#### jsonwebtoken

* 설치

```
npm install jsonwebtoken
```



#### JWT 메소드

* sign

```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign(payload, 
                       secretOrPrivateKey,
                       [options,
                       function(err,token){
  console.log(token) }//token 생성결과를 받음
                  ])
```

-secretOrPrivateKey : 비밀키는 .gitignore로 숨겨놓을 것이기 때문에, 모듈로 구현합니다.

-options : 토큰에 대한 여러가지 정보를 설정한다. expiresIn-토큰 만료일, issuer-발행자, algorithm-해싱알고리즘 등 토큰에 대한 정보를 담는다. 외에도 options가 더 있다.

```javascript 
const options = {    
  algorithm: "HS256",
  expiresIn: "110230130",
  issuer: "cadi"
};
```

**비동기 함수**이므로 **Promise 처리** 를 해 주어야 한다.  

> 익명함수를 통해 token값을 확인하는 대신, [공식홈페이지](https://jwt.io/) encoded에 생성된 토큰을 넣어서 decode값을 확인하면, token이 제대로 발급되었는지 확인 할 수 있다.



* vertify

```javascript
const jwt = require('jsonwebtoken');
const decoded = jwt.verify(token, 
                           secretOrPrivateKey, 
                           [callback])
// 함수의 세번째 인자로 에러 핸들링을 하는 익명함수를 넣기도 함
```



> jwt.js

```javascript
const randToken = require('rand-token');
const jwt = require('jsonwebtoken');
const { secretOrPrivateKey } = require('../config/secretKey');

// jwt 만들기 위한 옵션. 알고리즘/유효시간/발행자
const options = {
    algorithm: "HS256",
    expiresIn: "110230130",
    issuer: "cadi"
};

module.exports = {

    sign: (email) => {
        const payload = {
            email: email,
        };
        const result = {
            token: jwt.sign(payload, secretOrPrivateKey, options, function(err,token){
              console.log(token);
    }), //jwt에 있는 sign 라이브러리 이용하여 token 생성
            refreshToken: randToken.uid(256)
        };
        return result;
    },
    verify: (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretOrPrivateKey); //유효성 검사
            console.log(decoded)
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return -3;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                return -2;
            } else {
                console.log("invalid token");
                return -2;
            }
        }
        return decoded;
    }
}
```



Reference -

[https://victorydntmd.tistory.com/115](https://victorydntmd.tistory.com/115)

[https://jwt.io/introduction/](https://jwt.io/introduction/)

[https://sanghaklee.tistory.com/47](https://sanghaklee.tistory.com/47)

