---
layout: post
title: 'JavaScript 실행컨텍스트와 클로저'
author: kundol
comments: true
date: 2019-05-16 06:00
tags: [web, 실행컨텍스트, 클로저, 스코프체인]

---   
자바스크립트(JavaScript)는 코드 실행에 필요한 정보들을 물리적인 객체로 관리하는데  **EC,실행컨텍스트**(Execution Context) 를 통해서 관리합니다. 이 EC들이 Call Stack에 쌓여서 순차적으로 실행이 됩니다.  
초기에는 Global Object인  빌트인 객체(Math, String, Array 등)와 BOM, DOM이 있지만 추후 EC들이 쌓여서 실행 됩니다. 

# EC의 구성
1. 스코프체인
2. Variable Object
3. this

로 구성이 되며 1. 스코프체인생성과 초기화 2.  Variable Object 형성 3. this value 결정이 순차적으로 결정됩니다. 

## 1. 스코프체인
함수의 스코프 주소를 차례대로 담은 리스트입니다. 순차적으로 탐색하며 해당 주소, 즉 `[[scope]]`로 참조가 가능합니다. 
현재 실행 컨텍스트의 활성 객체(AO)를 선두로 하여 순차적으로 상위 컨텍스트의 활성 객체(AO)를 가리키며 마지막 리스트는 전역 객체(GO)를 가리킵니다. 

좀 더 자세히 말하자면, 자신의 실행환경, 자신을 포함하는 외부실행환경, 전역객체를 순차적으로 가리키며 리스트를 만들게 됩니다. 이렇게 변수를 찾는 과정을 스코프체이닝이라고 합니다. 참고로 프로퍼티를 찾는 것을 프로토타입체이닝이라고 합니다.  

### 클로저 
외부함수의 실행컨텍스트가 소멸해도 `[[scope]]`프로퍼티가 가리키는 **외부함수의 실행환경은 소멸하지 않고 참조할 수 있는 것을 말합니다.** 스코프체인이 형성될 때 `[[scope]]`로 참조할 수 있는데 이를 이용해 참조할 수 있는 것을 말합니다.

참고로 스코프는 함수를 호출할 때가 아니라 함수를 어디에 선언하였는지에 따라 결정됩니다.즉, **렉시컬한 환경**으로 설정이 됩니다. 
이 때문에 함수가 다른 함수 내부에서 정의되었을 때 내부함수는 외부함수의 변수에 접근 가능하지만 외부함수는 내부함수의 변수에 접근 불가한 **렉시컬 스코핑**또한 발생되게 됩니다.  

클로저는 함수와 그 함수가 선언된 렉시컬 환경의 조합이며 외부 함수가 반환된 후에도 외부 함수의 변수 범위 체인에 접근할 수 있는 함수를 말합니다. 클로저는 1) 현재 상태를 기억하고 변경된 최신 상태를 유지하고, 2) 모듈화, 3) 은닉화에 쓰입니다.

 > 스코프 : 어떤 변수들이 접근할 수 있는지에 대한 정의 


```js
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
```
`name`이란 변수는 외부함수의 변수를 참조하고 있습니다. 

내부함수가 다시 함수를 리턴하는 식으로 클로저는 구현됩니다.
```js
function outter() {
    var title = 0;
    function inner() {
        console.log(title);
        title++;
    }
    inner();
}
outter();
outter();
outter();
//0 0 0 이 반환된다. 

function outter() {
    var title = 0;
    function inner() {
        console.log(title);
        title++;
    } 
    return inner;
}
var s = outter(); 
s();
s();
s();  
//0 1 2 가 반환된다. 
``` 

즉시실행함수로 private 변수를 흉내낼 수 있습니다. 
```js
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
```

## 2. Variable Object
각각 AO, GO의 프로퍼티들에 대해 값이 채워집니다. 
 - Activation Object : 함수선언(표현식은제외), Arguments, 변수를 포함합니다. 
 - Global Object : 전역변수들을 포함합니다. 

### Variable Object가 형성되는 과정
 - (Function Code인 경우) 매개변수(parameter)가 Variable Object의 프로퍼티로, 인수(argument)가 값으로 설정된다.
 - 대상 코드 내의 함수 선언(함수 표현식 제외)을 대상으로 함수명이 Variable Object의 프로퍼티로, 생성된 함수 객체가 값으로 설정된다.(함수 호이스팅)
 - 대상 코드 내의 변수 선언을 대상으로 변수명이 Variable Object의 프로퍼티로, undefined가 값으로 설정된다.(변수 호이스팅) 

## 3. this
함수 호출 패턴에 따라 달라지거나 화살표함수의 경우 `lexical scope`를 참조합니다.
 - 참고 : [this의 이해](https://wnghdcjfe.github.io/2019/05/08/JavaScript-This/)
 
## 호이스팅 
코드에 구성에 따라 호이스팅이 결정되는데 이 때 변수는 undefined로 참조가 가능하고 함수는 사용또한 가능하다 이유는 변수는 선언단계와 초기화가 구분되어있고 함수선언은 선언과 동시에 초기화가 이루어지기 때문에  참조뿐만 아니라 실행도 가능하다. 

  > 태그 : 실행컨텍스트, 클로저 

