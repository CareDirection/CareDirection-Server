# Joi
Hapi에서 검증용도로 사용하는 모듈<br>
입력된 값의 scheme를 사전에 정의하여 값의 유효성을 검사한다.<br>
관계에 따른 내용을 정의할 수 있다는 점이 이점이다.

### installation
```javascript
npm install --save @hapi/joi
```
### joi 사용법
```javascript
const Joi = require('joi');

// validate할 schema 정의
const schema = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
  birthyear: Joi.number().integer().min(1900).max(2018),
});

// validate할 object
const user = {
  username: 'username1',
};

// validate
const {error, value} = Joi.validate(user, schema);
console.log(error); // null
console.log(value); // {username: "username1"}
````
> 입력된 user 가 정의된 schma와 일치하는지를 확인
\
[]()
### .unkown() API<br>
schema 에 정의되지 않은 key는 validation error가 난다.<br> 
이를 피하기위해 `.unknown() API`를 사용해야 된다.
```javascript
const schema2 = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
}).unknown();
```
\
[]()
### abortEalry option<br>
정의된 key 중 에러가 나면 더 이상 진행하지 않는 것이 기본동작이다.<br>
한 번에 모든 에러를 확인하고 싶으면 validate 시점에 동작을 제어할 수 있는 validate 의 세 번째 파라미터로 <i>abortEarly: false</i> 를 설정하면 된다.<br>
```javascript
const { error, value } = Joi.validate(user, schema, options)
````
\
[]()
### 관계 API<br>
.and, .or, .nand, .xor 는 bit 연산과 동일하게 생각하면 된다.<br>
.with, .without 기준 key에 대해서 있어야 되거나 없어야 되는 관계를 설정한다.
```javascript
const schema = Joi.object().keys({
  address1: Joi.string(),
  address2: Joi.string(),
}).with('address1', 'address2');
```

이 외에도 string.creditCard(), string.alpahnum(), string.dataUri() 등 아주 많은 함수들이 있다. 링크 참조.

\
\
\
[]()
## 참고 <br>
[Hapi/ joi_document](https://hapi.dev/family/joi/?v=16.1.8)<br>
[기본 사용법1](http://jeonghwan-kim.github.io/hapijs-joi/)
[기본 사용법2](https://gumpcha.github.io/blog/joi-overview)