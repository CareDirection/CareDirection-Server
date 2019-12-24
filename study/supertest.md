# supertest

```javascript
"devDependencies": {
    "supertest": "version"
} // 테스트 코드 작성을 위해 필요한 라이브러리는 devDependencies에서 관리
```



## supertest란?

API 테스트를 가능하게 해주는 노드 패키지. 테스트환경에서 api테스트를 할 수 있게 해줌. 우리가 만든 익스프레스 서버를 구동한 뒤 HTTP 요청을 보내고 응답받는 구조인데 이 응답을 should로 검증!



## 설치

```javascript
npm --save-dev supertest
```

 --save : npm install 시, 옵션이 지정된 라이브러리 쉽게 설치 가능

-dev : devDependency에 저장



## 실습

Supertest의 실행 함수의 인자로 서버 역할을 하는 익스프레스 객체를 넣어줘야 한다. 따라서 app.js파일에서 우리가 만든 `app` 변수를 외부 노출하여 모듈로 만들어 준다.

```javascript
//...

module.exports = app;
```



> test.spec.js

```javascript
const should = require('should');
const request = require('supertest');
const app = require('../../app');

describe('GET /users', () => {
  it('should return 200 status code', (done) => {
    // ...
  });

  it('should return array', (done) => {
    request(app) // 익스프레스 서버를 슈퍼테스트로 테스트
        .get('/users') //API 요청을 보냄
        .expect('Content-Type', /json/)
        .expect('Content-Length', '17')
        .expect(200)
    		//응답이 오면, 콜백함수 동작
        .end((err, res) => { //요청에 실패하면 err객체, 그렇지 않으면 res.body를 통해 응답바디에 접근
          if (err) throw err;
          res.body.should.be.an.instanceof(Array).and.have.length(3);
          res.body.map(user => {
            user.should.have.properties('id', 'name');
            user.id.should.be.a.Number();
            user.name.should.be.a.String();
         });
         done(); //모카에 it함수가 종료되는 시점을 알림
       });
  });
});
```



## 메소드

함수 체이닝을 이용한다. superagent 라이브러리의 메소드를 포함한 메소드를 이용.

```javascript
describe('GET /user', function() {
 it('responds with json', function(done) {
   request(app)
     .get('/user')
     .auth('username', 'password')
     .set('Accept', 'application/json')
     .expect('Content-Type', /json/)
     .expect(200, done);
 });
});
```

`get/post/put/...`- 인자로 url명시. API 요청을 보냄

`expect()`

.expect(status[, fn])  - 응답 코드 설정

.expect(status, body[, fn]) 

.expect(body[, fn])

.expect(field, value[, fn])

.expect(function(res) {})

`auth()` - HTTP 사용자 이름과 비밀번호를 전달가능

`set()` 

`end(fn)` - 응답이 오면, 콜백함수 동작. fn(err, res) 요청에 실패하면 err객체, 그렇지 않으면 res.body를 통해 응답바디에 접근. 

`done()` - api 서버는 비동기로 동작하게 되어있다. 테스트 완료처리 함수!

