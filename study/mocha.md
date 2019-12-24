# Mocha

테스트 러너를 지원하는 테스트 프레임워크<br>
자체 Assertion은 지원하지 않으며, 필요한 Assertion 라이브러리를 가져와서 사용한다.<b>
사용할 Assertion 라이브러리만 `require()` 로 호출한다.<br>
_**Assertion: 에러가 없는 프로그램을 작성하기 위한 하나의 수법_

### installation
```javascript
npm install --save-dev mocha
```
## 기본 사용법
```javascript
const sayHello = require('../app').sayHello;

describe('App test!', function () {
  it('sayHello should return hello', function (done) {
    if (sayHello() === 'hello') {
      done();
    }
  });
});
```
> describe() 는 테스트의 범위를 설정<br>
it() 는 단위 테스트를 설정<br>
done() 는 비동기 단위 테스트를 완료 시킴

\
[]()
### Testing Asynchronous Code
```javascript
const fs = require('fs');

describe('App test1', function () {
  it('async test', function (done) {
    this.timeout(3000);  // 단일 테스트의 제한 시간 설정
    fs.readFile(__filename, done);
  });
});
```
>it()의 콜백 인수로 `done`을 사용하면 자동으로 비동기 테스트를 인식하고, 비동기 로직이 완료 후 done()을 실행하면 테스트가 완료 됨. 제한시간 2초가 경과하면 자동으로 테스트가 실패하게 된다. (제한시간 설정 가능)

\
[]()
### Hooks
```javascript
describe('hooks', function() {
  // 블록 범위 내 모든 테스트 전에 실행
  before(function() { console.log('before hook'); });

  // 블록 범위 내 모든 테스트 후에 실행
  after(function() { console.log('after hook');});

  // 블록 범위 내 각 테스트 직전에 실행
  beforeEach(function() { console.log('beforeEach hook')});

  // 블록 범위 내 각 테스트 직후에 실행
  afterEach(function() { console.log('afterEach hook');});

  it('A test', function () { assert.equal(app.a(), 'A!');});
  it('B test', function () { assert.equal(app.b(), 'B!');});
});

```
> before hook<br>
  beforeEach hook<br>
      ✓ A test<br>
  afterEach hook<br>
  beforeEach hook<br>
      ✓ B test<br>
  afterEach hook<br>
  after hook

\
\
\
[]()
## 참고 <br>
[mocha document](https://mochajs.org/)<br>
[기본 사용법](https://heropy.blog/2018/03/16/mocha/)<br>


