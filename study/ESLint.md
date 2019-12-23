# ESLint

> ES + Lint

2013년도 Nicholas C. Zakas에 의해 만들어진 오픈소스 정적 코드 분석 도구 이다. 코드분석을 통해 특정 컨벤션 규칙들을 지키지 않은 코드들을 찾아 내는 과정을 Linting이라 부른다. 컴파일 언어는 컴파일 과정에 Linter가 내장되어있어 대부분의 IDE에서 컨벤션을 검토해주는 기능을 가지고있다.

하지만 JavaScript는 별도의 컴파일 과정이 없고 인터프리터에서 바로 실행이 되기 때문에 이러한 Linter가 없을뿐더러 Linting 과정을 수행하지 않아 컨벤션 검토를 컴퓨터가 해주지 않는다.

이러한 문제를 해결하기위해 나온 것이 ESLint이다. JavaScript를 직접 실행하지 않고 문제를 해결 할 수 있게 만들어준다. 반드시 지켜야할 컨벤션들 뿐만 아니라 팀 내에서 정한 컨벤션 까지 커스텀하여 등록할 수 있기 때문에 확장성과 활용도가 매우 높다.

### ES란? 

> EcmaScript를 의미한다.

Ecma International은 정보 통신에 대한 표준을 제정하는 비영리 표준화 기구이다. 대표적인 표준은 qwerty 키보드 레이아웃을 예로 들 수 있다.

<b>EcmaScript</b>는 Ecma International에 의해 제정된 ECMA-262 기술 규격에 의해 정의된 범용 스트립트 언어이다. 

<b>JavaScript</b>는 <b>EcmaScript</b> 사양을 준수하는 범용 스크립팅 언어이다.

### 그래서 왜 ESLint ?

> 기술규격인 Ecma를 준수하는 것이 확장성을 위해 좋기 때문 !



## WebStorm에 ESLint 적용

> WebStorm에는 이미 ESLint가 내장되어있다...!! (1시간반 동안 인스톨 자료 모두 다른거 보다가 찾아냄...)

















# 출처 & 참고문서

[ESLint Wiki](https://en.wikipedia.org/wiki/ESLint)

[JavaScript Vs EcmaScript](https://wormwlrm.github.io/2018/10/03/What-is-the-difference-between-javascript-and-ecmascript.html)

[WebStorm에 ESLint적용 공식문서](https://www.jetbrains.com/help/webstorm/eslint.html)