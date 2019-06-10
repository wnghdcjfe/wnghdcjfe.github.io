---
layout: post
title: '내가 사랑하는 함수형프로그래밍'
author: kundol
comments: true
date: 2019-05-20 07:00
tags: [web, 함수형프로그래밍, 자바스크립트]

---   
# 함수형 프로그래밍
함수형프로그래밍은 작은 순수함수들의 집합으로 최소의 부수효과를 누리는 패러다임입니다.

좀 더 자세히 말하자면 함수들을 작게 쪼개서 블록을 쌓듯이 로직을 구현하고 다형성을 높이고 고차함수를 활용하여 재사용성을 높이고 참조투명성을 통해 부수효과가 줄어들어 유지보수성을 증대시키는 함수형 프로그래밍에 대해서 알아보겠습니다. 함수형프로그래밍을 하면 단순하고 간결한 흐름 중심의 모델이 되고 서술부와 평가부가 분리되어 지연평가가 가능합니다.   
 
 > 다형성, 어떠한 인자든 가능한 것을 말한다. 
 
 > 참조투명성: 함수의 출력은 오로지 그 함수에 입력된 값에만 의존성을 가진다는 의미
 
 > 추상화를 높이다. : 다형성을 증가시켜 특정 데이터형에서 분리한다는 것


함수형 프로그래밍에는 여러가지 특징들이 있습니다. 그 특징들을 살펴보겠습니다.  

## 1. 순수함수와 참조 투명성 
순수함수란 동일한 입력을 받아서 동일한 출력을 하는 것을 말합니다. 참조투명성의 성질을 가지고 있죠.  
위의 `PURE`는 순수함수고 아래 `not_PURE`는 순수함수가 아닙니다. 
```js
const PURE = (a, b)=>{
    return a + b; 
} 
const not_PURE = (a)=>{
    return a += 10;  
}
```
외부의 인자를 변화시키지 않고 값이 일정해야 합니다. 10을 더하는 함수지만 외부의 a의 값을 증가시켜서 부수효과가 생기게 했습니다. 
이는 순수함수가 아닙니다.  

즉, 외부의 인자를 변화시키지 않고 최대한 지역변수만을 써서 구현해야 합니다. 그리고 인수로 넘기는 값의 본체조차 수정되면 안됩니다. 
함수인수로 넘길 때 객체에 변이를 일으키지 않도록 주의를 하며 deep copy를 한 후 변이를 하던가 등의 방법을 써야 합니다. 또한 외부변수에 종속되지 않고, 동일한 입력을 받았을 때 동일한 결과를 내는 참조 투명한 함수를 써야 합니다. 
```js
var c = 0;
//받은 인자자체가 변함
function f(){
  return c++;
}
//인자를 변화시키지 않고 +1을 할 수 있다.
const f = c => c + 1
```
이렇게 인자를 변화시키지 않아야 합니다. 

## 2. 고차함수
함수가 다른 함수를 인자로 받아서 어떠한 로직을 생성하는 함수를 말합니다.  
이렇게 함수를 값자체로 넘길 수 있는 **일급객체**여야만 함수형 프로그래밍이 가능합니다. (고계함수 = 고차함수 입니다.)
### 2.1 map
map은 함수 a를 받는 고차함수입니다. 
```js
const a = (a)=>{
    return a + 10; 
}
const b = [1, 2, 3].map(a)
console.log(b)
```

**일급객체**란 함수를 변수에 담을 수 있고 함수나 메서드의 인자로 넘길 수 있으며 함수나 메서드에서 리턴을 할 수 있는 것을 말합니다. 
그리고 자바스크립트의 함수는 일급함수입니다. 일급함수란 아무때나 선언이 가능하고 익명으로 선언이 가능하고 익명으로 선언한 함수도 함수나 메서드의 인자로 넘길 수 있어서 아래처럼 함수를 자유자재로 놓을 수 있습니다. 

### 2.2 함수를 실행하여 리턴하는 `_call` 
```js
const _call = (a, b) => a() + b() 
```

### 2.3 함수를 리턴하는 함수 
이렇게 함수를 안에서 다시 리턴해서 실행시점을 지연시킬 수 있습니다.  
```js
//ES6
const a = val => () => val; 
//ES5
function a(val) {
  return function() {
    return val;
  }
}

var a_lazy = a(12010);
a_lazy();
// 12010 
```


## 3. 커링
여러개의 파라미터 보다 적은 수의 파라미터를 받아 누락된 파라미터를 인자로 받습니다.  
그러다가 인자가 다 채워지면 함수를 실행하게 됩니다. 커링의 원리는 클로저의 도움을 받는 것으로 이루어집니다. 
내부함수가 외부함수의 컨텍스트가 소멸이 되도 외부함수의 실행환경, 즉, 인자를 참조하면서 실행시점을 기다리게 됩니다. (평가를 미룬다고도 합니다.)
1. 파라미터가 클로저로 잡아져있다 라고 생각하시면 쉽습니다. 
2. 클로저라는 공간을 만들어서 그 안에서 내부함수를 return한다라고 생각하시면 쉽습니다. 

메모이제이션을 할 때도 효과적이며 `Point-free`로 로직을 구현하는데도 효과적입니다.


### 3.1 ramda를 이용한 예
FP를 도와주는 Ramda를 이용한 예입니다. 마지막 파라미터를 skip하고 sum을 만들 수 있으며 add의 경우 나중에 2를 추가할 때 함수를 평가하게 하여 3이 되게 합니다. 
```js
const R = require('ramda')
const add = (a, b)=> (a + b); 
const total = R.reduce(add, 0)
const sum = total([1, 2, 3, 4, 5]) 
console.log(sum)
R.add(1)(2)
``` 

### 3.2 ramda를 이용한 예
아래처럼 순차적으로 인자를 넘겨줘도 커링이 됩니다. 
즉 인자를 완전히 채우지 않아 실행시점을 미루다가 인자를 완전히 채웠을 때 실행이 되는 것이 바로 커링입니다.
```js
const addFourNumbers = (a, b, c, d) => a + b + c + d;

const curriedAddFourNumbers = R.curry(addFourNumbers);
const f = curriedAddFourNumbers(1, 2);
const g = f(3);
g(4); //=> 10 
```

그렇다면 커링을 한번 만들어보겠습니다. 
```js
const k_curry = fn => a => b => fn(a, b); 
const f = k_curry((a, b) => a + b); 
const f_c = f(1)
const ret = f_c(2);
console.log(ret)
```
`k_curry`, 2개의 인자를 받을 수 있는 커리를 만들었고 그 커리로 `f`를 래핑, 감싸줍니다. 이제 f는 커링이 가능한 **더하기함수**가 됩니다. 
저런식으로 평가시점을 늦출 수 있습니다. ES6버전은 위와 같고 ES5버전은 다음과 같습니다. 

```js
var k_curry = function(fn){
    return function(a){
        return function(b){
            return fn(a, b);
        }
    }
}
var f = k_curry(function(a, b){
    return a + b
}); 
var f_c = f(1)
var ret = f_c(2);
console.log(ret)
``` 

또한 커링을 하게 되면 코드가 간결해집니다. 커링을 한다는 것은 `f(a)(b)`이런식으로 인자를 넣는다는 것인데 이를 이용하면 파이프라인에서 조금 더 간결해집니다. 간결해진다는 것은 조금 더 깔끔해진다는 것이며 깔끔이라는 것은 조금 더 표현력이 증가한다는 것을 뜻합니다. 
```js
//커링 적용전
pipe(
  a => a + 1, 
  a => filter(a => a % 2, a) 
)
//커링 적용 후 - filter에 적용을 하였다. 첫번째 함수의 결과값이 filter라는 함수로 전달되었다. 
pipe(
  a => a + 1, 
  filter(a => a % 2) 
) 
```

참고로 `fx.js`의 커리는 이런식으로 구현되어있습니다. 
`..._`로 **남은**인자를 받아서 만약에 남은 인자가 없다면 함수를 실행합니다. 
즉, 인자가 **완성** 되었다면 실행하게끔 되어있습니다. 
```js
export const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
```
 


## 4. 함수 합성
합성시키는 것은 compose와 pipe가 있는데 R.compose는 오른쪽에서 왼쪽으로 로직이 흘러간다면  
```js
const R = require('ramda') 
R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
```
pipe는 왼쪽에서 오른쪽으로 흘러가며 `point-free` 형으로 짤 수가 있습니다. 보통 저는 `pipe`를 씁니다.

절차지향형에 익숙한 방법이며 이 방법을 point-free방법이라고 합니다. 
```js
const f = R.pipe(Math.pow, R.negate, R.inc); 
f(3, 4); // -(3^4) + 1
```

## 5. 파괴적인 함수를 쓰지 않습니다. 

splice는 배열을 파괴합니다. 
하지만 slice는 파괴를 하지 않고 1을 제외한 나머지 배열 요소들을 추출해낼 수 있습니다. 
되도록 payload를 파괴하지 않는 함수를 써야 합니다. 
```js
const a = [1, 2, 3, 4, 5]  
let b = a.slice(1)
console.log(a, b)  
b = a.splice(1)
console.log(a, b)
/*
[ 1, 2, 3, 4, 5 ] [ 2, 3, 4, 5 ]
[ 1 ] [ 2, 3, 4, 5 ]
*/
```   
## 6. Point -free

무인수 프로그래밍입니다. 인자를 신경쓰지 않고 구현하는 것을 뜻합니다. 
커링을 통해 구현할 수 있습니다.

```js
const map = fn => list => list.map(fn); 
const add = x => y => x + y; 
const incrementAll = numbers => map(add(1))(numbers);
/* function with point-free */
const incrementAllWithPointFree = map(add(1));
var a = incrementAll([1, 2, 3]); // [2, 3, 4]
var b = incrementAllWithPointFree([1, 2, 3]); // [2, 3, 4]
console.log(a, b)
```

## 7. 모나드
어떠한 값의 결과가 불확실하게 2가지형태 이상으로 나타날 수 있습니다. 이럴 때 컨테이너로 래핑하여 안전하게 연산을 하는 것을 말합니다. 함수형프로그래밍에서는 참조투명성, 입력과 출력이 동일하게 1 : 1 매칭이 되어야 하기 때문에 `try catch`를 쓰게 되면 로직을 담고 있는 컨테이너의 벨트의 라인이 2개로 분리되어 투명성을 잃게 되기 때문입니다. (물론 `try catch`를 써서 애러처리를 할 수도 있습니다. 하지만 함수형 프로그래밍에서는 컨테이너라는 안전한 박스에 담아 실행을 하는게 좋다는 것이죠. ) 

`ramda-fantasy`의 `Either`라는 컨테이너박스에 담아서 
1. Right메소드로 성공처리로직을 
2. Left메소드로 애러처리로직을 구현해도 되고 Promise를 이용해도 됩니다. 

Promise 는 future Monad라고 합니다. 이런 형태의 값이라는 것을 설정해 놓고 비동기적인 상황에서 성공과 실패를 값으로 다루는 하나의 컨테이너 박스입니다. 콜백으로 넘기는 방식은 컨텍스트를 넘겨서 로직을 수행하고 Promise는 그것들을 하나의 "값"으로 받아서 로직을 수행합니다.

 > 콜백 : 어떤 함수가 어떠한 시점에서 다시 호출 되는 것

### 7.1 Promise를 이용한 예
```js
const g = JSON.parse;
const f = k => k.temp; 
const fg = x => new Promise((resolve, reject)=> resolve(x)).then(g).then(f)
const log = x => console.log(x)

fg('{"temp":36.5}').catch(_ => 'JSON PARSE is not working').then(log)
``` 

### 7.2 Promise를 이용한 예
```js
const log = console.log
const users = [{name : '큰돌'}, {name : '제호'}, {name : '우람'}, {name : '다빈'}] 
const getUserByName = (name) => users.find(u => u.name === name) || Promise.reject("객체에 없습니다.")
const g = getUserByName;
const f = ({name}) => `${name}이가 춤을 춥니다.`
const fg = x => new Promise((resolve, reject)=> resolve(x)).then(g).then(f) 
fg("큰돌1").catch(_ => _).then(log)
//객체에 없습니다.

fg("큰돌").catch(_ => _).then(log)
// 큰돌이가 춤을 춥니다.

/*
큰돌이가 춤을 춥니다.
객체에 없습니다.
*/
```

## 8. 제너레이터와 이터레이터
제너레이터를 써서 순차적으로 구현과 지연효과를 쉽게할 수 있습니다. 
```js
function *map(f, list){
    for(const a of list){
        yield f(a)
    }
}
``` 

또한 제너레이터는 **이터레이터**를 손쉽게 만들 수 있으며 **코루틴**이 가능합니다.
### 8.1 제너레이터의 코루틴
1. yeild문이 발동하면 스택프레임에 복사를 하고 콜스택에서는 제거를 합니다.
2. 그리고 next()문이 발동하면 스택프레임을 복원하여 실행해서 진입점을 개발자가 원하는 데로 실행이 가능하게 설계할 수 있습니다. 
 
 > 코루틴 : 진입점을 개발자가 원하는 데로 실행이 가능하게 설계하는 것 

이 코루틴 덕에 이터레이러를 이용해서 **지연평가**라는 것이 가능합니다.

 > 지연평가를 하면 range함수를 만드는데서 성능에서의 장점 로직구현이 좀 더 효율적이게 됩니다. 왜냐하면 파이프라인에서 제너레이터로 연결된 함수들이 합쳐지는 듯한 효과를 내기 때문입니다. 
 
### 8.2 이터러블/이터레이터 프로토콜
 - 이터러블: 이터레이터를 리턴하는 `[Symbol.iterator]()`라는  키를 가진 값이자 반복할 수 있는 순차적인 객체
 - 이터레이터: `{ value, done }` 객체를 리턴하는 `next()` 를 가진 값
 - 이터러블/이터레이터 프로토콜: 이터러블을 `for...of`, `전개 연산자` 등과 함께 동작하도록한 규약

 > ... 전개연산자는 적용되는 공간에서의 인수들(배열, key-value)에 따라 그 공간에 맞는 인수 또는 요소로 확장할 수 있게 합니다. 전개연산자는 이렇게 활용할 수도 있습니다. const [head, ...tail] = f();

### 8.3 제너레이터와 이터러블
제너레이터는 커스텀형 이터레이터로 함수자체가 이터러블을 생성합니다.

이 제너레이터는 return값을 가질 수있습니다. 그러나 순회할 때 대상에는 포함이 안됩니다. `next()`메서드로 계속해서 호출하면 `{value : 100, done : true}`를 반환되게 하는 종결값으로 됩니다.    
```js
const log  a => console.log(a)
function* gen() {
    yield 10;
    if (false) yield 20;
    yield 30;
    return 90; 
}
let iter = gen();
//아래 두방법으로 순회가 가능합니다. 둘다 Symbol.iterator를 통해 순회합니다. 
log([...iter]); 
for (const a of iter) {
    log(a);
} 
```

return을 넣었기 때문에 value와 done을 보면 됩니다. 
```js
const log = a => console.log(a)
function* gen() {
    yield 10;
    if (false) yield 20;
    yield 30;
    return 90; 
}
let iter = gen();
//log([...iter]); 
log(iter.next())
log(iter.next()) 
log(iter.next()) 
/*
{ value: 10, done: false }
{ value: 30, done: false }
{ value: 90, done: true }
*/
```

### 8.4 객체로 만드는 제너레이터 
`[Symbol.iterator]()`라는 키를 넣어서 이터러블한 객체를 커스텀하게 만들 수 있습니다.
```js
var myIterable = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}
``` 

### 9. 클로저 
클로저는 독특한 함수체제를 멋지게 활용할 수 있습니다. 
 - 프라이빗 변수를 모방 
 - 가상의 블록 스코프 변수를 생성  

 > 클로저 : 외부함수의 실행컨텍스트가 소멸해도 `[[scope]]`프로퍼티가 가리키는 **외부함수의 실행환경은 소멸하지 않고 참조할 수 있는 것을 말합니다.** 스코프체인이 형성될 때 `[[scope]]`로 참조할 수 있는데 이를 이용해 참조할 수 있는 것을 말합니다.

### 9.1 클로저의 예
```js
var test = (function(){
    var count = 0; 
    return {
        increase: function(){
            count++;
        },
        decrease: function(){
            count--;
        },
        getValue: function(){
            console.log(count);
        }
    }  
})();
test.increase();
test.increase();
test.increase();
test.getValue();

var add = (function () {
    var counter = 0;
    return function () {
        counter += 1; 
        console.log(counter) 
    }
})();

add();
add();
add(); //1 2 3

//D3js에서의 예
function center(scale) {
  var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
  if (scale.round()) offset = Math.round(offset);
  return function(d) {
    return +scale(d) + offset;
  };
}
``` 

이렇게 private 변수를 흉내내는 것 말고 어떤 시점에서의 시점을 이어가는 데도 쓰입니다. 

## 그 외 응용예제  

### 1. 배열안에서의 비동기 순서로직
아래를 그저 map이라는 함수를 써서 하면 순차적인 비동기 로직이 아니라 pending 6개가 찍혔다가 동시에 실행이 될 것입니다.
유인동이라는 개발자님이 만든 `partial.js`라는 라이브러리를 사용해보는 것이 어떨까요? 쉽게 비동기 순서 로직을 짤 수 있습니다.
```js
var _ = require('partial-js');
const delay = (val)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(val)
        }, 1000); 
    })
}
async function test3() {
  var list = [1, 3, 5, 6, 7, 9];
  console.log(list)
  return _.map(list, async function(val, i) {
    console.log(val, i); // 1초씩 순차적으로 실행됨
    return await delay(val * 10); // 1초씩 순차적으로 실행되고 정상적으로 결과를 꺼냄
  });
} 
test3().then(function(result) {
  console.log(result);
  // [10, 30, 50, 60, 70, 90]
});
``` 

#### 2. reduce를 통한 집계
이외에도 reduce를 통해 함수형 프로그래밍을 통하면 쉽게 집계된 데이타를 뽑아낼 수 있습니다. 
```js
const _ = require('lodash') 
var users = [
    { id: 1, name: "ID", age: 32 },
    { id: 2, name: "HA", age: 25 },
    { id: 3, name: "BJ", age: 32 },
    { id: 4, name: "PJ", age: 28 },
    { id: 5, name: "JE", age: 27 },
    { id: 6, name: "JM", age: 32 },
    { id: 7, name: "HI", age: 24 }
  ];

const a = _.reduce(users, function(info, user) {
    var group = user.age - user.age % 10;
    info.count[group] = (info.count[group] || 0) + 1;
    info.total[group] = (info.total[group] || 0) + user.age;
    return info;
  }, { count: {}, total: {} }); 

console.log(a)

```

## fx 예제
 - 추후 따로 올릴 예정입니다.

## 주요 함수형 라이브러리 메소드  
 - `plunk(a), 'b')` :  a 라는 객체의 b라는 key값에 해당하는 value를 추출한다.  

 - 참고 :[yocee57의 함수형프로그래밍](https://medium.com/korbit-engineering/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%B4%EB%9E%80-e7f7b052411f)
 - 참고 :[유인동의 함수형프로그래밍](https://www.inflearn.com/course/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D/#)

 > 태그 : 함수형 프로그래밍, lodash, fxjs, partialjs