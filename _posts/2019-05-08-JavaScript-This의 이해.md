---
layout: post
title: 'REST API를 구축하는 자세한 방법'
author: kundol
comments: true
date: 2019-05-08 06:00
tags: [web, javascript, this]

---  
# 자세히 설명하는 javascript this의 이해
많이 헷갈리는 javascript의 this에 대해서 알아봅시다. 
자바스크립트에서의 this는 렉시컬 스코프 또는 함수호출패턴에 따라 정해집니다. 
화살표함수를 쓴다면 렉시컬스코프로 정해지고 화살표함수를 사용하지 않을 때는 함

수호출패턴으로 정해집니다. 

## 화살표구문에서의 this
화살표구문이라는 것은 ES6에서 나온 문법이며 `(param1, param2, .... paramN) => { statements }` 이런 것입니다. 

화살표 구문 또는 함수 표현식은 구문이 짧기 때문에 코드를 아름답게 해줍니다. 그리고 `lexical this`를 가지기 때문에 **함수호출패턴을 신경을 쓰지 않아도** 됩니다. 

 > 하지만 이 좋은 화살표 구문도 할 수 없는 것이 있습니다. 바로 생성자 / 프로토타입을 이용한 함수 정의 / 객체 메소드에 쓰이지는 못합니다. 

 > lexical this : 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다. 그냥 언제나 늘 그렇듯이 상위 스코프의 this를 가리킵니다. 
  
예를 들어
```js
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; 
	console.log(this, this.age)
  }, 1000);
}

var p = new Person(); 
```

화살표 함수를 쓰면 상위스코프인 Person이라는 객체를 올바르게 가리키게 되고 this.age는 증가하게 됩니다. 
그러나 화살표함수를 쓰지 않으면 **함수호출패턴**에 의해서 this를 가리키게 됩니다. 

```js
function Person(){
  this.age = 0;

  setInterval(function(){
    this.age++; 
	console.log(this, this.age) 
  }, 1000);
}
var p = new Person(); 
``` 
올바르게 this.age가 증가할 것같지만 NaN이 나오게 됩니다. 함수호출패턴, 즉, setInterval이라는 함수는 window객체에서 나온 메소드이고 window객체에는 age라는 값은 없기 때문이죠. 

그렇다면 함수호출패턴이라는 것은 무엇일까요? 

## 함수호출패턴에서의 this
다른 객체지향언어에서의 this는  어디서 선언되었느냐에 따라 스코프가 결정되는 Lexical Scope에 의한 this를 사용합니다.  
하지만 자바스크립트에서 this는 어디서 함수가 호출되었느냐(Dynamic Scope)에 따라 달라집니다. 

 > 스코프란 변수를 접근할 수 있는 범위입니다. javascript에서는 **함수단위**의 scope를 가지며 const, let으로 선언된 문맥은 블록단위의 scope를 가집니다. 

```js 
function kundol() { 
  var x = 1;
  console.log(x); // 1
  if(true) {
    var x = 2;
    console.log(x); // 2
  }
  console.log(x); // 2
}
 
kundol();
```
![함수단위의설명](/img/20190509_f.png)
`kundol`라는 **함수단위의 scope**로 설정이 되서 맨마지막 x가 2를 가리키는 것을 볼 수 있습니다. 
만약 블록단위 즉 `{}`로 된다면 x는 1을 가리키게 되겠죠? 

자 그렇다면 this의 함수호출패턴은 아래의 3가지가 있습니다.
 1. 생성자 함수 내에서는 새롭게 생성하는 객체
 2. 객체 메소드 내에서는 현재 실행 중인 객체
 3. 그 외는 함수의 실행 맥락(함수호출) 

### 1. 생성자 함수에서의 this
```javascript
function Person(){
  this.value ='kundol',
  this.printThis = function() {
        console.log(this);
  } 
}
 
var p = new Person();
var print = p.printThis;
p.printThis(); // -> Person {value: "kundol", printThis: ƒ}
print(); // -> Window {stop: ƒ, open: ƒ, alert: ƒ, ...}

``` 
`print()`로 호출하는 것과 **new Person**으로 만든 객체에서 호출하는 메소드는 다릅니다. 
즉, 어디서 호출하느냐에 따라 다른 것입니다. 그저 `print()`로 호출하게 된다면 호출되는 환경에서의 영향을 받아 전역개체인 `window`를 참조하게 됩니다. 

### 2. 객체리터럴로 만든 객체에서의 this
```javascript
var obj = {
    value: 'hi',
    printThis: function() {
        console.log(this);
    }
};
var print = obj.printThis;
obj.printThis(); // -> {value: "hi", printThis: ƒ}
print(); // -> Window {stop: ƒ, open: ƒ, alert: ƒ, ...}
```
`print()`의 경우 window라는 전역객체를 가리키게 됩니다. `obj.printThis()`의 경

우 올바르게 `obj`를 가리키는 것을 볼 수 있습니다. 즉 어떠한 함수를 어떻게 호출

되는가에 따라서 this가 결정되게 됩니다. 
객체의 메소드로 호출되게 된다면 그 this는 객체를 가리키게 되고 그저 변수로 할당

되어서 호출이 된다면 호출될 때의 this는 그 실행맥락에서의 상위 스코프인 전역스

코프를 가리키게 되고 브라우저에서는 window를 가리키게 됩니다. 
node.js에서는 global 객체를 가리킵니다. 또한 엄격 모드(`use strict`) 일 경우 

`this`는 전역 객체 대신 `undefined`가 됩니다.
 

### 3. `call`과 `apply`, `bind`로 정해지는 this

`.call`과 `.apply`는 모두 함수를 호출하는데 사용되며 첫 번째 매개 변수는 함수 

내에서 `this`의 값으로 사용됩니다. 그러나 `.call`은 쉼표로 구분된 인수를 두 번

째 인수로 취하고 `.apply`는 인수의 배열을 두 번째 인수로 취합니다. 즉, 이 함수

에 첫번째 매개변수로 전해지는 값이 this로 할당되게 됩니다. 

#### call
```javascript
function greet() {
  var reply = [this.animal, 'typically sleep between', 

this.sleepDuration].join(' ');
  console.log(reply);
}

var obj = {
  animal: 'cats', sleepDuration: '12 and 16 hours'
};
greet.call(obj);  // cats typically sleep between 12 and 16 hours
```
greet함수의 this는 obj를 가리키게 됩니다. 원하는 함수에 인자로 넘긴 this가 바인

딩 된 새로운 함수를 리턴한다

call과 apply의 차이점은 ,콤마 단위로 넘겨주느냐 배열로 넘겨주느냐에 따른 차이입

니다.
```javascript
function add(a, b) {
  return a + b;
}

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
```
이외에도 `bind`를 통해 `this`를 정할 수 있습니다. 
 
그렇다면 이렇게 정해지는 this를 어떨 때 쓰는 걸까요? 

#### 1. 클릭이벤트
``` 
var el = document.getElementById('kundol'); 
el.addEventListener('mouseenter', hintBrowser);
el.addEventListener('animationEnd', removeHint); 
function hintBrowser() { 
	this.style.willChange = 'transform, opacity';
} 
function removeHint() {
	this.style.willChange = 'auto';
}
```
#### 2. 역시나 그렇듯이 생성자함수 또는 클래스
 
```js
// ES5 함수 생성자
function Person(name) {
  this.name = name;
}

// ES6 클래스
class Person {
  constructor(name) {
    this.name = name;
  }
}
``` 

```js
// ES5 함수 생성자
function Student(name, studentId) {
  // 수퍼 클래스의 생성자를 호출하여 수퍼 클래스에서 상속된 멤버를 초기화합니다
  Person.call(this, name);
  // 서브 클래스의 멤버를 초기화합니다.
  this.studentId = studentId;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
// ES6 클래스
class Student extends Person {
  constructor(name, studentId) {
    super(name);
    this.studentId = studentId;
  }
}
``` 