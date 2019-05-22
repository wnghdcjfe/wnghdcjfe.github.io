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
다른 함수를 인자로 사용하고 어떠한 데이터 유형에 작동할 수 있는 유틸리티를 생성할 수 있습니다.
이렇게 함수를 값자체로 넘길 수 있는 일급객체여야만 함수형 프로그래밍이 가능합니다. (고계함수 = 고차함수 입니다.)
```js
const a = (a)=>{
    return a + 10; 
}
const b = [1, 2, 3].map(a)
console.log(b)
```
일급객체란 함수를 변수에 담을 수 있고 함수나 메서드의 인자로 넘길 수 있으며 함수나 메서드에서 리턴을 할 수 있는 것을 말합니다. 

그리고 자바스크립트의 함수는 일급함수라서 더 함수형 프로그래밍이 쉽습니다. 일급함수란 아무때나 선언이 가능하고 익명으로 선언이 가능하고 익명으로 선언한 함수도 함수나 메서드의 인자로 넘길 수 있다는 점입니다.

함수를 실행하여 리턴하는 `_call`이란 함수
```js
const _call = (a, b) => a() + b() 
```

함수를 리턴하는 함수
```js
const a = val => () => val; 
//위와 아래는 같다. 
function a(val) {
  return function() {
    return val;
  }
}

var mv = a(12010);

mv();
// 12010 
```
위처럼 하게 되면 함수의 실행을 지연시킬 수 있다.


## 3. 커링
여러개의 파라미터 보다 적은 수의 파라미터를 받아 누락된 파라미터를 인자로 받습니다.  

메모이제이션을 할 때도 효과적이며  Point-free로 로직을 구현하는데도 효과적입니다.

FP를 도와주는 Ramda를 이용한 예입니다. 마지막 파라미터를 skip하고 sum을 만들 수 있으며 add의 경우 나중에 2를 추가할 때 함수를 평가하게 하여 3이 되게 합니다. 
```js
const R = require('ramda')
const add = (a, b)=> (a + b); 
const total = R.reduce(add, 0)
const sum = total([1, 2, 3, 4, 5]) 
console.log(sum)
R.add(1)(2)
``` 

아래처럼 순차적으로 인자를 넘겨줘도 커링이 됩니다. 즉 인자를 완전히 채우지 않아 실행시점을 미루다가 인자를 완전히 채웠을 때 실행이 되는 것이 바로 커링입니다.
```js
const addFourNumbers = (a, b, c, d) => a + b + c + d;

const curriedAddFourNumbers = R.curry(addFourNumbers);
const f = curriedAddFourNumbers(1, 2);
const g = f(3);
g(4); //=> 10
```


커링을 이렇게 만들어서 응용할 수 있습니다. 
```js
const log = a => console.log(a)
const curry = f => (a, ...bs) =>{ 
    return bs.length ? f(a, ...bs) : (...bs) => f(a, ...bs);
}
     
const filter = curry(function* (f, iter) {
    for (const a of iter)if (f(a)) yield a;
});
const map = curry(function* (f, iter) {
    for (const a of iter) yield f(a);
});
const take = curry(function* (length, iter) {
    for (const a of iter) {
        yield a;
        if (--length == 0) break;
    }
});
const reduce = curry(function (f, acc, iter) { 
    if (!iter) { 
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
}); 
function f(list, length) {
    log(
        reduce((a, b) => a + b,
            take(length,
                map(a => a * a,
                    filter(a => a % 2, list)))))
}
f([1, 2, 3], 3);
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
```   
## 6. Point -free

무인수 프로그래밍 이라고 합니다. 유닉스철학의 사상이 반영되었습니다.

화살표함수조차 쓰면 안됩니다. 이렇게 함수안에 함수만을 넣어서 해결합니다. 이렇게 pipe를 써서 할 수 있습니다.

list processing이라고도 합니다. 
```js
const R = require("ramda") 
const inc = a => a + 1;  
const transform = R.pipe(R.map(inc), R.sum)
//trasform 부분이 point-free입니다.
console.log(transform(R.range(0, 100)))
//위처럼 할 수도있지만요.
```
## 7. 모나드

어떠한 값의 결과가 2가지형태로 나타날 수 있습니다 애러나 성공값이나. 이럴 때 컨테이너로 래핑하여 연산을 하는 것을 말합니다. 함수형프로그래밍에서는 참조투명성, 입력과 출력이 동일하게 1 : 1 매칭이 되어야 하기 때문에 `try catch`를 쓰게 되면 안됩니다. 그걸 썼을 경우 로직이라는 컨테이너의 벨트의 라인이 2개로 분리되어 투명성을 잃게 되기 때문입니다. ramda-fantasy의 Either라는 컨테이너박스에 담아서 Right메소드로 성공처리로직을 Left메소드로 애러처리로직을 구현해도 되고..  Promise를 이용해도 됩니다.  Promise 는 future Monad라고 합니다. 이런 형태의 값이라는 것을 설정해 놓고 비동기적인 상황에서 성공과 실패를 값으로 다루는 하나의 컨테이너 박스입니다. 그저 콜백으로 넘기는 방식은 컨텍스트로 넘기는 것이며 Promise는 그것들을 하나의 "값"으로 받아서 로직을 수행합니다. 
```js
const g = JSON.parse;
const f = k => k.temp; 
const fg = x => new Promise((resolve, reject)=> resolve(x)).then(g).then(f)
const log = x => console.log(x)

fg('{"temp":36.5}').catch(_ => 'JSON PARSE is not working').then(log)
```
이 Promise에 대해 좀 더 다시 설명하자면 Promise.all을 이용해서 동시성을 해결할 수 있습니다. 동시적으로 많은 이미지들을 가져온다고 했을 때 3초안에 가져오는 이미지만이 유효한 이미지라는 로직을 구현하고 싶습니다. 그저 if문을 써서 복잡하게도 할 수 있지만 Promise.all에 delay라는 함수를 집어넣어서 그 로직을 구현하면 됩니다. 

​

## 8. 제너레이터와 이터레이터
제너레이터를 써서 순차적으로 구현과 지연효과를 쉽게할 수 있습니다. 
```js
function *map(f, list){
    for(const a of list){
        yield f(a)
    }
}
 ``` 
또한 제너레이터는 이터레이터를 손쉽게 만들 수 있으며 **코루틴**이 가능합니다.
### 제너레이터의 코루틴
1. yeild문이 발동하면 스택프레임에 복사를 하고 콜스택에서는 제거를 합니다.
2. 그리고 next()문이 발동하면 스택프레임을 복원하여 실행해서 진입점을 개발자가 원하는 데로 실행이 가능하게 설계할 수 있습니다. 
 
 > 코루틴 : 진입점을 개발자가 원하는 데로 실행이 가능하게 설계하는 것 

#### 이터러블/이터레이터 프로토콜
 - 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]()라는  키를 가진 값
 - 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
 - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약

#### 제너레이터와 이터러블
제너레이터는 커스텀형 이터레이터로 함수자체가 이터러블을 생성한다. 이터러블은 반복할 수 있는 순차적인 객체를 뜻한다. Es6에서는 for of로 이터러블한 객체를 쉽게 순회할 수 있으며 객체 확장연산자인 ... spread Syntax로 배열을 만들 수 있다. 
이터레이터를 손쉽게 만들어준다. 
원리는 다음과 같다. `yield`, 스택 프레임에 복사를 하고 콜스택에서 제거를 한다. 그리고 `next`함수가 발동했을 때 스택프레임에 있는 것을 복원해서 실행시킨다. 즉, 진입점을 개발자가 원하는 데로 실행이 가능한 코루틴이 가능하다.  

 > ...연산자는 적용되는 공간에서의 인수들(string, 배열, key-value)에 따라 그 공간에 맞는 인수 또는 요소로 확장할 수 있게 하는 연산자이다. 

```js
const log = a => console.log(a)
function* gen() {
    yield 10;
    if (false) yield 20;
    yield 30;
}
let iter = gen();
log([...iter]); 
for (const a of iter) {
    log(a);
} 
```
`[Symbol.iterator]()`를 갖고 있기 떄문에 이터레이터한 객체를 커스텀하게 만들 수 있다. 

```js
var myIterable = {
    *[Symbol.iterator]() {
        yield 1;
        yield 2;
        yield 3;
    }
}
```
이렇게도 만들 수 있다. 
```js 
const iterable = {
    [Symbol.iterator]() {
        let data = ['foo','bar']
        return { // Iterator
            next() {
                return {
                    done: data.length === 0,
                    value: data.pop()
                }
            }
        }
    }
}

for(let e of iterable) {
    console.log(e)
    // 'foo'
    // 'bar'
}
```

배열에 `[Symbol.iterator]()`라는 키를 만들어서 이렇게 이터레이터를 만들 수 있다. 
```js
const array = ['foo','bar','zed']

// Array is a data source because it implements an iterator.
console.log(typeof array[Symbol.iterator]) // function

// We first get the iterator which allow us to iterate (i.e. consume) over the array values.
const iterator = array[Symbol.iterator]()

// The iterator follows the protocol of being an object with the 'next' function.
console.log(typeof iterator.next) // function

// Calling .next() returns the next element in the iteration.
iterator.next() // { value: 'foo', done: false }
iterator.next() // { value: 'bar', done: false }
iterator.next() // { value: 'zed', done: false }

// Until there's no more elements to iterate, which then returns 'done' as true.
iterator.next() // { value: undefined, done: true }
```

응용 : 0을 초기값으로 받지 않을 때 예외처리를 함으로써 `iter`을 만들고 초기값을 `next().value`를 통해 설정한다. 
```js
const log = a => console.log(a)
const reduce = (f, acc, iter) => {
    if (!iter) { 
        iter = acc[Symbol.iterator]();
        acc = iter.next().value; 
    }
    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
};
const add = (a, b) => a + b;
log(reduce(add, [1,2,3,4,5]));
```


### 9. 클로저 
클로저는 독특한 함수체제를 멋지게 활용할 수 있습니다. 
 - 프라이빗 변수를 모방
 - 서버 측 비동기 호출
 - 가상의 블록 스코프 변수를 생성  


```js
var buttons = [];
for (var i = 0; i < users.length; i++) {
  var user = users[i];
  buttons.push($('<button>').text(user.name).click(function() {
    console.log(user.name);
  }));
}
$('.user-list').append(buttons);

// 2. 절차지향적 해결 - 어차피 함수의 도움을 받아야 함, 각각 다른 이름이 잘 나옴
var buttons = [];
for (var i = 0; i < users.length; i++) {
  (function(user) {
    buttons.push($('<button>').text(user.name).click(function() {
      console.log(user.name);
    }));
  })(users[i]);
}
$('.user-list').append(buttons);

// 3. 함수적 해결 - 깔끔한 코드는 덤
$('.user-list').append(
  _.map(users, function(user) {
    return $('<button>').text(user.name).click(function() {
      console.log(user.name);
    });
  }));
``` 

### 응용예제 
라이브러리를 통해서 함수형프로그래밍을 쉽게 구현할 수 있습니다. 
유인동 개발자가 만든 `fxjs2`를 추천합니다.
#### 1. async와 await의 한계극복
```js 
async function test3() {
  var list = [1, 3, 5, 6, 7, 9];
  return list.map(async function(val, i) {
    console.log(val, i); // 동시에 모두 실행됨
    return await delay(val * 10); // 동시에 모두 실행됨
  });
}

test3().then(function(result) {
  console.log(result);
  // [Promise, Promise, Promise, Promise, Promise, Promise]
  // 결과로 바뀌지 않은 Promise 들
});
``` 
`async await`를 어떻게 잘 배치해도 동기 함수와는 조합할 수 없습니다. 동기적인 함수 map을 비동기와 함께할 수는 없을까? `fx.js`를 함께 사용하면 해결할 수 있습니다. `fx.js`는 Promise 없이도 비동기를 제어할 수 있지만 Promise를 대척하는 기법이 아니다. `Promise`나 `async await`를 더 잘 사용할 수 있도록 도와주는 라이브러리다.
```js
const _ = require('fxjs2')
async function test3() {
  var list = [1, 3, 5, 6, 7, 9];
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
#### 2. 지연평가
```js
  _.go([1, 2, 3, 4, 5, 6, 7, 8],
    L.map(a => {
      log(a);
      return new Promise(resolve => setTimeout(() => resolve(a * a), 1000))
    }),
    L.filter(a => {
      log(a);
      return new Promise(resolve => setTimeout(() => resolve(a % 2), 1000))
    }),
    _.take(2),
    _.reduce(add),
    log);
```

#### 3. reduce를 통한 집계
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
 > 태그 : 함수형 프로그래밍, lodash, fxjs