# should 

```js
var should = require('should');
 
var user = {
    name: 'tj',
    pets: ['tobi', 'loki', 'jane', 'bandit']
};
 
user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(4);
```

### includeEql(obj)
> 배열에서 사용할 수 있으면 전달한 obj와 같은 객체가 있는지 검사합니다.
```js
[[1],[2],[3]].should.includeEql([3])
[[1],[2],[3]].should.includeEql([2])
[[1],[2],[3]].should.not.includeEql([4])
```

### include(obj)
> 전달한 obj가 indexOf()로 나타낼 수 있는지 검사합니다. 그래서 문자열과 배열이나 indexOf를 구현한 객체에서 사용할 수 있습니다.
```js
// 배열
[1,2,3].should.include(3)
[1,2,3].should.include(2)
[1,2,3].should.not.include(4)

// 문자열
'foo bar baz'.should.include('foo')
'foo bar baz'.should.include('bar')
'foo bar baz'.should.include('baz')
'foo bar baz'.should.not.include('FOO')
```

### header(field, [value])
> 객체가 headers 프로퍼티가 존재하는지 검사하고 field로 지정한 프로퍼티가 존재하는지 검사합니다. value를 전달하면 field 프로퍼티가 value값인지 검사합니다.
```js
res.should.have.header('content-length');
res.should.have.header('token', 'adjfkljweiofbasldjfkl');
```

### status(code)
> 객체가 statusCode 프로퍼티를 가지고 있는지 검사하고 statusCode 프로퍼티가 code값인지를 검사합니다.
```js
res.should.have.status(200);
```

### ownProperty
> prototype 속성이 아닌 객체 자체가 가진 속성이 존재하는지 검사합니다. 검사는 obj.hasOwnProperty(name)로 수행합니다.
```js
({ foo: 'bar' }).should.have.ownProperty('foo')
```

### property
> property에 첫 파라미터로 전달한 이름의 프로퍼티가 존재하는지 검사하고 두 번째 파라미터를 전달하면 해당 프로퍼티가 두 번재 파라미터 값인지 검사합니다.
```js
user.should.have.property('name')
user.should.have.property('age', 15)
user.should.not.have.property('rawr')
user.should.not.have.property('age', 0)
```

### length
> length 프로퍼티가 존재하는지 검사하고 주어진 숫자값인지를 검사합니다. lengthOf는 length의 별칭입니다.
```js
user.pets.should.have.length(5)
user.pets.should.have.a.lengthOf(5)
```

### match
> 정규표현식의 match 여부를 검사합니다
```js
username.should.match(/^\w+$/)
```

### below
> 주어진 값이 지정한 숫자 값보다 작은 지를 검사합니다.
```js
user.age.should.be.below(100)
user.age.should.not.be.below(5)
```

### above
> 주어진 값이 지정한 숫자 값보다 큰 지를 검사합니다
```js
user.age.should.be.above(5)
user.age.should.not.be.above(100)
```

### instanceof
> instanceof를 검사합니다.
```js
res.body.should.be.an.instanceOf(Object)
```

### a
> 객체의 typeof를 검사합니다.
```js
user.should.be.a('object')
'test'.should.be.a('string')
```

### within
> 숫자의 범위를 포함하는지 검사합니다.
```js
user.age.should.be.within(5, 50)
```

### equal
> strict 하게 동등성을 비교합니다. 비교는 ===로 검사합니다.
```js
should.strictEqual(undefined, value)
should.strictEqual(false, value)
(4).should.equal(4)
'test'.should.equal('test')
[1,2,3].should.not.equal([1,2,3])
```

### eql
> 두 객체가 동등한지 검사합니다. 단순값은 ==로 검사하고 객체일 경우에는 내부 속성을 ===로 검사합니다.
```js
({ foo: 'bar' }).should.eql({ foo: 'bar' })
[1,2,3].should.eql([1,2,3])
```

### empty
> empty는 객체의 length가 0인지 검사합니다.
```js
[].should.be.empty
''.should.be.empty
({ length: 0 }).should.be.empty
```

### true / false
> true와 false는 다음과 같이 사용합니다. 이는 Assert === true나 Assert === false로 검사합니다
```js
true.should.be.true
'1'.should.not.be.true

false.should.be.false
(0).should.not.be.false
```

### and
> 체이닝을 이용하여 좀 더 가독성있고 표현력있게 작성할 수 있습니다.
```js
user.should.be.an.instanceOf(Object).and.have.property('name', 'tj');
user.pets.should.be.instanceof(Array).and.have.lengthOf(4);
```





# 출처 & 참고문서

[should 공식 문서](https://www.npmjs.com/package/should)
[should method 정리 문서](https://blog.outsider.ne.kr/774)

