# 디자인패턴
디자인 패턴이란 프로그램이나 어떤 특정한 것을 개발하는 중에 발생했던 문제점들을 정리해서 상황에 따라 간편하게 적용해서 쓸 수 있는 것을 정리하여 특정한 "규약"을 통해 쉽게 쓸 수 있는 형태로 만든 것을 말합니다.
## 싱글톤 패턴
하나의 클래스에는 하나의 인스턴스를 가지는 패턴, 동일한 클래스로 새로운 객체를 생성해도  처음 만들어진 인스턴스를 얻게 됩니다.
보통 자바스크립트에서 리터럴, new Object로 객체를 생성하게 되면, 다른 어떤 객체와도 같지 않기 때문에 이 자체만으로 싱글톤이라고 볼 수 있습니다.  
```js
//전통적으로 전통적으로 자바스크립트에서 싱글톤을 만들 때는 다음 코드와 같이 객체 리터럴 표기법을 사용한다. 
const a = {
    name : 1, 
    key : function(){

    }
} 
const obj = { a : 27 };
const obj2 = { a : 27 }; 
console.log(obj === obj2)   // false
const old_singleton = (function(){ 
    const singletonClass = () => {
        return {}
    }
    let instance; 
    return{
        getInstance(){
            if(!instance) instance = singletonClass();
            return instance;
        }
    }
})()  
const singletone1 = old_singleton.getInstance();
const singletone2 = old_singleton.getInstance();
console.log(singletone1 === singletone2); // true;
class new_singleton{
    constructor(){
        if(!new_singleton.instance){
            new_singleton.instance = this; 
        } 
        return new_singleton.instance
    }
    getInstance(){
        return this.instance
    }
} 
const a = new new_singleton(); 
const b = new new_singleton();
Object.freeze(a)
Object.freeze(b)
console.log(a === b); // true;
```

### 즉시실행함수 
한번의 실행만을 필요로하는 초기화 코드 부분에 많이 사용됩니다. 함수를 다시 호출 할 수 없기 때문입니다.  
함수표현식
 - 1. 함수를 정의
 - 2. 변수에 함수를 저장 및 실행

즉시실행함수
 - 1. 선언과 동시에 바로 실행 

라이브러리 전역 변수 충돌 방지를 위해 사용되며 private변수를 구현할 때 사용됩니다.
```js
(fucntion($) {
 // $를 충돌 없이 사용 가능
})(jQuery);
```
  
## 팩토리 패턴
객체를 생성한다. 팩토리의 가장 대표적인 예제는 Object이다.
전달받은 값에 따라 다른 객체를 생성하며 개발자가 객체 생성을 하면서 인스턴스의 타입을 관리할 수 있다. 
```js
const num = new Object(42);
const str = new Object('abc'); 
num.constructor.name; // Number
str.constructor.name; // String 
```
템플릿 메서드 패턴(Template Method Pattern)에서 파생되었다. 
템플릿 메서드 패턴이란, 상속 관계에 있는 두 클래스에서 상위 클래스가 중요한 뼈대를 결정하고, 하위 클래스에서는 추상 메서드를 통해 구체적인 내용을 결정하도록 하는 디자인 패턴입니다.

예를 들어 새로운 종류의 커피가 추가되었을 때 끊임없이 if문을 추가해야 한다는 것이다. 이를 해결하려면 어떻게 해야 할까? 이때 추상화란 개념을 사용한다.
```js
function coffeeFactory(type) {
  let coffee;
  if (type === "latte") coffee = new Latte();
  else if (type === "espresso") coffee = new Espresso();
  else if (type === "cappuccino") coffee = new Cappuccino();
  else if (type === "mocha") coffee = new Mocha();
  return coffee;
}
```
1. 인스턴스를 타입에 따라 생성해야 하기 때문에 분기문이 들어가고 
2. 의존성이 생기게 된다. 
그렇다면 인스턴스를 바깥에서 만든다면? 
```js
class CoffeeFactory {
    static createCoffee(factory) {
        return factory.createCoffee();
    }
}
class LatteFactory {
    static createCoffee() {
        return new Latte();
    }
} 
CoffeeFactory.createCoffee(LatteFactory);  
```
### static
static 메소드를 가리키며 클래스의 인스턴스로 호출되지 않고 클래스 자체내에서 호출되어 메모리를 절약할 수 있다. 유틸리티 함수나 객체들을 복제하거나 생성할 때 쓰인다. Math가 그 예다. 

## 모듈패턴
흔히 말하는 클래스이며 클래스의 장점은 캡슐화이다. public, private 접근 권한 설정을 가능하게 합니다. 
```js
(function(){
    return{

    }
})()
```
## 프로토타입 패턴
생성된 객체는 전달된 원본 객체의 복제본(얕은 복제본)입니다. 똑같은 메소드, 변수가 쓰인다면 prototype 패턴을 쓰면 메모리를 아낄 수 있습니다.  
자바스크립트 객체는 속성을 저장하는 동적인 "가방"과 (자기만의 속성이라고 부른다) 프로토타입 객체에 대한 링크를 가집니다.
객체가 속성을 찾을 때 다음과 같은 과정을 거칩니다. 
1. console.log(o.d); // undefined
2. o는 'd'라는 속성을 가지는가? 아니다. 프로토타입을 확인해보자.
3.  o.[[Prototype]]은 'd'라는 속성을 가지는가? 아니다. 다시 프로토타입을 확인해보자.
4.  o.[[Prototype]].[[Prototype]]은 null이다. 찾는 것을 그만두자.
5.  속성이 발견되지 않았기 때문에 undefined를 반환한다.

```js
const a = function(){

}
a.prototype = function(){

}
```  

## 옵저버패턴
객체가 수정되면 종속 객체에 변경 사항을 브로드 캐스팅 합니다. 
대표적인 예가 MVC (Model-View-Controller) 아키텍처입니다.이 MVC 아키텍처는 Model이 변경되면 View가 업데이트되는 옵저버 패턴의 특징을 가지고 있습니다.
 
## 반복자패턴
객체들의 집합을 효과적으로 반복하면서 탐색한다. 이터레이터객체가 쓰인다 
```js
class Collection {
    constructor(models = []) {
        this._models = models;
    }
    at(idx) {
        return this._models[idx];
    }
    add(model) {
            this._models.push(model);
            return this;
        }
    [Symbol.iterator]() {
        return this._models[Symbol.iterator]();
    }
} 

const a = new Collection();
a.add(1)
a.add(2)
a.add(3)  
console.log([...a])
``` 
## MVC 패턴
<center>
<img src="https://postfiles.pstatic.net/MjAxNzAzMjVfMjUw/MDAxNDkwNDM4NzI4MTIy.4ZtITJJKJW_Nj1gKST0BhKMAzqmMaYIj9PobYJMFD4Ig.xTHT-0qyRKXsA4nZ2xKPNeCxeU2-tLIc-4oyrWq5WBgg.PNG.jhc9639/mvc_role_diagram.png?type=w966" width="700px">
</center> 

MVC 는 Model, View, Controller의 약자 입니다. 하나의 애플리케이션, 프로젝트를 구성할 때 그 구성요소를 세가지의 역할로 구분한 패턴입니다.
아키텍처의 최상위에 뷰가 있고 그아래 컨트롤러가 있고 그 아래 모델이 있습니다. 때문에 뷰는 컨트롤러만 알고 있고 컨트롤러는 모델을 알고 있습니다. 모델이 변경되었을 때 뷰는 컨트롤러를 통해서 통보를 받습니다.

### 모델, Model
애플리케이션의 정보, 데이타를 나타냅니다. 데이타베이스, 처음의 정의하는 상수, 초기화값, 변수 등을 뜻합니다.
모델의 속성 중 텍스트 정보가 변경이 된다면, 이벤트를 발생시켜 누군가에게 전달해야 하며, 누군가 모델을 변경하도록 요청하는 이벤트를 보냈을 때 이를 수신할 수 있는 처리 방법을 구현해야 합니다. 또한 모델은 재사용가능해야 하며 다른 인터페이스에서도 변하지 않아야 합니다. 
### 뷰, View
input 텍스트, 체크박스 항목 등과 같은 사용자 인터페이스 요소를 나타냅니다. 다시 말해 데이터 및 객체의 입력, 그리고 보여주는 출력을 담당합니다. 데이타를 기반으로 사용자들이 볼 수 있는 화면입니다.  
모델과 같이 변경이 일어났을 때 이른 누군가에게 변경을 알려줘야 하는 방법을 구현해야 합니다. 뷰에서는 화면에서 사용자가 화면에 표시된 내용을 변경하게 되면 이를 모델에게 전달해서 모델을 변경해야 할 것이다. 그 작업을 하기 위해 변경 통지를 구현합니다.
그리고 재사용가능하게끔 설계를 해야 하며 다른 정보들을 표현할 때 쉽게 설계를 해야 합니다. 

### 컨트롤러,Controller
데이터와 사용자인터페이스 요소들을 잇는 다리역할을 합니다. 
즉, 사용자가 데이터를 클릭하고, 수정하는 것에 대한 "이벤트"들을 처리하는 부분을 뜻합니다.  컨트롤러 또한 다음과 같은 규칙을 이해해야 합니다.

## MVVM 패턴
C와 VM이 다르다. 
뷰모델은 뷰를 추상화하기 위해 추상화된 뷰 상태(ViewState)를 유지한다. 예를 들어 뷰모델은 읽기와 쓰기가 가능한 문자열 속성을 통해 텍스트 입력기 컨트롤을 추상화한다. 데이터 목록을 보여주는 컨트롤에 대해서는 각 요소의 뷰 상태가 들어있는 컬렉션이 사용된다. 

뷰는 자신이 가진 상태를 사용자에게 표현할 뿐 아니라 사용자가 응용프로그램에 명령을 내릴 수단을 제공한다. 뷰모델은 이런 기능을 추상화하기 위해 명령(Commands)을 가진다. 명령을 통해 사용자는 모델의 행위를 실행할 수 있다.

이제 추상화된 뷰와 물리적인 뷰를 연결해 줄 수단이 필요하다. MVC 패턴에 익숙한 프로그래머라면 컨트롤러(Controller)가 뷰와 모델 사이의 작업흐름을 제어하는 모습을 떠올릴 것이다. MVVM 패턴에서는 작업흐름 제어보다는 뷰와 뷰모델의 상태를 동기화해 줄 구성요소가 필요한데 데이터 바인딩(data binding)이 그것이다. 

 - Commands : 액션이 그것을 처리하는 객체와 분리되는 것이 목표 / 여러가지 요소에 대한 처리를 하나의 액션으로 처리할 수 있게 한다. 
 - 데이타바인딩 : 화면에 보이는 Data와 브라우저 메모리 데이터와 일치시키는 기법 / View 모델의 상태가 변경되면 View도 변경되며 그 역도 가능하다.   
      
### Virtual DOM
돔 요소가 많아지면 자바스크립트로 돔을 핸들링하는 일이 무거워진다. 그래서 돔과 비슷한 구조로 자바스크립트 객체를 만든다. 이것은 진짜 돔과는 달리 메모리에 올라가있는 것이기 때문에 비교적 매우 빠른 성능을 보인다. 가상 돔을 수정하면 진짜 돔을 수정하는 것보다 빠르다. 뷰는 버추얼 돔이 변경될 때마다 진짜 돔과 비교해서 차이를 찾는다. 그 결과 차이난 부분의 돔만 수정하는 동작을 한다. 

## MVP패턴
MVC에서 컨트롤러가 Presenter로 교체된 형태이고 프리젠터는 뷰와 같은 레벨에 있습니다. 프리젠터는 뷰와 모델의 이벤트를 모두 받으면서 둘 사이의 상호작용을 조정합니다. 
View-Presenter 는 One-to-One(일대일) 관계이다.
View 는 Presenter 를 참조하고, Presenter 는 View 의 존재를 알고 있다. (강한 결합 = 서로 의존성이 높다)

코드 상으로는 View-Presenter 일대일 관계로 인해, 각 View 를 위한 각 Presenter 가 필요며 이로인해 코드의 수가 상당히 증가하게 된다.
이를 MVVM 또는 MVC는 느슨한 결합으로 추상화하여 재사용가능하게끔 하였다.

# WEB
## REST API
웹의 장점을 최대한 활용할 수 있는 아키텍처 스타일이며 이를 잘 지킨 아키텍처를 **RESTful하다**라고 합니다.
 
### 아키텍처 규칙
그럼 어떠한 아키텍처 스타일의 집합일까요? 일단 아래의 6가지 규칙은 지켜야 합니다. 

#### 1. Uniform-Interface 
독립적으로 자원들이 각각 인터페이스를 가져야 한다는 것입니다. REST는 기본적으로 독립적인 인터페이스를 갖습니다. 그래서 C++, java 등 여러 언어애 쓰입니다. 
 - 웹 페이지를 변경했다고 웹 브라우저를 업데이트할 필요는 없다.
 - 웹 브라우저를 업데이트했다고 웹 페이지를 변경할 필요도 없다.
 - HTTP 명세가 변경되어도 웹은 잘 동작한다.
 - HTML 명세가 변경되어도 웹은 잘 동작한다. 

#### 2. Self-descriptive messages
Self-descriptive messages이란 각 자원들의 타입에 대하여 **media 타입**을 이용하고 그 타입에 대해서 IANA에 등록해야 합니다.(하지만 힘듭니다.) 또한 HTTP Header에 타입을 명시해주어야 합니다. 

각 메시지(자원)들은 **MIME types**에 맞춰 표현되며 스스로를 표현해야 합니다. 또한 이 데이타가 무엇을 나타내는지 path를 통해 나타내주어야 합니다. 
```js
{
  "path" : "/kundol"
}
```
`font/ttf`, `text/plain`, `text/csv`을 정의 해주는 것을 말합니다.  

#### 3. HATEOAS 구조 
하이퍼링크에 따라 다른 페이지를 보여줘야 하며 데이타 마다 어떤 URL에서 원했는지 명시해 주어야 합니다.  
```js
// send person object with HATEOAS links added
res.json(personObject, [
    { rel: "self", method: "GET", href: 'http://127.0.0.1' },
    { rel: "create", method: "POST", title: 'Create Person', href: 'http://127.0.0.1/person' }
]);
```
이렇게 하거나 data위에 링크를 써야 합니다. 
```js
{
  "link":"http://kundol.net/todos/{id}"
  "data":[]
}
```

#### 4. Stateless
이건 HTTP 자체가 Stateless이기 때문에 HTTP를 이용하는 것만으로도 충족이 됩니다. API를 제공해주는 서버는 세션(session)을 그 서버 쪽에 유지하지 않는다는 의미입니다. 

#### 5. Cacheable 
HTTP 는 원래 캐싱이 됩니다. 새로고침을 하면 304가 뜨면서 원래 있던 js와 css 이미지등을 불러오는 것을 볼 수 있습니다.
이러한 캐싱은 네트워크 요청을 줄여주며 이는 UX향상에 도움이 됩니다. 네트워크 요청시 해당되는 자원들을 복사해서 메모리에 저장해두었다가 또 같은 요청시 네트워크요청을 하지 않고 브라우저메모리에 있던 자원을 다시 반환합니다. HTTP 메서드 중 GET에 한정되어있으며 `Cache-Control:max-age=100`이런식으로 한정된 시간을 정할 수가 있으며 이 캐싱된 데이타가 유효한지를 판단하기 위해 `Last-modifed` 그리고 `Etag`를 씁니다.   
`Etag`는 전달되는 값에 태그를 붙여서 캐싱되는 자원인지를 확인해주는 것입니다. 예를 들어 `Cache-Control:max-age=100`으로 형성된 자료는 100초가 지나면 응답이 완료 되었기 때문에 다시 똑같은 자료를 가져올 수 있습니다. 이 때 Etag, 디지털 지문을 사용한다면 똑같은 자원은 캐싱되서 요청을 줄일 수 있습니다   

#### 6. Client-Server 구조  
클라이언트와 서버가 서로 독립적인 구조를 가져야 합니다. 물론 이는 HTTP 를 통해 가능한 구조입니다. 서버에서 HTTP 표준만 지킨다면 웹에서는 그에 따른 화면이 잘 나타나게 됩니다. 서버는 그저 API를 제공하고 그 API에 맞는 비즈니스 로직을 처리하면 됩니다. 마찬가지로 클라이언트에서는 HTTP 로 받는 로직만 잘 처리하면 되는 것입니다.
  
#### 7. Layered System
계층구조로 아키텍처를 만들 수 있다는 것을 뜻합니다.  

### URI 규칙
이렇게 규칙을 지켰으면 이제 자원을 표기하는 URI에 아래의 6가지 규칙을 지켜야 합니다.  
 1. 동작은 HTTP 메소드로 해야 합니다. 수정 = put, 삭제 = DELETE, 추가 = post, 조회 = get을 이용해야 합니다. 
예를 들어 `/books/delete/1` 이렇게 표기하면 안된다는 것입니다. 
 2. 확장자는 표기하지 말아야 합니다.
 3. 동사가 아닌 명사로만 표기해야 합니다. **유저가 책을 소유한다**라고 한다면 이런식으로 구성되어야 합니다. `유저/유저아이디/inclusion/책/책아이디`
 4. URI는 계층적인 내용을 담고 있습니다.  `/집/아파트/전세` 이런식으로 내려가야 합니다. 
 5. 소문자로 쓰며 너무 길경우에는 **-**를 씁니다. 
 6. HTTP 응답 상태 코드를 활용합니다.

|  상태코드   | 설명 | 
|:--------|:--------| 
| 200 OK   | 요청이 성공적으로 되었습니다. | 
| 201 Created | 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성되었습니다 | 
| 400 Bad Request | 이 응답은 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미합니다. | 
| 301 Moved Permanently |  이 응답 코드는 요청한 리소스의 URI가 변경되었음을 의미합니다. 새로운 URI가 응답에서 아마도 주어질 수 있습니다. | 
| 401 Unauthorized |  "비인증(unauthenticated)"을 의미합니다. 클라이언트는 요청한 응답을 받기 위해서는 반드시 스스로를 인증해야 합니다. |  
| 500 Internal Server Error |  서버에 오류가 있음을 나타냅니다. | 


#### 도서관 REST API 예 
도서관의 REST API를 만들 때의 예제를 들고 마무리 하겠습니다.

node.js express 예입니다.
```js
app.get('/books/') 
// 모든 책을 조회합니다.
app.post('/books/booksid') 
// 책을 생성합니다. 
app.put('/books/booksid') 
// 책을 수정합니다.
app.get('/books/booksid') 
// 특정 책을 조회합니다. 
app.put('/users/userid/books/booksid') 
// 어떤 유저가 특정 책을 빌립니다. 
app.patch('/users/userid/books/booksid') 
// 어떤 유저가 특정 책을 빌립니다. 
```
참고로 `put`과 `patch`의 차이점은 `put`은 전체 자원의 교체이며 `patch`는 일부자원의 교체를 뜻합니다. 

예를 들어 `{"a" : 1, "b" : 2}`가 있을 때 b를 3으로 바꾼다 했을 때  `put`의 경우 `{"a" : 1, "b" : 3}`으로 전체적인 인자를 보내고 `patch` 는 `{"b" : 3}`이런식으로 부분적으로 보내는 것을 말합니다. 응답으로 받는 메세지는 수정된 결과값, 동일합니다.

## 자바스크립트 이벤트 루프 등 비동기 함수 과정
자바스크립트는 Run to Completion 특징을 가지고 있어서 각각의 메세지들이 완료되기 전까지는 다른 메세지는 완료되지 않습니다. 
```js
let running = true
setTimeout(() =>{
    console.log(1)
}, 500)
while(true){
    if(!running) break;
    console.log("흠냐")
}
```
비동기함수, WebAPIs 의 함수(DOM Event, Timer를 쓰는 setTimeout, XMLHttpRequest, Promise)들을 쓰게 되면 브라우저 내 WebAPIs 백그라운드공간으로 넘어가 실행하다 완료가 되는 순서대로 queue에 쌓이고 그 후 이벤트 루프를 통해서 콜스택에 올라가 실행이 됩니다. 

이 때 queue에는 task와 microtask로 분리가 되는데 task는 브라우저에서 순차적으로 실행되어야 할 setTimeout, UI event가 있고 Microtask는 바로 다음으로 실행되어야 할 비동기작업 Promise, process.nextTick이 있습니다. Microtask가 더 우선순위를 가져서 Microtask가 다 지워지면 task가 실행됩니다.

Expensive한 작업의 경우 메인쓰레드와 워커쓰레드로 나눠서 처리 또는 많이 발생하는 경우 debounce(몇초 이후) 를 이용하면 됩니다.
   
## 라우팅과 Ajax
 - 라우팅 : 화면을 전환하는 내비게이션을 관리하기 위한 기능
 - AJAX :  웹 클라이언트 측에서 리로드 없이 비동기적으로 콘텐츠를 변경하기 위해 사용하는 모든 기술, 불필요한 리소스 중복 요청을 방지, HTML5의 Histroy API인 pushState와 popstate 이벤트를 사용한 PJAX 방식을 최근 SPA 프레임워크에서 사용 

## 객체복사 및 불변 객체
### 1단계이하
`Object.assign`, `{...a}`
### 2단계이상
```js
const copy = o =>{ 
    let out = {}; 
    let value, key;  
    for(key in o){
        value = o[key];
        out[key] = (typeof value === "object" && value != null) ? copy(value) : value;
    }
    return out; 
}
```
`JSON.parse(JSON.stringify(o))`   

## 이벤트 캡처링 버블링
 - 이벤트 버블링 - 하위 엘리먼트에서 상위 엘리먼트로 이벤트가 전파
 - 이벤트 캡처링 - 반대

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    div{
        width: 300px;
        height:300px;
        background:red;
        position: relative;
        border:1px solid black;
        top:-30%;
    }
    </style>
</head>
<body>
    <body>
        <div class="one">
            <div class="two">
                <div class="three">
                </div>
            </div>
        </div>
    </body>
    
    <script>
    
    var divs = document.querySelectorAll('div');
    divs.forEach(function(div) {
        div.addEventListener('click', logEvent, { 
            //capture: false //
            capture: true // one two three
        });
    });
    
    function logEvent(event) {
        console.log(event.currentTarget.className);
    }
    </script>
</body>
</html>
```     
## `cookie`, `sessionStorage`, `localStorage` 사이의 차이점

위 세 가지 기술은 모두 클라이언트 측에서 값을 저장하는 key-value 저장소 매커니즘입니다. 모두 문자열로만 값을 저장할 수 있습니다.

|                                   | `cookie`                                                         | `localStorage` | `sessionStorage` |
| --------------------------------- | ---------------------------------------------------------------- | -------------- | ---------------- |
| 생성자                            | 클라이언트나 서버. 서버는 `Set-Cookie` 헤더를 사용할 수 있습니다 | 클라이언트     | 클라이언트       |
| 만료                              | 수동으로 설정                                                    | 영구적         | 탭을 닫을 때     |
| 브라우저 세션 전체에서 지속       | 만료 설정 여부에 따라 다름                                       | O              | X                |
| 모든 HTTP 요청과 함께 서버로 보냄 | 쿠키는 `Cookie` 헤더를 통해 자동 전송됨                          | X              | X                |
| 용량 (도메인당)                   | 4kb                                                              | 5MB            | 5MB              |
| 접근성                            | 모든 윈도우                                                      | 모든 윈도우    | 같은 탭          |

## 쿠키와 세션의 차이 
### 쿠키
 - 클라이언트(브라우저) 로컬에 저장되는 키와 값이 들어있는 작은 데이터 파일
 - 사용자 인증이 유효한 시간을 명시할 수 있으며, 유효 시간이 정해지면 브라우저가 종료되어도 인증이 유지
 - 한 클라이언트당 300개까지 쿠키저장 가능, 하나의 도메인당 20개의 값만 가질 수 있음, 하나의 쿠키값은 4KB까지 저장
 - 사용자가 따로 요청하지 않아도 브라우저가 Request시에 Request Header를 넣어서 서버에 자동전송
 - 세션보다 더 빠르다. 보안면에서는 세션보다 좋지 않다. 

### 세션 ( Session )
 - 세션은 쿠키를 기반하고 있지만, 사용자 정보 파일을 브라우저에 저장하는 쿠키와 달리 세션은 서버 측에서 관리합니다.
 - 서버에서는 클라이언트를 구분하기 위해 세션 ID를 부여하며 웹 브라우저가 서버에 접속해서 브라우저를 종료할 때까지 인증상태를 유지합니다.
 - 물론 접속 시간에 제한을 두어 일정 시간 응답이 없다면 정보가 유지되지 않게 설정이 가능 합니다.
 - 사용자에 대한 정보를 서버에 두기 때문에 쿠키보다 보안에 좋지만, 사용자가 많아질수록 서버 메모리를 많이 차지하게 됩니다.
 - 즉 동접자 수가 많은 웹 사이트인 경우 서버에 과부하를 주게 되므로 성능 저하의 요인이 됩니다.
 - 해당 서버의 엔진이 클라이언트에게 유일한 ID를 부여하는 데 이것이 세션ID다.     

세션은 사용자의 수 만큼 서버 메모리를 차지하기 때문에 요즘은 이런 문제들을 보완한 토큰 기반의 인증방식을 사용하는 추세입니다.
그 중 JWT( JSON Web Token )라는 것이 있습니다.

## CSS 선택자 특이성
브라우저는 CSS 규칙의 특수성에 따라 요소에 표시할 스타일을 결정합니다. 브라우저는 이미 특정 요소와 일치하는 규칙을 결정했다고 가정합니다. 일치하는 규칙들 가운데, 다음에 기초하여 각 규칙에 대해 특수성, 네개의 쉼표로 구분된 값,`a, b, c, d`가 계산됩니다.

1.  `a`는 인라인 스타일이 사용되고 있는지 여부입니다. 속성 선언이 요소에서 인라인 스타일이면 'a'는 1 이고, 그렇지 않으면 0 입니다.
2.  `b`는 ID 셀렉터의 수입니다.
3.  `c`는 클래스, 속성 및 가상 클래스 선택자의 수입니다.
4.  `d`는 태그 및 유사 요소 선택자의 수입니다.

## 콘텐츠 숨기는 방법  
* `display :none`
* `visibility: hidden`. 그러나 요소는 아직 페이지의 흐름에 여전히 공간을 차지하고 있습니다.
* `width: 0; height: 0`. 요소가 화면의 어떤 공간도 차지하지 않도록하십시오. 결과적으로 보이지 않습니다.
* `position: absolute; left: -99999px`. 화면 외부에 배치합니다.
* `text-indent: -9999px`. 이것은 `block`인 엘리먼트 내의 텍스트에서만 작동합니다.
   

## Quirks Mode
Quirks mode는 오래된 웹 브라우저들을 위해 디자인된 웹 페이지의 하위 호환성을 유지하기 위해 W3C나 IETF의 표준을 엄격히 준수하는 Standards Mode를 대신하여 사용되는 웹 브라우저의 기술을 나타낸다. 같은 코드라도 웹 브라우저마다 서로 해석을 달리 하기 때문에, 전혀 다른 결과물을 보여주게 된다.
HTML5 표준에 대한 DOCTYPE 선언은 `<!DOCTYPE html>`입니다.

## HTTP2
http1.1의 단점 : HTTP/1.1는 기본적으로 Connection당 하나의 요청을 처리 하도록 설계 되어있다.동시전송이 불가능하고 요청과 응답이 순차적으로 이루어 지게된다.
그렇다 보니 HTTP문서안에 포함된 다수의 리소스 (Images, CSS, Script)를 처리하려면 요청할 리소스 개수에 비례해서 Latency(대기 시간)는 길어지게 된다.

### HTTP1의 단점 : HOL (Head Of Line) Blocking - 특정 응답의 지연 
하나의 TCP연결에서 3개의 이미지(a.png, b.png, c.png)를 얻을려고 하는경우 HTTP의 요청순서는 다음 그림과 같다.
```
| --- a.png --- |

            | --- b.png --- |


                        | --- c.png --- |
```
순서대로 첫번째 이미지를 요청하고 응답받고 다음 이미지를 요청하게 되는데 만약 첫번째 이미지를 요청하고 응답이 지연되면 아래 그림과 같이 두,세번째 이미지는 당연히 첫번째 이미지의 응답처리가 완료되기 전까지 대기하게 되며 이와 같은 현상을 HTTP의 Head of Line Blocking 이라 부르며 파이프 라이닝의 큰 문제점 중 하나이다.
```
| ------------------------------- a.png --------------- --- |

                                                       | -b.png- |


                                                               | --c.png-- |
```

### HTTP1의 단점 : RTT( Round Trip Time ) 증가 
앞서 말한것처럼 http/1.1의 경우 일반적으로 하나의 connection에 하나의 요청을 처리 한다.  이렇다 보니 매 요청별로 connection을 만들게 되고 TCP상에서 동작하는 HTTP의 특성상 3-way Handshake 가 반복적으로 일어나고 또한 불필요한 RTT증가와 네트워크 지연을 초래하여 성능을 저하 시키게 된다.
 - RTT란  패킷망(인터넷) 상에서 상대측 호스트까지 패킷이 왕복하는데 걸리는 시간
 - RTO란, 전송된 한 세그먼트에 대한 확인응답을 기다려야 하는 시간 

### HTTP1의 단점 : 무거운 Header 구조 (특히 Cookie) 
http/1.1의 헤더에는 많은 메타정보들이 저장되어져 있다.  사용자가 방문한 웹페이지는 다수의 http요청이 발생하게 되는데 이 경우 매 요청시 마다 중복된 헤더값을 전송하게 되며(별도의 domain sharding을 하지 않았을 경우) 또한 해당 domain에 설정된 cookie정보도 매 요청시 마다 헤더에 포함되어 전송되며 어쩔땐 요청을 통해서 전송하려는 값보다 헤더 값이 더 큰경우도 비일비재 하다.

### HTTP1의 단점을 극복하기 위한 방법 
 - Image Spriting 
 - Domain Sharding(한 도메인당 6개의 동시 다운로드를 제공하므로)
 - Minify CSS/Javascript 
 - Data URI Scheme: HTML문서내 이미지 리소스를 Base64로 인코딩된 이미지 데이터로 직접 기술하는 방식이고 이를 통해 요청 수를 줄이기도 한다.
 - Load Faster : 스타일시트를 HTML 문서 상위에 배치 / 스크립트를 HTML문서 하단에 배치 
 
### HTTP/2 구조 : TLS  
TLS는 전송계층(Transport Layer)의 암호화 방식이기 때문에 HTTP뿐만 아니라 FTP, XMPP등 응용 계층(Application Layer)프로토콜의 종류에 상관없이 사용할 수 있다는 장점이 있으며 기본적 으로 인증(Authentication), 암호화(Encryption), 무결성(Integrity)을 지원합니다.중간자 공격 방지

<p align="center">
<img src="https://camo.githubusercontent.com/e63638a9bb23457323253fb94e3b56198ae979d4/68747470733a2f2f7777772e6c6573737469662e636f6d2f646f776e6c6f61642f6174746163686d656e74732f31383231393438362f696d616765323031342d372d33302532303233253341323925334131382e706e673f76657273696f6e3d31266d6f64696669636174696f6e446174653d31343036373330333739303030266170693d7632" width="700px">
</p>   

#### TLS의 작동 방식
통신 세션이 맨 처음 시작할 때만 비대칭 암호화를 사용
 - 비대칭 암호화(공용키, 개인키) 공개키 암호화 방식임.(대칭키는 누군가가 중간에 대칭키를 획득하면 쉽게 풀리는 단점이 있음.)
 - 비유하자면 공용 키는 전면에 넣을 수 있는 구멍이 있는 잠겨진 우편함에 대한 정보이고 개인 키는 그 우편함을 열 수 있는 키라고 생각하면 된다.  
 - 그 이후부터는 패킷 암호화에 서버와 클라이언트가 사용할 하나의 ‘세션 키’에 합의하기 위해 양쪽이 나누는 대화를 암호화하는 것이다. 서버와 클라이언트 공유된 키를 사용하는 암호화를 ‘대칭 암호화’라고 한다.(대칭키를 교환, 디피-헬만키 교환 또는 RSA알고리즘 사용) 그 이후 핸드쉐이크 종료 및 대칭키 서로 보유  

### HTTP2 특징
 - Multiplexed Streams, 한 커넥션으로 동시에 여러개의 메세지
 - Stream Prioritization : 리소스간 의존관계(우선순위)를 설정
 - 서버는 클라이언트의 요청에 대해 요청하지도 않은 리소스 푸시
 - Header Compression : HTTP/1.x의 경우 두개의 요청 Header에 중복값이 존재해도 그냥 중복 전송한다. 하지만 HTTP/2에선 Header에 중복값이 존재하는 경우 Static/Dynamic Header Table 개념을 사용하여 **중복 Header를 검출**하고 중복된 Header는 index값만 전송하고 중복되지 않은 Header정보의 값은  Huffman Encoding 기법으로 인코딩 처리 하여 전송한다. 

#### 허프만 인코딩 기법(허프만코드)
트리들의 집합을 유지하면서 매 단계에서 가장 frequency가 작은 두 트리를 찾아 두 트리를 하나로 합치기 때문에 적합한 자료구조는 최소힙(min-heap)이 됩니다. 즉, 힙에 저장된 각각의 원소들은 하나의 트리인 특직이 있습니다. 
문자의 빈도 또는 확률정보를 이용해 통계적 압축하는 방법
1. 주어진 텍스트에서 각 문자의 출현 빈도수를 계산합니다.
2. 각 문자의 빈도수를 이용하여 허프만트리를 생성하여 각 문자에 이진코드를 부여 
![허프만인코딩](https://t1.daumcdn.net/cfile/tistory/99839F435BD6F62603)

## DIP(Dependency Inversion Principle) 의존 역전 원칙 
자신보다 변하기 쉬운 것에 의존하던 것을 추상화된 **인터페이스나 상위 클래스**를 두어 변하기 쉬운 것의 변화에 영향받지 않게 하는 것이 의존 역전 원칙, 타이어를 갈아끼울 수 있는 틀을 만들어 놓는 것. 
상위 계층이 하위 계층의 구현으로부터 독립, 및 세부사항에 의존하지 않음. 
```js
export default class Mailer { 
}
import Mailer from './services/Mailer'
container.register('service.mailer', Mailer)
```

## 웹리소스와 DNS / 렌더링, 하드웨어 가속  

### 웹리소스 과정 
리디렉션 > 앱캐시확인 > DNS > TCP > request > response > TTFB
1. Queuing : 우선순위, 하나의 브라우저는 6개까지 연결가능(HTTP), 캐시를 만드는데 시간
2. Stalled/Blocking
3. Proxy Negotiation
4. DNS Lookup
5. TCP
6. TTFB(Time To First Byte)

### DNS
 - 도메인 : IP주소를 문자열로 매핑한것으로 이를 찾아주는 서버
 - 많은 Name Server가 계층구조로 되어있다.  
 - UDP, 캐싱기능, TTL(Time to Live, IP 패킷 내에 있는 값으로 그 패킷이 네트워크 내에 어느정도 있어야 하는가. ) 설정하고 시간이 지나면 data 삭제함
 - DNS쿼리 > Root DNS > .com DNS > .com 을 거쳐 완벽한 주소 쿼리 > Request Router가 요청한 주소에 대한 캐싱여부 확인 > DNS서버의 IP주소 기반의 위치정보를 기반으로 서버를 찾아 제공한다.(DNS 기반 Request Routing) 이 때 DNS 서버의 IP주소가 아니라 유저의 IP주소를 기반으로 하는 것을 Service-based Request Routing이라 하며 실제 IP를 위해 한번 더 요청을 해서 받는게 특징이다.  
 
### 브라우저구조
브라우저는 아래와 같은 요소로 이루어져 있습니다.
![브라우저의구조](https://d2.naver.com/content/images/2015/06/helloworld-59361-1.png)
1. 사용자인터페이스는 URI로 받은 요청을 처리하고 
2. 브라우저엔진은 사용자인테페이스와 렌더링 엔진을 이어주는 다리 역할을 하며 자료저장소와도 데이터를 공유합니다. 
3. 자료저장소는 `localStroage, cache` 등의 자료를 저장하는 것을 담당합니다. 
4. 렌더링 엔진은 아래 설명할 렌더링 과정을 담당하고 네트워크통신, 자바스크립트 해석기, 
5. UI 백엔드로 화면을 이루는 `HTML, AJAX, JS`등이 합쳐져 만들어지게 됩니다. 

파이어폭스는 게코엔진, 사파리와 크롬은 웹킷이란 엔진을 사용합니다. 또한 IE는 Trident를 씁니다. 여기서는 크롬, 웹킷을 기준으로 설명합니다. 

크롬의 경우 위와 같이 HTML과 CSS가 다 따로 따로 일어나다 DOM트리를 구축하고 렌더트리를 구축하는 것을 볼 수 있습니다. 이 과정을 좀 더 자세히 보겠습니다.  

### 브라우저 렌더링 과정
1.	DOM 트리 구축 : 하나의 html페이지는 div, span 등 각각의 요소들을 가지고 있습니다. 그러한 요소들이 토큰화과정을 거쳐 하나하나 Node객체로 설정되고 이것들이 트리형태로 저장이 됩니다. 이를 DOM트리라고 합니다. 예를 들어 div > span, span 이라는 요소가 있다면 div라는 부모노드 밑에 span이라는 자식노드가 2개 생기는 것입니다.
2.	`Recalculate Style` : 각각의 Node는 CSS파서에 의해 정해진 스타일 규칙의 결과인 `CSSOM`이 있습니다. 이 `span.color = “red”`라고 하면 이 노드의 색깔은 빨간색이다 등을 말하는 것이죠. 이 규칙에 따라 DOM트리내에 있는 노드와 함께 Render Object가 생성되며 이를 모아 병렬적인 렌더트리(Render Tree)가 생성 됩니다. 이 때 `display:none`이 포함된 노드는 지워지고 font-size 등 상속 스타일 부모에만 위치하게설계하는 등의 최적화를 거쳐서 렌더트리를 통해 렌더레이어가 완성됩니다. 참고로 그렇기 때문에 렌더레이어와 렌더오브젝트는 1:1대응이 아니게 됩니다. `display:none` 으로 사라질 수도 있기 때문입니다. 참고로 `visibility:hidden`은 `display:none`과 다르게 보이지는 않지만 비어있는 영역으로 자리를 차지하는게 다릅니다.하지만 DOM트리와 노드는 1:1 대응이 됩니다.  이렇게 렌더트리가 생성된 후 그 후 렌더레이어에 올려지게 됩니다. 
하지만 이 때 GPU에서 처리되는 부분(`CSS3D / video & canvas / filter / animation / transform : transelateZ(0)` 등)이 있으면 이 요소들은 강제적으로 Graphic Layer로 분리됩니다. (이를 하드웨어 가속 대상을 적용했다고 한다고 일컫는다.)
3.	렌더레이어를 대상으로 Layout설정(좌표 설정, 보통 부모를 기준으로 설정됨 / Global Layout이 변경될 때는 브라우저의 사이즈가 증가 하거나 폰트사이즈를 증가시키면 변경됩니다 ) (1000개 이하의 DOM이 효율적)
4.	렌더레이어를 대상으로 paint(한 픽셀 한 픽셀 인쇄하는 듯 칠해지게 됩니다) 레스터화라고도 합니다. (GPU Rasterization를 이용하면 더 빠름. `view-port content="width=device-width"`를 사용하면 됨.) 
5.	composite layers , 이 레이어들은 각각 독립적으로 비트맵으로 출력이 되어 각각 색깔을 가지게 됩니다. 이 후 GPU에 텍스처(비트맵이미지)로써 업로드되어서 각각의 레이어들이 합쳐지게 됩니다. 이 때 렌더레이어와 그래픽레이어들이 합쳐지게 되며 화면이 됩니다.(레이어는 30개 이하의 레이어가 효율적입니다.)
 
따라서 그래픽레이어에 올린 요소들은 layout과 paint과정은 거치지 않고 composite layer과정만 거치게 됩니다.이 랜더레이어의 과정은 메인쓰레드,composite 과정은 compositor 쓰레드(`scrolling, animation, zoomIn/ out`를 독자적으로 처리할 수 있는 쓰레드)에서만 이뤄지기 때문에 메인 쓰레드의 부담을 줄일 수 있는 장점 또한 가지게 됩니다. 

이렇듯 화면이 구성될 때 랜더링레이어와 그래픽레이어로 분리되며 구성이 되는데 렌더링레이어에 포함이 된 DOM이 의 레이아웃의 변화가 생기면 layout부터 시작해서 다시 설정하는 것이 reflow, 화면의 색깔 등의 변화가 일어나면 repaint가 일어납니다. 

reflow의 경우 `height, width, padding`등의  요소를 수정하면 일어나게 되며 
repaint의 경우 `backgroundColor, color` 등 색깔에 관한 요소들을 수정하면 일어나게 됩니다. 

이렇듯 화면의 레이아웃의 변화가 생기면 layout부터 시작해서 다시 설정하는 것이 reflow 화면의 색깔 등의 변화가 일어나면 repaint가 일어나는 것입니다.  
하지만 이것들이 렌더링레이어가 아닌 그래픽레이어에 포함된다면 트리내에서 다시 수정하는 과정이 일어나지 않기 때문에 리플로우와 리페인트가 일어나지 않고 GPU하드웨어 가속이 적용되어 성능이점을 가져올 수 있습니다. 
 - 하드웨어 가속 : 특정작업을 CPU가 아닌 다른 특별한 장치를 통해 수행속도를 높이는 것.    

예를 들어, 
```css
@keyframes swim {
  from {
    top:0px;
  }
  to {
    top:200px;
  }
}
```
이것 보다는 transform을이용해서 y축을 움직여야 합니다. 
또한 이걸 응용해서 어떠한 요소를 style="transform:translateZ(0);"를 통해 스타일에 CSS 3D속성인 translateZ를 걸게 되면 해당요소는 하드웨어 가속대상이 되게 되며 그 대상이 움직이거나 그럴 때 repaint와 reflow가 일어나지 않아 효율적이게 됩니다. 
그러나 이렇게 GPU 하드웨어 가속에 걸게 되면 깜빡거릴 수도 있으며, 성능이 낮은 기기에서는 성능저하를 가져올 수 있습니다. 따라서 하드웨어 가속을 적용하는 요소의 크기를 줄이고 화면에서 몇개 단위로 구성하는 것이 좋으며 기기에 따라 선별적인 하드웨어 가속을 해야 합니다.최적화방법은 애니메이션이 들어간 노드는 가급적 `position:fixed, absolute` / 최대한 DOM 구조 상 끝단에 위치해야 합니다.

중요한점은 
이 과정을 vSync 안에서 즉, 16.6ms안에 끝내야 합니다. 
그래픽드라이버를 통해 모니터를 업데이트하는데 Appdata >> swap(back buffer >> front buffer) >> monitor를 통해 화면을 업데이트한다. 
1 / 60초  16.6ms마다 발생하기 때문에 그 안에 모든 과정을 다 끝내야 합니다.
 
## PWA
웹의 장점과 앱의 장접을 결합한 환경, 앱 아이콘을 추가 / 푸시 / 오프라인에서도 가능 
서비스 워커, 브라우저가 백그라운드에서 실행하는 스크립트

## DB - 타임라인 설계
```
msg = {
  from: "Joe"
  to: ["Bob", "Jane"],
  sent: new Date(),
  message: "Hi!",
}
```

```
//Send a message
for (recipient in msg.to){
  msg.recipient = msg.to[recipient]
  db.inbox.insert(msg);
}

//Read Bob's inbox
db.inbox.find ({recipient: "Bob"}).sort({ sent:-1})
```

## DB - ACID 
하나의 논리적 기능을 수행하기 위한 작업의 단위로, DB의 일관된 상태를 또 다른 일관된 상태로 변환시키는 기능을 수행, 병행으로 처리할 때 어떤 트랜잭션이 특정 DB의 데이터를 사용할 때 DB의 일정부분을 Lock시키고 트랜잭션이 완료될때 해당부분을 Unlock시키는 방법으로 트랜잭션의 오류 방지
 - 원자성(Atomicity)은 트래잭션과 관련 된 일들이 모두 수행되었거나 안되었거나
 - 일관성(Consistency), 시스템이 가지고 있는 고정요소는 언제나 동일하다. 
 - 독립성(Isolation)은 트랜잭션 수행시 끼어들지 못한다.  복수의 병렬 트랜잭션은 서로 격리되어 마치 순차적으로 실행되는 것처럼 작동되어야 한다. 
 - 지속성(Durability)은 성공적으로 수행된 트랜잭션은 영원히 반영 

## DB - 무결성
무결성이란 데이터의 정확성, 일관성, 유효성을 유지하는 것을 말하며 무결성이 유지가 되어야 DB에 저장된 데이터 값과 거기에 해당하는 현실 세계의 실제값이 일치하는지 신뢰할 수 있습니다. 데이터의 무결성을 유지하기 위해 DBMS에서는 크게 4가지 종류로 구분한다.
 - 개체 무결성 : 기본키로 선택된 필드는 빈 값을 허용하지 않는다.
 - 참조 무결성 : 서로 참조 관계에잇는 두 테이블의 데이터는 항상 일관된 값을 유지한다.
 - 도메인 무결성 : 테이블에 존재하는 필드의 무결성을 보장하기 위한 것으로 올바른 데이터가 입력됬는지를 체크하는 것이다.
 - 고유 무결성 : 특정 속성에 대해 고유한 값을 가지도록 조건이 주어진 경우 그 속성값은 모두 고유한 값을 가진다. 같으면 안되는 것
 - NULL 무결성 : 특정 속성값에 NULL이 올 수 없다는 조건이 주어진 경우 그 속성값은 NULL이 될 수 없다는 제약조건
 - 키 무결성 : 한 릴레이션에는 최소한 하나의 키가 존재해야하는 제약조건

## DB - 데드락
 - T1 : write(A) read(B)
 - T2 : read(B) read(A)

위와 같은 트랜잭션이 있다고 하면 T1은 A를 로킹해두고 B의 로킹해제를 기다려야하고 T2는 B를 로킹해두고 A를 기다려야한다. 이 때 두 트랜잭션이 무한정 대기해야하는 상황이 발생하는데 이것을 데드락이라고 한다. (해결방법 : 이 경우 T1, T2중 하나를 ROLLBACK하고 나머지 하나를 완료시킨 후 ROLLBACK한 트랜잭션을 다시 실행시킨다.)
 - 로킹 : 하나의 트랜잭션이 데이터를 엑세스 하는 동안 다른 트렌잭션이 그 데이타 항목을 액세스 할 수 없도록 하는 병행 제어 기법

![DB-master,slave](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FceKJsj%2FbtqwhVhCOBZ%2FuPK5tKNtwc1VJcLp5TBN81%2Fimg.png)

데드락을 없애기 위해 탐지나 회피를 사용하는데 탐지인 경우 알고리즘을 통해 매번 데드락인지 아닌지 검사를 해야하므로 코스트가 크며 facebook처럼 write보다 read가 월등히 많은 경우 Read용 DB를 slave로 두고 로드를 모두 몰아주고 write를 Master로 보내고 DB를 동기화 할 수도 있습니다. 
 - 마스터, slave :  DB 서버를 여러대 둬서, replication(리플리케이션)을 통해 DB서버의 부하를 줄이는 방법, slave는 read용도로 두면 된다.  replication이 마스터, 받는 녀석이 slave이다. 이외에도 백업용으로도 쓰인다. 또한 DB 클러스터링이라는 것은 고가용성, 병렬처리를 위해 하나의 DB를 여러개의 서버가 나눠서 처리하는 것을 말한다. 

## DB - PK, FK, ER 모델
 - Primary Key : 테이블에서 각 Row(행)을 유일하게 구분하는 Column-Key
 - Foreign Key : 테이블과의 링크를 다는 것. `FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)`
 - ER(Entity-Relation) 모델 : 개체-관계 모델, 데이터베이스를 설계할 때 사용하는 모델 중 하나

![ERD](https://d2slcw3kip6qmk.cloudfront.net/marketing/pages/chart/examples/erdiagramexample.png)
![표기법](https://t1.daumcdn.net/cfile/tistory/254BA95057ECA9942E)
## DB - union과 union all
- 공통제약조건 : select절의 칼럼 수와 데이터타입이 호환 가능해야함
- union : 여러 SQL문의 합집합. 중복된 행은 제거하여 하나의 행만 표시된다.
- union all : 여러 SQL문의 합집합. 단순히 합쳤기에 중복된 행도 모두 표시된다.

## DB - JOIN
![흠냐](https://i.stack.imgur.com/VQ5XP.png)
 - inner : 두테이블의 교집합을 중심으로 
 - outer : 두테이블의 합집합을 중심으로.`while a.key is null or b.key is null`
 - right, left : 오른쪽, 왼쪽 테이블 기준 

## DB - 용어
 - DDL (Data Definition Language) : 테이블 및 객체의 구조 생성 그리고 삭제, 변경과 관련된 명령어.create, drop, alter
 - DML : 데이터 조작 및 검색에 관한 명령어. select, update, insert
 - DCL : 권한과 관련된 명령어, commit, revoke, grant

## JWT
 - 웹표준 (RFC 7519)
 - 자가수용적(토큰에 대한 기본정보(헤더), 메세지, signature)
 - 쉽게 전달가능, HTTP의 헤더, URL 의 파라미터
 - 세션유지 필요x, 토큰만 확인하면 회원인증가능
 - 정보교류에 사용가능 
 
## 제너레이터와 코루틴(세미)
1. yeild문이 발동하면 스택프레임에 복사를 하고 콜스택에서는 제거를 합니다.
2. 그리고 next()문이 발동하면 스택프레임을 복원하여 실행해서 진입점을 개발자가 원하는 데로 실행이 가능하게 설계할 수 있습니다. 
 
 > 코루틴 : 진입점을 개발자가 원하는 데로 실행이 가능하게 설계하는 것 

이 코루틴 덕에 이터레이러를 이용해서 **지연평가**라는 것이 가능합니다.

 > 지연평가를 하면 range함수를 만드는데서 성능에서의 장점 로직구현이 좀 더 효율적이게 됩니다. 왜냐하면 파이프라인에서 제너레이터로 연결된 함수들이 합쳐지는 듯한 효과를 내기 때문입니다. 
 
### 이터러블/이터레이터 프로토콜
 - 이터러블: 이터레이터를 리턴하는 `[Symbol.iterator]()`라는  키를 가진 값이자 반복할 수 있는 순차적인 객체
 - 이터레이터: `{ value, done }` 객체를 리턴하는 `next()` 를 가진 값
 - 이터러블/이터레이터 프로토콜: 이터러블을 `for...of`, `전개 연산자` 등과 함께 동작하도록한 규약

 > ... 전개연산자는 적용되는 공간에서의 인수들(배열, key-value)에 따라 그 공간에 맞는 인수 또는 요소로 확장할 수 있게 합니다. 전개연산자는 이렇게 활용할 수도 있습니다. const [head, ...tail] = f();


## 클로저
클로저는 독특한 함수체제를 멋지게 활용할 수 있습니다. 
 - 프라이빗 변수를 모방 
 - 가상의 블록 스코프 변수를 생성  

클로저란 내부함수가 외부함수의 실행컨텍스트가 소멸해도 `[[scope]]`프로퍼티가 가리키는 외부함수의 실행환경은 소멸하지 않고 참조할 수 있는 것을 말합니다. 스코프체인이 형성될 때 `[[scope]]`로 참조할 수 있는데 이를 이용해 참조할 수 있는 것을 말합니다.

클로저를 통해 내부 변수를 참조하는 동안에는 내부 변수가 차지하는 메모리를 GC가 회수하지 않는다. 따라서 클로저 사용이 끝나면 참조를 제거하는 것이 좋다.

```js
const add = (function () {
    let counter = 0;
    return function () {
        counter += 1; 
        return counter;   
    }
})();
console.log([add(), add(), add()]) //[1, 2, 3]
add = null 
```

아래는 가상의 블록 스코프를 얘기함. 
```js
var funcs = [];

// 함수의 배열을 생성하는 for 루프의 i는 전역 변수다.
for (var i = 0; i < 3; i++) {
  (function (index) { // index는 자유변수다.
    funcs.push(function () { console.log(index); });
  }(i));
}

// 배열에서 함수를 꺼내어 호출한다
for (var j = 0; j < 3; j++) {
  funcs[j]();
}
```

## 실행컨텍스트
자바스크립트(JavaScript)는 코드 실행에 필요한 정보들을 물리적인 객체인 EC,실행컨텍스트(Execution Context) 를 통해서 관리합니다. 이 EC들이 Call Stack에 쌓여서 순차적으로 실행이 됩니다.
초기에는 Global Object인 빌트인 객체(Math, String, Array 등)와 BOM, DOM이 있지만 추후 EC들이 쌓여서 실행 됩니다.

EC는 스코프체인, Variable Object, this로 구성이 되며 1. 스코프체인생성과 초기화 2. Variable Object 형성 3. this value 결정이 순차적으로 결정됩니다.

### 1. 스코프체인
함수의 스코프 주소를 차례대로 담은 리스트입니다. 순차적으로 탐색하며 해당 주소, 즉 `[[scope]]`로 참조가 가능합니다. 현재 실행 컨텍스트의 활성 객체(AO)를 선두로 하여 순차적으로 상위 컨텍스트의 활성 객체(AO)를 가리키며 마지막 리스트는 전역 객체(GO)를 가리킵니다. (AO나 GO모두 아직 값은 정해지지 않았고 빈 껍데기일 뿐입니다.)

좀 더 자세히 말하자면, 자신의 실행환경, 자신을 포함하는 외부실행환경, 전역객체를 순차적으로 가리키며 리스트를 만들게 됩니다. 이렇게 변수를 찾는 과정을 스코프체이닝이라고 합니다. 

### 2. Variable Object
각각 AO, GO의 프로퍼티들에 대해 값이 채워집니다.
 - Activation Object : 함수선언(표현식은제외), Arguments, 변수를 포함합니다.
 - Global Object : 전역변수들을 포함합니다.

이러한 Variable Object가 형성되는 과정
1. 함수인 경우 매개변수가 property로 그 값인 argument가 값으로 설정됩니다.
2. 대상 코드 내의 함수 선언(함수 표현식 제외)을 대상으로 함수명이 Variable Object의 프로퍼티로, 생성된 함수 객체가 값으로 설정됩니다. 그리고 이 함수는 실행할 수 있습니다.(함수 호이스팅)
3. 대상 코드 내의 var로 이루어진 변수 선언을 대상으로 변수명이 Variable Object의 프로퍼티로, undefined가 값으로 초기화됩니다. (변수 호이스팅)
4. this 설정,함수 호출 패턴에 따라 달라지거나 화살표함수의 경우 lexical scope를 참조합니다. 

## this
1. 호출된 곳 : 그 생성자 함수 또는 객체로 인해 생성된 객체 또는 런타임
2. call과 apply, bind
```js
function a(c, d){ 
    const b = [this.name, this.adjective, '이가 춤을 춥니다.', c, d].join(' ') 
    return b;  
} 
const 큰돌 = {
  name: '큰돌', adjective: '아주 이쁘게'
};
console.log(a.apply(큰돌, ["하지만 혼자", "외롭게 말이죠"]));  
console.log(a.call(큰돌, "하지만 혼자", "외롭게 말이죠"));   
console.log(a.bind(큰돌)("하지만 혼자", "외롭게 말이죠"));
```
3. 이벤트 함수의 this
```js
function add(c, d, fn) {
	return fn(c + d);
}  
let user = {
	a:2,
	b:3,
	add() {
        console.log(this)  //user 객체
	    add(this.a, this.b, function(total){ //이 add함수 자체가 window에서 실행되기 때문이다. 
            console.log(this) // window
        })
	}
}
``` 

## 이벤트위임 
```js
  document.addEventListener('DOMContentLoaded', function() { 
    app.addEventListener('click', function(e) {
      if (e.target && e.target.nodeName === 'LI') {
        let item = e.target;
        alert('you clicked on item: ' + item.innerHTML);
      }
    });
  });
```

## 마크업이미지 
 - GIF(지원색상 : 8비트) : 다양한 색상의 이미지에는 적절x 
 - JPEG(지원색상 : 24비트) : 대중적으로 사용 
 - PNG : GIF와 JPEG의 장점을 합친 파일 형식 PNG-8과 PNG-24로 나눠짐 
 - 파일용량 : PNG-8 / GIF / JPEG / PNG-24
 - 이미지품질 : GIF / PNG-8 / JPEG / PNG-24(반투명이미지 Best)
 

# 자료구조 
효율적인 접근 및 수정을 가능케 하는 자료의 조직, 관리, 저장을 의미하며 데이터를 어떤 구조로 저장하고, 탐색하고, 삭제해야 가장 효율적일까에 대한 질문의 답

## 리스트    
리스트란 같은 값이 한번 이상 존재할 수 있고 순서가 있는 일련의 값이 모여있는 추상적 자료형, ADT

### 1. 연결리스트
배열은 순차적인 형태의 데이타를 그 자체로 메모리에 올려서 접근하고 처리할 수 있는 목적으로 사용, 연결리스트의 경우 각각의 데이터를 포인터로 연결해서 공간적인 효율성을 극대화 시킬 수 있는 방법이라고 할 수 있습니다.  
삽입과 삭제, O(1) 그러나 랜덤액세스가 되지 않으며 탐색: K번째 값을 찾기 위해서는 O(K)가 걸린다.
prev가 있는 것을 이중연결리스트, 마지막 노드의 next가 다시 첫번째 노드를 가리키는 형태를 원형 연결 리스트
```js
// Construct Single Node
class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  insertFirst(data) {
    this.head = new Node(data, this.head);
    this.size++;
  }
  insertLast(data) {
    let node = new Node(data);
    let current;
    if (!this.head) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }
  insertAt(data, index) {
    if (index > 0 && index > this.size) {
      return;
    }
    // If first index
    if (index === 0) {
      this.insertFirst(data);
      return;
    }
    const node = new Node(data);
    let current, previous;
    // Set current to first
    current = this.head;
    let count = 0;
    while (count < index) {
      previous = current; // Node before index
      count++;
      current = current.next; // Node after index
    }
    node.next = current;
    previous.next = node;
    this.size++;
  }
  // Get at index
  getAt(index) {
    let current = this.head;
    let count = 0;
    while (current) {
      if (count === index) {
        console.log(current.data);
      }
      count++;
      current = current.next;
    }
    return null;
  }
  removeAt(index) {
    if (index > 0 && index > this.size) {
      return;
    }
    let current = this.head;
    let previous;
    let count = 0;
    // Remove first
    if (index === 0) {
      this.head = current.next;
    } else {
      while (count < index) {
        count++;
        previous = current;
        current = current.next;
      }

      previous.next = current.next;
    }
    this.size--;
  }
  clearList() {
    this.head = null;
    this.size = 0;
  }
  printListData() {
    let current = this.head;
    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }
}
``` 
### 2. 배열
랜덤 엑세스가 가능합니다. 인덱스 값을 알고 있다면 탐색의 경우 O(1),삽입과 삭제, O(K)가 걸립니다.  

데이터 추가와 삭제를 많이 하는 것은 연결리스트, 탐색을 많이 하는 것은 배열로 하는것이 좋습니다.  

## 해시테이블
 - 장점 :  예컨대 해시함수로 하드디스크나 클라우드에 존재하는 무한에 가까운 데이터(키)들을 유한한 개수의 해시값으로 매핑함으로써 작은 크기의 캐쉬 메모리로도 프로세스를 관리할 수 있게 됩니다.
 - 매핑 전 원래 데이터의 값을 키(key), 매핑 후 데이터의 값을 해시값(hash value), 매핑하는 과정 자체를 해싱(hashing)라고 합니다.
 - 해시함수(hash function)란 데이터의 효율적 관리를 목적으로 임의의 길이의 데이터를 고정된 길이의 데이터로 매핑하는 함수입니다. 
 - 데이터 액세스(삽입, 삭제, 탐색)시 계산복잡성을 O(1)을 지향
 - 해시테이블을 다른 자료구조와 비교해보겠습니다. 이진탐색트리와 그 변형의 경우 메모리를 효율적으로 사용하는 편이지만 데이터 탐색에 소요되는 계산복잡성은 O(logn)입니다. 배열(array)의 경우 데이터 탐색에 따른 계산복잡성은 O(1)이지만, 메모리를 미리 할당해 둬야 하기 때문에 공간 효율적이라고 말하기 어렵습니다.
 - 해시함수를 사용하여 키를 해시값으로 매핑하고, 이 해시값을 색인(index) 혹은 주소 삼아 데이터의 값(value)을 키와 함께 저장하는 자료구조를 해시테이블(hash table)
 - chaining - 해시충돌해결, 체인으로 노드를 추가한다. 버킷의 요소들을 탐색해야 해서 O(1+α)가 됨(α = n / m)
 - open addressing - 해시충돌해결, 해시 테이블 내의 새로운 주소를 찾아 입력, 주소를 +1, ^2를 찾거나 처음부터 2개의 해시함수준비, 해시테이블을 늘리는 방식이 있다.  success : 1 / α * (ln(1 / 1- α)), fail : 1 / α 
 - 해시함수 - 해시충돌해결, 2의 제곱수, 나머지, 다수의 해시함수의 집합 중 해시함수를 선택해 해시값을 만드는 기법

```js
const hash = (key, size) => {
    let hashedKey = 0
    for (let i = 0; i < key.length; i++) {
        hashedKey += key.charCodeAt(i)
    }
    return hashedKey % size
}
class HashTable {
    constructor() {
        this.size = 20
        this.buckets = Array(this.size)
        for (let i = 0; this.buckets.length; i++) {
            this.buckets[i] = new Map()
        }
    }
    insert(key, value) {
        let idx = hash(key, this.size)
        this.buckets[idx].set(key, value)
    }

    remove(key) {
        let idx = hash(key, this.size)
        let deleted = this.buckets[idx].get(key)
        this.buckets[idx].delete(key)
        return deleted
    }
    search(key) {
        let idx = hash(key, this.size)
        return this.buckets[idx].get(key)
    }
} 
```

### 유니코드
아스키코드의 경우, 128개의 코드가 정리되어 있는 코드표가 있다.
EUC-KR/CP949의 경우, 2바이트로 표현할 수 있는 코드표가 있는 것이다.
UTF-8/UTF-16등의 인코딩은 U+로 시작되는 코드표가 존재하고, 이를 유니코드라고 말한다. UTF같은 인코딩은 같은 유니코드표를 가지고 다르게 표현하는 방법인 것이다.

## 그래프
단순히 노드(N, node)와 그 노드를 연결하는 간선(E, edge)을 하나로 모아 놓은 자료 구조
![그래프와 트리차이](https://gmlwjd9405.github.io/images/data-structure-graph/graph-vs-tree.png)
- 정점(vertex): 위치라는 개념. (node 라고도 부름)
- 간선(edge): 위치 간의 관계. 즉, 노드를 연결하는 선
- 무방향 그래프에 존재하는 정점의 모든 차수의 합 = 그래프의 간선 수의 2배
- 진입 차수(in-degree): 방향 그래프에서 외부에서 오는 간선의 수 (내차수 - 라고도 부름)
- 진출 차수(out-degree): 방향 그래픙에서 외부로 향하는 간선의 수 (외차수 - 라고도 부름) 
- 경로 길이(path length): 경로를 구성하는 데 사용된 간선의 수
- 단순 경로(simple path): 경로 중에서 반복되는 정점이 없는 경우
- 사이클(cycle): 단순 경로의 시작 정점과 종료 정점이 동일한 경우 
- 가중치 그래프는 네트워크라고도 한다. 
- 완전 그래프(Complete Graph), 모든 정점이 서로 연결되어 있는 그래프, 정점 수: n이면 간선의 수: n * (n-1) / 2 

## 트리
 - 리프노드 : 포레스트는 서로 독립인 트리들의 모임, 트리에서 루트를 지우면 완성 
 - 잎새노드(leaf node)란 자식노드가 없는 노드입니다. 
 - internal node란 잎새노드를 제외한 노드를 나타냅니다. 
 - 루트노드(root node)란 부모노드가 없는 노드를 가리킵니다.
 - 다수의 데이터를 빠르고 효율적으로 처리하기 위해 사용됩니다. 
부모 노드 밑에 여러 자식 노드가 연결되고, 자식 노드 각각에 다시 자식 노드가 연결되는 재귀적 형태의 자료구조다. 단, 자식 노드의 자식이 부모로 연결되는 경우는 보통 트리로 인정하지 않는다. 

### 트리의 높이
```c++
int dfs(int here){
    int h = 1;
    for(int there : adj[now]){
        if(visited[there]) continue; 
        h = max(h, dfs(there) + 1);
    }  
    return h;
}
```  
## BST
B-tree활용  
```js
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }
  insert(data, node = this.root) {
    if (!this.root) {
      this.root = new Node(data);
      return;
    }
    if (node === null) return new Node(data);
    if (data < node.data) node.left = this.insert(data, node.left);
    else if (data > node.data) node.right = this.insert(data, node.right);
    return node;
  }
  findMin(node = this.root) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }
  findMax(node = this.root) {
    let current = node;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
  find(data, node = this.root) {
    if (node === null) return null;
    else if (data < node.data) return this.find(data, node.left);
    else if (data > node.data) return this.find(data, node.right);
    else return node;
  }
  isPresent(data) {
    let current = this.root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }
  remove(data, node = this.root) {
    if (node == null) {
      return null;
    }
    if (data == node.data) {
      // node has no children
      if (node.left == null && node.right == null) {
        return null;
      }
      // node has no left child
      if (node.left == null) {
        return node.right;
      }
      // node has no right child
      if (node.right == null) {
        return node.left;
      }
      // node has two children - 오른쪽 트리중 가장 낮은 것을 뽑는다.
      node.data = this.findMin(node.right);
      node.right = this.remove(node.data, node.right);
      return node;
    } else if (data < node.data) {
      node.left = this.remove(data, node.left);
      return node;
    } else {
      node.right = this.remove(data, node.right);
      return node;
    }
  }
  isBalanced() {
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }
  findMinHeight(node = this.root) {
    if (node == null) {
      return -1;
    }
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  findMaxHeight(node = this.root) {
    if (node == null) {
      return -1;
    }
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }
  inOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traverseInOrder(node) {
        node.left && traverseInOrder(node.left);
        result.push(node.data);
        node.right && traverseInOrder(node.right);
      }
      traverseInOrder(this.root);
      return result;
    }
  }
  preOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePreOrder(node) {
        result.push(node.data);
        node.left && traversePreOrder(node.left);
        node.right && traversePreOrder(node.right);
      }
      traversePreOrder(this.root);
      return result;
    }
  }
  postOrder() {
    if (this.root == null) {
      return null;
    } else {
      var result = new Array();
      function traversePostOrder(node) {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node.data);
      }
      traversePostOrder(this.root);
      return result;
    }
  }

  levelOrder() {
    let result = [];
    let Q = [];
    if (this.root != null) {
      Q.push(this.root);
      while (Q.length > 0) {
        let node = Q.shift();
        result.push(node.data);
        if (node.left != null) {
          Q.push(node.left);
        }
        if (node.right != null) {
          Q.push(node.right);
        }
      }
      return result;
    } else {
      return null;
    }
  }
}
``` 
### AVL 트리(log N)
 - BST가 선형적인 트리형태를 가질 때 O(N)걸리는 것을 보완
 - 탐색/삽입/삭제 모두 시간 복잡도가 O(log N)
 - 삽입/삭제를 할 때마다 균형이 안맞는 것을 맞추기 위해 트리의 일부를 왼쪽 혹은 오른쪽으로 회전시켜야 한다. 균형은 아래에 나온 Red-black tree보다 훨씬 잘 잡히지만, 그렇기 때문에 Red-black tree보다 삽입과 제거가 느리고 탐색 자체는 빠르다. 
 

### 레드블랙트리(log N)
자가 균형 이진 탐색 트리의 일종으로, 노드에 색깔 속성이 붙은 트리이다. 이상적인 상황에서나 최악의 상황에서 탐색/삽입/삭제 모두 시간 복잡도가 O(log N) 이며 C++ STL의 set, multiset, map, and multimap이 이 레드블랙 트리를 이용하여 구현되었다. 균형이 맞지 않을경우 회전을 한다. 
 - 루트는 블랙이다.
 - 모든 리프노드는 블랙이다.
 - 노드가 레드이면 그 노드의 자식은 반드시 블랙이다.
 - 로트 노드에서 임의의 리프 노드에 이르는 경로에서 만나는 블랙 노드의 수는 모두 같다.
 
### B-tree (log N)
이진 트리를 확장한 개념, 균형잡힌 트리, 하나의 노드가 여러 데이타를 가질 수 있다. root 노드가 자식이 있다면 적어도 2개 이상의 자식을 가져야 한다. 한 노드에 M개의 자료가 배치되면 M차 B-Tree라고 한다. 
Root 노드를 제외한 모든 노드는 적어도 M/2개의 자료를 가지고 있어야 한다.
탐색은 BST처럼..!
![이진탐색트리](https://hyungjoon6876.github.io/jlog/assets/img/20180720/btree_3.png)

데이타 베이스 시스템의 대부분 인덱스가 이 B-tree로 구성되어있는데요. 해시인덱스도 있지만요. (해시함수의 결과값을 저장하므로 키 컬럼 값이 길어도 4 ~ 8바이트 수준으로 줄어드는 장점)

MongoDB의 인덱스 또한 B-Tree로 구현되어있다. 노드에 한 개의 데이타가 아닌 여러개의 데이타를 저장하는 버켓이라는 데이터 저장소를 사용한다
MongoDB에서 버켓이라는 메모리 블록을 사용하는 이유를 살펴보면 해쉬기법의 메모리 구성을 응용한 것과 같다. 근접한 키 값을 가지는 데이타를 한 버켓에 배치, B-TREE를 구성하기 위해 들어가는 링크 주소 영역을 줄일 수 있고 검색을 위한 깊이를 줄일 수 있다는 장점이 있다. 

인덱스 버켓에 키 값(데이터)를 저장하기 때문에, 도큐멘트에 저장된 데이터와 중복 저장된다는 점과 함께, 빠른 인덱스 검색을 위한 입출력 기술이 별도로 구현된 것이 아니라, 운영체제가 제공하고 있는 PageFault방식을 같이 사용하기 때문에 메모리가 부족한 시스템에서는 오히려 검색 속도를 저하시키는 단점이 되기도 한다. 

최악의 경우는 인덱스와 도큐먼트가 모두 메모리에 로드 되지 않았을 경우, 한개의 도큐먼트를 찾기 위해 2번의 page fault가 발생할 수 있다. 

#### 가상 메모리와 page fault
윈도우 운영체제의 가상 메모리(Virtual Memory)는 RAM을 관리하는 방법 중 하나로, 각 프로그램에 실제 메모리 주소가 아닌 가상의 메모리 주소를 할당하는 방식을 말한다. 

RAM의 부족한 용량을 보완하는 데 주로 쓰인다.윈도우 운영체제는 가동되고 있는 프로세스들의 내용(페이지) 중, 덜 중요한 것들을 하드 디스크의 공간에 옮겨 놓는다. 그리고 프로세스가 동작하는 도중, 메모리에 필요한 데이터(페이지)가 없으면 하드디스크를 찾아 해당 데이터를 가져온다. (이 과정에서 속도 저하가 발생. ROM이 RAM보다 느리기 때문.) 가상메모리의 동작 프로세스를 설명하기에 앞서, 프레임과 페이지에 대해 간략히 정리하려고 한다. 프레임과 페이지의 정의는 아래와 같다.

 - 프레임(Frame): 물리 메모리를 사용하는 최소 크기 단위.
 - 페이지(Page): 가상 메모리를 사용하는 최소 크기 단위.

먼저, 운영체제는 페이지 테이블(Page Table)로 가상 메모리를 관리한다. 페이지 테이블에는 각 페이지가 저장되어있는 주소값이 들어있다. 게다가, 페이지 테이블에는 Valid bit이 있어, 이를 이용해 해당 페이지가 어느 메모리에 있는지 표시할 수 있다. 그러므로 운영체제는 페이지 테이블로 가상 메모리에서 페이지를 쉽게 찾을 수 있다.

1. CPU는 물리 메모리을 확인하여 페이지가 없으면 trap을 발생하여 운영체제에 알린다.
2. 운영체제는 CPU의 동작을 잠시 멈춘다.
3. 운영체제는 페이지 테이블을 확인하여 가상 메모리에 페이지가 존재하는지 확인하고, 없으면 즉, valid bit이 없는 상태라면  프로세스를 중단한다.
4. 페이지 폴트(page fault)이면, 현재 물리 메모리에 비어있는 프레임(Free Frame)이 있는지 찾는다.
5. 비어있는 프레임에 해당 페이지를 로드하고, 페이지 테이블을 최신화한다. 
6. 중단되었던 CPU를 다시 시작한다.  

### 스택, Last In First Out 
재귀적인 함수, 알고리즘에 사용되며 웹 브라우저 방문기록 (뒤로가기), 실행취소(undo)라는 로직에 쓰인다.  
삽입 및 삭제O(1), 탐색 및 참조O(n)
### 큐, FIFO(First-In-First-Out) 
삽입 및 삭제O(1), 탐색 및 참조O(n)
 - 데이터가 입력된 시간 순서대로 처리해야 할 필요가 있는 상황에 이용한다.
 - 너비 우선 탐색(BFS, Breadth-First Search) 구현 
 - 캐시(Cache) 구현, 우선순위가 같은 작업 예약 (인쇄 대기열), 선입선출이 필요한 대기열 (티켓 카운터), 프로세스 관리 

### 힙
우선순위 큐 : 우선순위의 개념을 큐에 도입한 자료구조, 힙으로 구현된다. 
![우선순위 큐](https://gmlwjd9405.github.io/images/data-structure-heap/data-structure-heap-compare.png)
![구현효과적](https://gmlwjd9405.github.io/images/data-structure-heap/data-structure-heap-priorityqueue.png)
 - 힙을 저장하는 표준적인 자료구조는 배열 이다.
 - 구현을 쉽게 하기 위하여 배열의 첫 번째 인덱스인 0은 사용되지 않는다.
 - 특정 위치의 노드 번호는 새로운 노드가 추가되어도 변하지 않는다.
 - 예를 들어 루트 노드의 오른쪽 노드의 번호는 항상 3이다.
 - 힙에서의 부모 노드와 자식 노드의 관계
 - 왼쪽 자식의 인덱스 = (부모의 인덱스) * 2
 - 오른쪽 자식의 인덱스 = (부모의 인덱스) * 2 + 1
 - 부모의 인덱스 = (자식의 인덱스) / 2 

#### 힙(heap)의 삽입
힙에 새로운 요소가 들어오면, 일단 새로운 노드를 힙의 마지막 노드에 이어서 삽입한다. 이 새로운 노드를 부모 노드들과의 크기를 비교하며 교환해서 힙의 성질을 만족시킨다. 

#### 힙(heap)의 삭제
최대 힙에서 최댓값은 루트 노드이므로 루트 노드가 삭제된다.
그 이후 마지막 노드와 루트노드를 swap 이후 힙을 재구성한다.  
```js
class minHeap{
    constructor(capacity){
        this.heapSize = -1;
        this.heap = Array(capacity).fill(-1)
    }
    insert(value){
        if(this.heapSize+1==this.heap.length){
            throw "Overflow Size"
        }
        this.heap[this.heapSize+1] = value
        this.heapSize = this.heapSize + 1
        this.siftUp(this.heapSize);
    }
    swap(i,j){
        [this.heap[i],this.heap[j]] = [this.heap[j],this.heap[i]]
    }
    siftDown(index){
        let minIndex = index
        let n = this.heap.length
        let lc = 2*index + 1
        if(lc<=n-1 && this.heap[lc]<this.heap[minIndex])minIndex=lc
        let rc = 2*index + 2
        if(rc<=n-1 && this.heap[lc]<this.heap[minIndex])minIndex=rc

        if(minIndex != index){
            this.swap(index,minIndex)
            this.siftDown(minIndex)
        }
    }
    siftUp(index){
        let parent  = Math.ceil((index-1)/2)
        while(index>0 && this.heap[parent]>this.heap[index]){
            this.swap(index,parent)
            index = parent
            parent = Math.ceil((index-1)/2)
        }
    }
    extractMin(){
        result  = this.heap[0]
        this.heap[0] = this.heap[this.heapSize]
        this.heapSize = this.heapSize - 1
        this.siftDown(0)
        return result
    }

}

let mh = new minHeap(5)
mh.insert(4)
mh.insert(23)
mh.insert(8)
mh.insert(3)
mh.insert(6) 
```

# 알고리즘 

## 힙정렬 (logN)
완전 이진 트리의 일종인 힙을 이용한 정렬, 삽입, 마지막 노드에 삽입 이후 부모노드들과 교환하면서 스왑하면서 올라간다. 
삭제는 root를 삭제한 후 가장 아래 노드를 root로 swap한다 이후 그 노드를 왼쪽부터 시작해서 교환한다. 
```c++
// A C++ program to demonstrate common Binary Heap Operations 
#include<iostream> 
#include<climits> 
using namespace std; 
  
// Prototype of a utility function to swap two integers 
void swap(int *x, int *y); 
  
// A class for Min Heap 
class MinHeap 
{ 
    int *harr; // pointer to array of elements in heap 
    int capacity; // maximum possible size of min heap 
    int heap_size; // Current number of elements in min heap 
public: 
    // Constructor 
    MinHeap(int capacity); 
  
    // to heapify a subtree with the root at given index 
    void MinHeapify(int ); 
  
    int parent(int i) { return (i-1)/2; } 
  
    // to get index of left child of node at index i 
    int left(int i) { return (2*i + 1); } 
  
    // to get index of right child of node at index i 
    int right(int i) { return (2*i + 2); } 
  
    // to extract the root which is the minimum element 
    int extractMin(); 
  
    // Decreases key value of key at index i to new_val 
    void decreaseKey(int i, int new_val); 
  
    // Returns the minimum key (key at root) from min heap 
    int getMin() { return harr[0]; } 
  
    // Deletes a key stored at index i 
    void deleteKey(int i); 
  
    // Inserts a new key 'k' 
    void insertKey(int k); 
}; 
  
// Constructor: Builds a heap from a given array a[] of given size 
MinHeap::MinHeap(int cap) 
{ 
    heap_size = 0; 
    capacity = cap; 
    harr = new int[cap]; 
} 
  
// Inserts a new key 'k' 
void MinHeap::insertKey(int k) 
{ 
    if (heap_size == capacity) 
    { 
        cout << "\nOverflow: Could not insertKey\n"; 
        return; 
    } 
  
    // First insert the new key at the end 
    heap_size++; 
    int i = heap_size - 1; 
    harr[i] = k; 
  
    // Fix the min heap property if it is violated 
    while (i != 0 && harr[parent(i)] > harr[i]) 
    { 
       swap(&harr[i], &harr[parent(i)]); 
       i = parent(i); 
    } 
} 
  
// Decreases value of key at index 'i' to new_val.  It is assumed that 
// new_val is smaller than harr[i]. 
void MinHeap::decreaseKey(int i, int new_val) 
{ 
    harr[i] = new_val; 
    while (i != 0 && harr[parent(i)] > harr[i]) 
    { 
       swap(&harr[i], &harr[parent(i)]); 
       i = parent(i); 
    } 
} 
  
// Method to remove minimum element (or root) from min heap 
int MinHeap::extractMin() 
{ 
    if (heap_size <= 0) 
        return INT_MAX; 
    if (heap_size == 1) 
    { 
        heap_size--; 
        return harr[0]; 
    } 
  
    // Store the minimum value, and remove it from heap 
    int root = harr[0]; 
    harr[0] = harr[heap_size-1]; 
    heap_size--; 
    MinHeapify(0); 
  
    return root; 
} 
  
  
// This function deletes key at index i. It first reduced value to minus 
// infinite, then calls extractMin() 
void MinHeap::deleteKey(int i) 
{ 
    decreaseKey(i, INT_MIN); 
    extractMin(); 
} 
  
// A recursive method to heapify a subtree with the root at given index 
// This method assumes that the subtrees are already heapified 
void MinHeap::MinHeapify(int i) 
{ 
    int l = left(i); 
    int r = right(i); 
    int smallest = i; 
    if (l < heap_size && harr[l] < harr[i]) 
        smallest = l; 
    if (r < heap_size && harr[r] < harr[smallest]) 
        smallest = r; 
    if (smallest != i) 
    { 
        swap(&harr[i], &harr[smallest]); 
        MinHeapify(smallest); 
    } 
} 
```
### 합병정렬 (logN)
병합 정렬은 폰 노이만이 제안한, 평균 시간 복잡도와 최악 시간 복잡도가 모두 O(NlogN)인 정렬 알고리즘입니다. 분할 정복 알고리즘의 대표적인 예시입니다.병합 정렬은 어떤 방식으로 입력이 들어와도 반씩 쪼개면서 정렬을 해야 하므로 어떠한 경우에도 O(NlogN)입니다.  합병정렬이 힙정렬보다 더 빠르다고 알려져있으며 이 합병정렬은 새로운 배열 하나를 더 써야 하므로 메모리 측면에서 퀵정렬보다 좋지 않습니다. 

```python
def merge(left, right):

    result = []

    while len(left) > 0 or len(right) > 0:
        if len(left) > 0 and len(right) > 0:
            if left[0] <= right[0]:
                result.append(left[0])
                left = left[1:] 
            else: 
                result.append(right[0]) 
                right = right[1:] 
        elif len(left) > 0: 
            result.append(left[0]) 
            left = left[1:] 
        elif len(right) > 0: 
            result.append(right[0]) 
            right = right[1:] 
    return result
 
def merge_sort(list): 
    if len(list) <= 1: 
        return list 
    mid = len(list) / 2 
    leftList = list[:mid] 
    rightList = list[mid:] 
    leftList = merge_sort(leftList) 
    rightList = merge_sort(rightList) 
    return merge(leftList, rightList) 
```
### 퀵정렬 (logN)
최악의 경우,pivot이 올바르게 선택되지 않을경우( 한쪽은 0개, 다른 쪽은 n-1개로 분할되는 경우) O(n^2), 평균적으로 O(nlogn)의 시간복잡도를 가진다. pivot을 기준으로 i와 j가 만날 때까지 swap을 하며 바꿔가다가 다시 pivot을 j 다음에 넣으면 되며 그 다음 왼쪽, 오른쪽 재귀함수로 돌려버리면 됩니다. 다른 정렬알고리즘보다 평균적으로 가장 빠르며 대부분의 컴퓨터 아키텍처에서도 쓰입니다.  
 - 시간복잡도 : 알고리즘이 실행되는 동안 수행하는 기본적인 연산의 수를 말하며 문제를 해결하는데 걸리는 시간과 입력의 함수관계를 말합니다. 시간복잡도가 높다는 말은 입력의 크기가 증가할 때 알고리즘의 수행시간이 더 빠르게 증가함을 의미합니다. 

![슈도코드](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile1.uf.tistory.com%2Fimage%2F26563A4A535729E0101F39)

```js
const quicksort = array => {
    if (array.length === 0) return [];
    let [x, ...xs] = array;    
    return [
        ...quicksort(xs.filter(y => y < x)),
        x,
        ...quicksort(xs.filter(y => y >= x))
    ];
};
```
### 버블정렬, 선택정렬, 삽입정렬(n^2)
 - 버블정렬 : 인접한 두요소중에서 큰값은 오른쪽, 작은 값은 왼쪽으로(오름차순기준) 그 후 마지막값을 빼고 다시 처음부터 반복한다. 
 - 선택정렬 : 주어진 리스트 중 최소값을 찾는다 > 그 값을 맨 앞값과 교체한다 > 맨처음 위치를 뺀 나머지 리스트를 이전과 같은 방법으로 교체 한다. 
 - 삽입정렬 : 처음부터 시작한다.  > 지금의 요소가 전의 요소들보다 큰지를 확인. 자신의 자리를 찾아서 "삽입"한다. 

```js
var arr = [1,8,3,11,5,10,9];
var n = arr.length; 
function swap(index1, index2){
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
function bubble(){
    var j = n - 1;
    while(j > 1){
        for(var i = 0; i < j; i++){
            if(arr[i] > arr[i+1]) swap(i, i+1);
        }
        j--;
    }
     console.log(arr);
}
function selection(){
    var j = 0;
    while(j < n-1){
        var minIndex = j;
        for(var i = j; i < n;i++){
            if(arr[minIndex] > arr[i]) minIndex = i;
        }
        if(minIndex !== j) swap(minIndex, j);
        j++;
    }
    console.log(arr);
}
function insert(){
    var j = 1; 
    while( j < n){
        for(var i = j-1; i > -1; i--){
            if(arr[i+1] < arr[i]) {
                swap(i+1, i);
            }else{
                break;
            }
        }
        j++;
    }
    console.log(arr);
} 
//insert();
//selection();
bubble();
``` 
### 기수정렬, radix sort
```js   
const radixSort = arr => {
    const maxNum = Math.max(...arr) * 10;
    let divisor = 10;
  
    while (divisor < maxNum) {
      let buckets = [...Array(10)].map(() => []);
      for (let num of arr) {
        buckets[Math.floor((num % divisor) / (divisor / 10))].push(num);
      }
      arr = [].concat(...buckets);
      divisor *= 10;
    }
    return arr;
  };
console.log(radixSort([3, 4, 22, 1, 5]))
```

### BFS, DFS

### 벨만포드
존재하는 모든 간선을 돌아보면서 이 간선을 통할 수도 있는 최단경로들의 거리를 갱신하는 것. 음의 사이클이 있을 경우 v-1이 아닌 v-1번째에 했을 때 갱신이 된다는 뜻. 
```c++
#include <cstdio>
#include <vector>
#include <utility>
#include <algorithm>
using namespace std;
typedef pair<int, int> P;
const int INF = 1000000000; // 절대 나올 수 없는 경로값
int main(){
    int N, M, dist[500];
    scanf("%d %d", &N, &M);
    vector<P> adj[500];
    for(int i=0; i<M; i++){
        int A, B, C;
        scanf("%d %d %d", &A, &B, &C);
        adj[A-1].push_back(P(B-1, C));
    }
    bool minusCycle = false;
    fill(dist, dist+N, INF);
    dist[0] = 0;
    for(int i=0; i<N; i++){ // (N-1) + 1번의 루프. 마지막은 음의 싸이클 존재 여부 확인용
        for(int j=0; j<N; j++){
            // N-1번의 루프에 걸쳐 각 정점이 i+1개 정점을 거쳐오는 최단경로 갱신
            for(auto &p: adj[j]){
                int next = p.first, d = p.second;
                if(dist[j] != INF && dist[next] > dist[j] + d){
                    dist[next] = dist[j] + d;
                    // N번째 루프에 값이 갱신되면 음의 싸이클이 존재한다.
                    if(i == N-1) minusCycle = true;
                }
            }
        }
    }
    if(minusCycle) puts("-1");
    else{
        for(int i=1; i<N; i++)
            printf("%d\n", dist[i]!=INF ? dist[i] : -1);
    }
} 
```
### MST와 크루스칼
최소 스패닝 트리(MST, minimum spanning tree)는 트리의 간선마다 가중치(cost)가 있을 때, 간선의 가중치 합이 최소인 스패닝 트리입니다. 방법 중 크루스칼 알고리즘이 있다.  
 - ① 간선들을 가중치 순으로 오름차순 정렬하고 정점들을 각 컴포넌트로 초기화한다.
 - ② 간선들을 훑으면서 양쪽 정점을 포함한 컴포넌트가 연결되어 있지 않으면 간선을 뽑고 연결한다.
 - ③ 간선 V-1개가 뽑혔을 때, 그 간선들과 정점들이 이루는 그래프가 MST다. 

```c++
#include <cstdio>
#include <algorithm>
using namespace std;
 
int uf[1000]; // union-find 배열
 
// union-find의 find 연산
int find(int a){
    if(uf[a] < 0) return a;
    return uf[a] = find(uf[a]);
}
 
// union-find의 union 연산
bool merge(int a, int b){
    a = find(a);
    b = find(b);
    if(a == b) return false;
    uf[b] = a;
    return true;
}
 
// 간선 구조체. w 기준으로 정렬됨
struct Edge{
    int u, v, w;
    Edge(): Edge(-1, -1, 0){}
    Edge(int u1, int v1, int w1): u(u1), v(v1), w(w1){}
    bool operator <(const Edge& O)const{ return w < O.w; }
};
 
int main(){
    int N, M;
    scanf("%d %d", &N, &M);
    Edge e[100000];
    for(int i=0; i<M; i++){
        int a, b, c;
        scanf("%d %d %d", &a, &b, &c);
        e[i] = Edge(a-1, b-1, c);
    }
    // 간선을 가중치 기준으로 오름차순 정렬
    sort(e, e+M);
 
    // result: 가중치합, cnt: 뽑은 간선 수
    int result = 0, cnt = 0;
    fill(uf, uf+N, -1);
    for(int i=0; ; i++){
        if(merge(e[i].u, e[i].v)){
            result += e[i].w;
            if(++cnt == N-1) break; // N-1개 간선을 뽑으면 나감
        }
    }
    printf("%d\n", result);
}
```

### 다익스트라 
정점 개수가 V, 간선 개수가 E일 때 기본적인 최적화를 거치면 O(ElogV)의 시간복잡도 

① 아직 방문하지 않은 정점들 중 거리가 가장 짧은 정점을 하나 선택해 방문한다.

② 해당 정점에서 인접하고 아직 방문하지 않은 정점들의 거리를 갱신한다.

가장 dist 값이 작은 정점이 u고, 사실 dist[u]는 최단거리보다는 아직 크다고 해 봅시다. 이때 u를 방문하면 dist[u] 값은 최단거리가 아니게 되겠죠.

또한 dist[u]가 아직 최단거리가 아니라는 말은, 다른 임의의 정점 v를 거치는 경로를 통해 최단거리로 갱신될 수 있다는 말입니다. 즉 dist[u] > dist[v] + d[v][u]인 어떤 정점 v가 존재할 겁니다.
그런데 아직 방문하지 않은 정점 중에서 dist 값이 제일 작은 게 u라고 했으니까 v는 방문한 상태일 겁니다.
그런데 v를 방문했을 때 dist[u]는 이미 dist[v] + d[v][u]로 갱신되고 말았을 겁니다.
따라서 저렇게 될 수 있는 경우는... 없습니다. 
위 증명에서 중요하게 작용하는 성질이 바로 d 값이 항상 0 이상이라는 사실, 음수라면 벨만포드를 써야 한다.  

```c++
while(pq.size()){ 
    int herey = pq.top().second / 1000;
    int herex = pq.top().second % 1000; 
    int here_dist = pq.top().first;
    pq.pop();
    if(dist[herey][herex] != here_dist) continue;
    for(int i = 0; i < 4; i++){
        int ny = herey + dy[i]; 
        int nx = herex + dx[i];  
        if(ny < 0 || ny >= N || nx < 0 || nx >= N) continue; 
        int _dist = a[ny][nx]; 
        if(dist[ny][nx] > dist[herey][herex] + _dist){
            dist[ny][nx] = dist[herey][herex] + _dist; 
            pq.push(make_pair(dist[ny][nx], ny * 1000 + nx));    
        }   
    } 
} 
```

### 다이나믹 프로그래밍 
DP의 특성으로 optimal substructure와 overlapping subproblem이 있습니다. optimal substructure는 부분 문제들의 최적해들을 전체 문제의 최적해가 포함하고 있는 것을 말합니다. overlapping subproblem은 divide-and-conquer와 차이나는 부분으로 중복되는 부분이 있다는 것을 말합니다. 

### 플로이드 와샬
플로이드-워셜 알고리즘은 각각의 꼭짓점 쌍을 지나는 그래프의 모든 경로를 비교한다. shortestPath(i, j, k) = min(shortestPath(i, j, k - 1), shortestPath(i, k, k - 1) + shortestPath(k,j, k - 1))이는 i번 정점에서 j번 정점까지, 1~k번 정점만 사용할 때의 최단 거리를 구하라는 의미입니다.

```shell
let dist be a |V| × |V| array of minimum distances initialized to ∞ (infinity)
for each edge (u,v)
   dist[u][v] ← w(u,v)  // 변 (u,v)의 가중치
for each vertex v
   dist[v][v] ← 0
for k from 1 to |V|
   for i from 1 to |V|
      for j from 1 to |V|
         if dist[i][j] > dist[i][k] + dist[k][j]
             dist[i][j] ← dist[i][k] + dist[k][j]
         end if
```
### Greedy 알고리즘
매순간 최적이라고 생각되는 것을 선택해 나가는 방식으로 진행하여 최종적인 최적해에 도달하는 기법을 가리킵니다. 탐욕 알고리즘이 잘 작동하는 문제는 greedy choice property와 optimal substructure 두 가지 속성을 만족합니다. 전자의 경우 앞의 선택이 이후 선택에 영향을 주지 않는다는 걸 의미하고, 후자는 문제 전체에 대한 최적해(global optimum)가 부분문제에 대해서도 역시 최적해가 된다는 걸 뜻합니다. 다익스트라와 MST(크루스칼)가 있습니다.

다익스트라 : 우선순위 큐에 있는 u가 먼저 꺼내졌다는 말은 dist[u] < dist[q]임을 알려줍니다. 이는 q를 지나서 u로 오는 경로가 dist[u]보다 짧다는 가정에 모순이 됩니다.경로보다 짧은 경로는 존재할 수 없으므로 다익스트라 알고리즘이 찾아내는 경로가 항상 최단 경로라는 결론을 얻을 수 있습니다. 
크루스칼 알고리즘에서는, 단순히 각 간선을 정렬한 이후에 비용이 작은 간선부터 연결하면 문제를 해결할 수 있습니다. 그렇기 때문에 '항상 작은 것을 선택'한다는 점에서 Greedy 알고리즘에 해당합니다. 처음 공집합에서부터 시작해서 간선을 추가하는데 최소가 아닌 간선을 추가했을 때 최적해 T보다 더 커지므로 모순임을 통해 증명이 가능합니다.  

# 알고리즘문제
## 십진수를 팔진수로 바꾸는 프로그램
```c++
#include <iostream>
#include <cmath>
using namespace std;
int decimalToOctal(int decimalNumber);
int main()
{
   int decimalNumber;
   cout << "Enter a decimal number: ";
   cin >> decimalNumber;
   cout << decimalNumber << " in decimal = " << decimalToOctal(decimalNumber) << " in octal";
   
   return 0;
}
// Function to convert decimal number to octal
int decimalToOctal(int decimalNumber)
{
    int rem, i = 1, octalNumber = 0;
    while (decimalNumber != 0)
    {
        rem = decimalNumber % 8;
        decimalNumber /= 8;
        octalNumber += rem * i;
        i *= 10;
    }
    return octalNumber;
}
```
## 매트릭스에서 k번째 값 추출
```js 
const a = [
	[1, 2, 3], 
	[1, 2, 3], 
	[1, 2, 3]
]
function flatDeep(arr) {
   return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val) : val), []);
};
const k = 3; 
const kthSmallest = (matrix, k) => [].concat(...matrix).sort((a, b) => a - b)[k - 1];
``` 
### Largest Number(string)
```js
const a =[10, 2]
const largestNumber = function(nums) {
    return nums
            .sort((a, b) => `${b}${a}` - `${a}${b}`)
            .reduce((a, b) => a + b, '') 
};  
console.log(largestNumber(a))
```
### 트리의 지름
```c++
#include<cstdio>
#include<vector>
using namespace std; 
vector<pair<int, int>> adj[10012];
bool visited[10012];
int n, from, to, dist, ret; 
pair<int, int> dfs(int here){
    if(visited[here])return make_pair(0, here);
    visited[here] = 1; 
    int here_weight = 0, here_pos = here; 
    for(pair<int, int> there : adj[here]){
        if(visited[there.first]) continue; 
        pair<int, int> thereRet = dfs(there.first);
        int pos = thereRet.second; 
        int weight = thereRet.first; 
        if(here_weight < weight + there.second){
            here_weight = weight + there.second; 
            here_pos = pos; 
        }
    }
    return make_pair(here_weight, here_pos);
}
int main(){
    scanf("%d", &n);
    for(int i = 1; i < n; i++){
        scanf("%d %d %d", &from, &to, &dist);
        adj[from].push_back(make_pair(to, dist));
        adj[to].push_back(make_pair(from, dist));
    }
    int pos = dfs(1).second; 
    fill(visited, visited + 10012, 0);
    ret = dfs(pos).first; 
    printf("%d\n", ret);
}
```
### 위상정렬
```c++
#include <cstdio>
#include <algorithm>
#include <vector>
#include <queue>

using namespace std; 
int in[32004], N, M, a, b; 
vector<int> adj[32004]; 
queue<int> q;   
int main(){
    scanf("%d %d", &N, & M); 
    for(int i = 0; i < M; i++){
        scanf("%d %d", &a, &b);
        adj[a].push_back(b); 
        in[b]++;  
    }
    for(int i = 1; i <= N; i++)if(!in[i]) q.push(i);
    while(q.size()){
        int here = q.front(); q.pop(); 
        printf("%d ", here);  
        for(int there : adj[here]){ 
            in[there]--; 
            if(!in[there])q.push(there);  
        }  
    }  
    return 0; 
} 
```
### 피보나치
```js
//const a = Array.from(new Array(41), () => 0);
const dp = Array(41); 
dp[0] = 0, dp[1] = 1, dp[2] = 1;  
const fibo = n =>{ 
	if(dp[n]) return dp[n];
	return dp[n] = fibo(n - 1) + fibo(n - 2); 
} 
```
### 가운데를 말해요
수빈이는 동생에게 "가운데를 말해요" 게임을 가르쳐주고 있다. 수빈이가 정수를 하나씩 외칠때마다 동생은 지금까지 수빈이가 말한 수 중에서 중간값을 말해야 한다. 만약, 그동안 수빈이가 외친 수의 개수가 짝수개라면 중간에 있는 두 수 중에서 작은 수를 말해야 한다.

예를 들어 수빈이가 동생에게 1, 5, 2, 10, -99, 7, 5를 순서대로 외쳤다고 하면, 동생은 1, 1, 2, 2, 2, 2, 5를 차례대로 말해야 한다. 수빈이가 외치는 수가 주어졌을 때, 동생이 말해야 하는 수를 구하는 프로그램을 작성하시오.
```c++
#include <cstdio>
#include <queue>
#include <vector>
#include <functional>
using namespace std;
int n, a, mid = 987654321, ret[100001]; 
priority_queue<int,vector<int>,less<int> > leftq;
priority_queue<int,vector<int>,greater<int> > rightq; 
int main(){
    scanf("%d",&n);
    for(int i = 0; i < n; i++){
        scanf("%d",&a);
        if(mid < a) rightq.push(a); 
        else leftq.push(a); 
        if(leftq.size() == rightq.size() + 2){
            rightq.push(leftq.top()); leftq.pop(); 
        }
        if(leftq.size() + 1 == rightq.size()){
            leftq.push(rightq.top()); rightq.pop(); 
        }
        mid = leftq.top(); 
        ret[i] = mid;  
    } 
    for(int i = 0; i < n; i++) printf("%d\n", ret[i]); 
    return 0;
}
```
### LIS - n^2
```c++
#include <cstdio>
#include <iostream>
#include <algorithm>
using namespace std;
int n, a[1001], cnt[1001], ret;
int main(){
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", a + i);
    }
    for (int i = 0; i < n; i++) {
      int maxValue = 0;
      for (int j = 0; j < i; j++) {
        if (a[j] < a[i] && maxValue < cnt[j]) maxValue = cnt[j];
      }
      cnt[i] = maxValue +1;
      ret = max(ret,cnt[i]);
    }
    printf("%d\n", ret);
}
```
### LIS - logn
```c++
#include <cstdio>
#include <algorithm>
using namespace std;

int n, lis[1001], len, num;
int main() {
	scanf("%d", &n);
	for (int i = 0; i < n; i++){
        scanf("%d", &num);
        auto lowerPos = lower_bound(lis, lis + len, num);
        if(*lowerPos == 0) len++;
        *lowerPos = num;
        for(int j = 0; j < n; j++){
            printf("%d ", lis[j]);
        }
        printf("\n");
    }
	printf("%d", len);
	return 0;
}
```
### LIS
```js
const lengthOfLIS = function(nums) {
    let lowerList = [];
    
    for(let i = 0; i < nums.length; i++) {
        let l = 0;
        let r = lowerList.length - 1;
        const cur = nums[i];
        
        if(r < 0 || lowerList[r] < cur) {
            lowerList.push(cur);
            continue;
        }
        
        while(l <= r) {
            let mid = (l + r) >> 1;
            if(lowerList[mid] >= cur) r = mid - 1;
            else l = mid + 1;
        }
        
        lowerList[l] = cur;
    }
    
    return lowerList.length;
};
```
### 이분탐색
```c++
#include<cstdio>
#include<algorithm>
using namespace std;
long long n, k, lo, hi, mid, ans;  
int main(){
    scanf("%lld %lld", &n, &k);
    lo = 1, hi = n * n, mid = (lo + hi) / 2; 
    long long ret;
    while(lo <= hi){
        mid = (lo + hi) / 2; 
        ret = 0; 
        for(int i = 1; i <= n; i++){
            ret += min(mid / i, n);
        } 
        if(ret >= k){
            hi  = mid - 1; 
            ans = mid; 
        }else{
            lo = mid + 1; 
        }  
    }  
    printf("%lld\n", ans);
} 
```

```js
var findN = 4; 
var idx = -1; 
var a = [1, 2, 3, 4, 5]
var left = 0;
var right  = a.length - 1;

while(left <= right){
  var mid = ~~((left + right) / 2); 
  if(a[mid] > findN){
    right = mid - 1;
  }else if(a[mid] < findN){
    left = mid + 1; 
  }else{
    idx = mid; 
    break;
  }
}
console.log(idx)
```


 
# 운영체제 
## 운영체제 의미
 - 운영 체제는 사용자가 컴퓨터를 쉽게 다루게 해주는 인터페이스
 - 컴퓨터 자원을 효율적으로 관리하기 위한 시스템, 한정된 메모리 공간을 효율적으로 분배하는 참된 일꾼
 - 운영체제는 하드웨어와 소프트웨어를 관리하는 소프트웨어 전체
 이러한 운영체제는 어느 기기에서 어떠한 형태로도 나타날 수 있습니다. 비단 PC용 윈도우즈만이 운영체제가 아니고, MP3 플레이어를 켜면 전원이 들어와 장치를 깨우고 사용자의 명령에 따라 음악을 재생하는 동작들을 관리하는 것들도 전부 운영 체제라 할 수 있습니다. 단, 이런식으로 전자기기에 공장 출고시 설치되며 애플리케이션 설치를 통한 기능 추가를 할 수 없는 것은 보통 펌웨어(firmware)라고 부릅니다. 

### 운영체제의 역할
1. CPU 스케줄링 : CPU를 어떤 프로세스에게 주는 것을 결정하는 것, CPU 소유권에 따라 해당 프로세스의 인스트럭션이 가능합니다.  
2. 메모리관리 : 한정된 메모리를 어떤 프로세스에 얼만큼 할당해야 하는가를 관리 하는 것입니다. 
3. 디스크 파일 관리 : 디스크 파일을 어떻게 보관하는지에 대한 것입니다. 
4. I/O디바이스 관리 : 입출력장치와 컴퓨터 간에 어떻게 정보를 주고 받게 할까에 대한 것입니다. 

이외에도 프로세스관리, 프로세스의 생성과 삭제, 자원 할당 및 반환 등을 운영체제가 관리합니다. 
이 때 운영체제는 **인터럽트**에 의해 움직입니다.  
 - 인터럽트 : 마이크로 프로세서가 device관련 / 예외발생 처리요청이 들어오면 처리를 할 수 있게 해주는 것

### 컴퓨터 시스템 구조
CPU, DMA, Timer, Modebit, Device Controller로 이루어져 있습니다. 
![컴퓨터시스템구조](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile22.uf.tistory.com%2Fimage%2F99C6753B5AA4CE0C229073)
#### CPU
메모리, I/O 디바이스의 작게 설정되어있는 메모리인 로컬 버퍼에 접근하여 일을 합니다. 
 - 일이란 본인의 메모리주소에 맞는 딱 자기 할일만 하는 **인스터럭션**만 실행하는 것을 말합니다. 

프로세스(프로그램)가 요청할 때 메모리만 읽어들이면서 실행을 하는데 저 멀리 있는 I/O 디바이스에 요청을 할 때는 좀 다릅니다. 
이때는 새로이 인터럽트 라인을 설계한 후 순차적인 인터럽트 실행을 중지하고 OS에 제어권을 주어서 OS에 **시스템 콜**을 요청해 원하는 디바이스로 향해 작은 로컬버퍼에 접근,원하는 요청을 합니다. 
 - 인스트럭션 : CPU에서 메모리를 통해 기계어를 읽는 것  

#### 시스템콜
운영체제가 커널에 접근하기 위한 인터페이스이자 사용자 프로그램이 운영체제의 서비스를 받기 위해서 커널함수를 호출하는 것을 말합니다. 
 - 사용자프로그램이 I/O요청(**Trap**)이 들어오면 무조건 OS통해서 요청을 수행하게 되는데 이 때 커널함수를 통해 수행합니다. 

**Trap**발동시의 과정
1.인터럽트 벡터로 이동하여 제어권이 **인터럽트 벡터**가 가리키는 **인터럽트 서비스 루틴**으로 이동합니다. 
2.올바른 I/O요청인지 확인 후 I/O 를 수행합니다. 
3.그 이후 CPU의 제어권을 다음 명령으로 옮깁니다. 
 - 수행하는 과정에서 사용자모드와 커널모드(모니터모드)가 번갈아가면서 작동되는데 예를 들어 fs.readFile 이라는 함수가 작동되면 사용자모드에서 함수가 작동되고 파일을 읽을 때는 커널모드로 들어가서 읽고 다시 사용자모드로 돌아가서 그 밑의 로직을 수행하게 되는 것입니다. 
```
fs.readFile >> 
        유저모드 >>  >> 
=============시스템콜================
        커널모드   >> 
```
- 인터럽트 벡터 : 인터럽트 주소의 특정위치   
- 커널 : 운영체제의 핵심부분이자 보안, 자원관리, 추상화를 담당합니다.  


사용자 프로그램은 직접 I/O 장치에 접근 할 수 없다. I/O 장치에 접근하는 모든 인스트럭션은 운영체제를 통해서만 할 수 있도록 막아놓았습니다. 사용자 프로그램이 I/O를 해야하는 상황이오면 다른 프로그램에 가있던 제어권이 운영체제로 넘어와서 실행되게 되며 해당 작업을 device controller에 시킨 후 I/O의 경우 시간이 오래걸리기 때문에 다시 다른 프로그램에 CPU 제어권을 넘겨주고 이 후에 완료가 되면 다시 인터럽트를 거는 식을 진행이 되며 다른 프로그램에게 제어권을 넘겨줄 때는 라운드로빈알고리즘에 의해 제어권을 넘겨주게 됩니다. 

#### DMA 컨트롤러, Direct Memory Access
메모리는 CPU만이 접근이 가능하고 하는 일도 많습니다. 
그렇기 때문에 CPU에게만 너무 많은 인터럽트요청이 들어오기 때문에 도와주는 일꾼인 DMA 컨트롤러를 두고 있습니다. 
 - 이 때, CPU와 DMA컨트롤러의 메모리 중첩 사용을 방지하기 위해 메모리 컨트롤러가 존재합니다. 

#### Timer
CPU는 보통의 경우 프로그램들에 각각 할당량을 주면서 효율적으로 작동하는데 **무한루프등 소모량이 많은 프로그램**이 작동할 때를 방지하기 위해 타이머가 존재합니다. **몇세컨드안에 실행되어야 한다** 라는 것을 정하고 특정 프로그램에 시간제한을 다는 역할을 합니다. 

#### modebit
지금 실행하는 프로그램이 사용자 프로그램인지 운영체제인지를 파악해주는 역할을 합니다. 
IO디바이스는 운영체제를 통해서만 작동해야 합니다. 
왜냐하면 사용자프로그램을 통해서만 운용된다면 카메라가 갑자기 켜지는 등 나쁜 짓을 할 수 있기 때문에 운영체제를 통해서만 작동할 수 있어야 하고 이를 위해 modebit이 존재합니다. 
 - modebit의 0, 모니터모드 1, 사용자모드를 통해 이를 관리

사용자모드일 경우에는 IO 디바이스에 시스템콜을 못하게 막습니다. 즉 **한정된 인스트럭션**만 가능하게 합니다.

#### Device Controller
컴퓨터와 연결되어있는 IO디바이스들은 작은 CPU가 붙어있음 이를 컨트롤러라고 부르고 이 디바이스들의 작업공간, 메모리를 로컬 버퍼라고 부릅니다.   

#### 인터럽트
현대의 운영체제는 **인터럽트**에 의해 구성됩니다. 인터럽트는 CPU에게 무언가를 알려주는 일을 하며 그렇게 해야할일들을 처리하며 OS가 동작합니다. 
인터럽트는 두가지로 나눠집니다. 
 1. 하드웨어 인터럽트
 2. 소프트웨어 인터럽트, Trap, Trap 은 프로그램 오류가 나거나 System call로 프로그램이 커널 함수를 호출, **시스템콜**을 하는 경우에 발동됩니다. 과정 : 1) IO에 요청 2) 소프트웨어 인터럽트(Trap) 3) IO작업 종료 4) 하드웨어 인터럽트로 종료 알림   

### 메모리
#### 메모리 구조 
| 이름 | 설명 |
|:--------|:--------|
| code | 시스템 콜, 인터럽트 처리 코드 등의 사용자코드 |
| data | 전역변수, 프로그램이 종료시에 사라짐 |
| heap & stack | 동적변수 & 지역변수, 함수가 할당 | 
| 커널영역 | 시스템 운영에 필요한 메모리 |  

프로그램이 실행되기 위해서는 먼저 프로그램이 메모리에 로드(load)되어야 합니다.

또한, 프로그램에서 사용되는 변수들을 저장할 메모리도 필요합니다.

따라서 컴퓨터의 운영체제는 프로그램의 실행을 위해 다양한 메모리 공간을 제공하고 있습니다.

프로그램이 운영체제로부터 할당받는 대표적인 메모리 공간은 다음과 같습니다.

1. 코드(code) 영역
2. 데이터(data) 영역
3. 스택(stack) 영역, 스택 영역은 함수의 호출과 함께 할당되며, 함수의 호출이 완료되면 소멸합니다.이렇게 스택 영역에 저장되는 함수의 호출 정보를 스택 프레임(stack frame)이라고 합니다.
4. 힙(heap) 영역

다음 그림은 운영체제가 제공하는 메모리 공간을 표현하고 있습니다.


![메모리구조](http://tcpschool.com/lectures/img_c_memory_structure.png)



<p align="center"> 
  <img src="https://raw.githubusercontent.com/wnghdcjfe/wnghdcjfe.github.io/master/docs/ss.png" width="700">
</p>  

정적할당의 경우 BSS segment와 Data segment, Code segment로 나눠진다. 

BSS segment는 초기화가 되지않은 전역변수, static으로 선언한 변수들, 0으로 초기화가 되는 것들을 뜻하고 Data segment은 초기화가 8, 1..로 할당된 변수를 뜻한다. 이렇게 나눠지는 이유는 프로그램이 컴파일되고 Object코드가 되고 링킹이 되어 프로그램이 되서 실행될 때 Object코드의 효율성을 위해서다. 어차피 0으로 초기화를 하기 때문에 사이즈만을 ObjectCode에 넣으면 되는 것이고 그러기 위해서 나눈 것이다. 참고로 const ... 로 선언한 변수는 Data segment에 저장된다.

​

동적할당은 Stack과 Heap으로 나눠진다. 

Stack 메모리영역은 함수가 실행함에 따라 늘어들고 줄어들게 된다.  지역변수, 매개변수, 함수가 실행하는 그 시점의 주소값을 담는다. 함수가 실행할 때 잠깐 사용되는 영역이다. BSS segment의 경우 처음 선언하게 되면 프로그램 실행이 끝날 때까지 남아있고 이건 그렇지 않다. 


Heap은 동적으로 할당되는 변수들을 담는다. 프로그램이 실행, 런타임될 때 할당되므로 모든 애플리케이션이 함께 사용할 수 있는 메모리 영역이 된다.  꼭 deallocate를 해줘야 한다. malloc의 경우 void형 포인터를 반환하니 int형으로 변환할 때는 (int *)를 해줘야 한다. 

vector같은건 당연히 동적할당이 되며 내부적으로 heap영역을 사용한다. 

참고로 메모리는 프로그램이 시작될  때 할당이 되며 프로그램이 끝나면 OS에게 돌려주게 된다.

​
```js
if(p = (int *)malloc(n * sizeof(int)) == NULL){
    exit(0)
}
```
malloc으로 할당할 때 if문을 써야 하는게 메모리가 부족할경우 할당이 안될 경우에 NULL pointer를 반환하기 때문이다.

#### 메모리 계층 구조 
| 이름 | 역할 | 특징 |  
|:--------|:--------|:--------|
| 캐시메모리 | CPU와 RAM사이를 이어주는 역할 | 휘발성 |  
| 메인메모리 | 커널 RAM | 휘발성 |  
| SSD, HDD | 보조기억장치 | 비휘발성 |    

CPU와 하드디스크, 그리고 램 사이의 상관 관계
일반적인 컴퓨터 작업의 과정을 살펴보면, 램은 하드디스크로부터 일정량의 데이터를 복사해 임시 저장한 후, 이를 필요 시마다 CPU에 빠르게 전달하는 역할을 합니다. 이후부터는 속도가 느린 하드디스크는 배제하고 빠른 CPU와 램끼리만 데이터를 교환하므로 전반적인 작업을 고속으로 처리할 수 있습니다. 이러한 이유로, 하드디스크가 단순히 데이터를 보관하는 역할에 그치는데 비해, 램은 컴퓨터 전반의 성능에 미치는 바가 크다고 할 수 있습니다. 이에 따라 램은 주기억장치, 하드디스크는 보조기억장치로 분류된다.

일반적으로 컴퓨터 게임을 실행할 때 램과 하드디스크의 상관 관계를 확인할 수 있습니다. 게임을 처음 실행할 때, 또는 각 스테이지를 넘어가는 도중에 화면이 정지하며 ‘로딩 중(Now Loading)’, 혹은 ‘기다려 주세요(please wait)’ 등의 메시지가 나오는 것을 본 적이 있을 것이다. 여기서 말하는 ‘로딩(적재)’이라는 것이 하드디스크에서 데이터를 읽어 램으로 전송하는 과정을 의미합니다. 로딩이 끝나야 비로소 게임을 플레이 할 수 있습니다. 

### 프로세스
#### 프로세스의 문맥
프로세스의 모든 상태를 나타내는 것을 프로세스의 문맥이라 합니다. 
1. 하드웨어 문맥
2. 주소 공간, code, data(지역변수, 매개변수), stack(전역변수, 정적변수), heap(동적 메모리 할당)
3. 프로세스 커널관련 자료구조, **PCB**(주소공간위치정보, Process Control Block) 

#### 프로세스 상태의 종류
 - Running, CPU를 잡고 인스트럭션을 수행중인 상태 [active]
 - Ready, CPU를 기다리는 상태[active]
 - Blocked, 오래거리는 작업 중이라 CPU로 실행 못하는 상태[active]
 - Suspended, 메모리를 통째로 빼앗긴 상태[inactive]

#### PCB, Process Control Block
프로세스 제어 블록(Process Control Block, 줄여서 PCB)은 특정한 프로세스를 관리할 필요가 있는 정보를 포함하는 운영 체제 커널의 자료 구조이다. 작업 제어 블록(Task Control Block, 줄여서 TCB) 또는 작업 구조라고도 한다. "PCB는 운영 체제가 프로세스를 표현한 것이다."

PCB가 프로세스의 중요한 정보를 포함하고 있기 때문에, 일반 사용자가 접근하지 못하도록 보호된 메모리 영역 안에 남는다. 일부 운영 체제에서 PCB는 커널 스택의 처음에 위치한다. (이 메모리 영역은 편리하면서도 보호를 받는 위치이기 때문이다.)

운영체제가 각 프로세스를 관리하기 위해 프로세스당 유지하는 정보 
CPU를 한 프로세스에서 다른 프로세스로 넘겨주는 과정에서 CPU는 CPU를 내어주는 프로세스의 상태를 그 프로세스 PCB에 저장을 하고 새롭게 얻는 프로세스 상태를 PCB에서 읽어옵니다. 구성은 다음과 같습니다. 
 - Process ID
 - CPU 수행 관련 하드웨어 값
 -  메모리 관련 Code, data, Stack, heap의 위치 정보
 - 파일 관련  
  1) Process ID
  2) CPU 수행 관련 하드웨어 값
  3) 메모리 관련 Code, data, Stack, heap의 위치 정보
  4) 파일 관련  

#### 쓰레드
공통적으로 프로세스 내에서 실행되는 여러 흐름의 단위

운영체제에서 프로세스가 만들어지면 [code, data, stack, heap]이 만들어지고 이를 관리하기 위해 **PCB**를 둡니다. 
이 **PCB**에는 쓰레드가 여러개 들어가 있습니다.  
[code, data, stack, heap]를 **각각** 생성하는 프로세스와는 달리 쓰레드는 stack을 제외한 정보를 **모두 공유**합니다. 좀 더 자세히 말하면 쓰레드는 Program Counter(코드 어느부분을 가리키면서 실행하는 것에 대한 정보), registers(CPU레지스터값), stack space는 별도로 유지하지만 data, code, heap을 공유합니다.   
 
동일한 일을 하는 프로세스는 독립적으로 있기 때문에 별도의 메모리 주소공간이 낭비되지만 쓰레드는 그렇지 않습니다. 
쓰레드는 프로세스 하나당 공유할 수 있는 것은 최대한 공유합니다. 
 - 메모리 주소공간 공유
 - 프로세스 상태 공유 
 - 쓰레드끼리도 공유, 이 때 동료 쓰레드와 공유하는 부분을 task라고 합니다.  

쓰레드는 lightweight process라 부르고 하나의 쓰레드만 가지고 있는 프로세스를 heavyweight process라 합니다. 

쓰레드의 장점 
 1. 하나가 blocked하는 상태여도 다른 쓰레드는 running상태여서 빠른 처리를 할 수 있습니다. ex) WebSite Request시
 2. 동일한 일을 하는 도중 협력해서 처리를 하면 성능 향상을 얻을 수 있습니다. 
 3. CPU가 여러개 달린 컴퓨터에는 병렬성을 높일 수 있습니다. (계산시 하나당 맡아가지고 가능)
 
웹에서는 탭의 보이는 부분은 렌더러 프로세스가 관리를 하는데 이 프로세스에는 메인 스레드, 레스터 스레드, 워커 스레드, 컴포지터 스레드가 존재합니다.  

웹의 프로세스
 - 브라우저 프로세스 : 주소 표시줄, 북마크 막대, 뒤로 가기 버튼, 앞으로 가기 버튼 등 애플리케이션의 "chrome" 부분을 제어한다.네트워크 요청이나 파일 접근과 같이 눈에 보이지는 않지만 권한이 필요한 부분도 처리한다.
 - 렌더러 프로세스	: 탭 안에서 웹 사이트가 표시되는 부분의 모든 것을 제어한다.
 - 플러그인 프로세스 : 웹 사이트에서 사용하는 플러그인(예: Flash)을 제어한다.
 - GPU 프로세스	: GPU 작업을 다른 프로세스와 격리해서 처리한다. GPU는 여러 애플리케이션의 요청을 처리하고 같은 화면에 요청받은 내용을 그리기 때문에 GPU 프로세스는 별도 프로세스로 분리되어 있다.

### 프로세스 생성, fork, exec
보통은 자식과 부모프로세스 생성시 자원을 공유하지 않습니다. 아래의 두개의 프로세스 생성 과정은 독립적이며 이 모든게 시스템 콜을 통해 생성되며 부모가 OS에 요청을 해서 생성됩니다.  
 - fork : 자식이 부모의 주소공간을 그대로 복사하여 (binary & OS data) 새로운 프로세스 생성(복제생성) 
 - exec : 새로운 프로그램을 그 공간에 올릴 수 있습니다.   

### 프로세스 종료
#### exit
프로세스의 마지막 명령 수행 후, OS에 알려준다. (자식이 부모에게 죽었다 알리며 자원을 모두 반납하고 죽는다.)
 - 자식이 먼저 죽고 부모가 그 다음에 죽는다. 
 - 프로그램에 안적어도 메인함수 리턴되는 위치에 컴파일러가 넣어준다. 

#### abort
부모프로세스가 자식의 프로세스를 강제로 종료시킴
 - 자식이 할당된 자원의 한계치를 넘어섬
 - 자식에게 할당된 태스크가 더이상 필요하지 않음 
 - 부모가 종료할 경우 제거 된다. 
 - 키보드로 kill, break를 친경우 

#### 프로세스 대기, wait
 자식프로세스의 일이 끝날 때까지 부모프로세스가 기다리는 과정

#### 프로세스 간 협력
IPC, Inter Process Comunication
 1. 메시지패싱, 커널을 이용해 메시지 전달 : 메일박스 또는 포트를 통한 간접방식과 전달프로세스이름표기 직접방식
 2. 메모리 공유(다수의 프로세스)

하지만 쓰레드끼리는 메모리가 공유되기 때문에 완전한 협력이 가능 
 
### 멀티프로세스와 멀티쓰레드
 - 멀티프로세스 : 자신만의 메모리, 프로세서 중 일부에 문제가 발생되더라도 다른 프로세서를 이용해 처리할 수 있으므로 신뢰성이 높다. 
 - 멀티스레드 : 하나의 프로세스가 다수개의 작업을 각각 스레드를 이용하여 동시에 작동시킬 수 있다. (컨텍스트스위칭시의 공유메모리 만큼의 자원손실이 줄어든다. 왜냐면 컨텍스트 스위칭시 단순히 CPU 레지스터 교체뿐만 아니라 RAM과 CPU사이의 캐시메모리에 대한 데이터까지 초기화되므로 상당한 부담이 발생) 또한 메모리 공유를 통하기 때문에 프로세스 간 통신과 같이 복잡한 과정을 거치지 않는다. 하지만 하나의 스레드가 자신이 사용하던 데이터 공간을 망가뜨린다면 그 결과는 하나의 데이터 공간을 공유하는 모든 스레드를 작동불능 상태로 만들어버린다. 

### CPU Scheduling  
프로그램이 실행될 때 IO burst, CPU burst가 반복되서 일어나는데 이 때 누구에게 CPU를 줄 것인가를 결정하는 과정입니다. 어느 시점에서 실행되고 있는 프로세스는 단 한개이며 CPU는 여러개의 프로세스를 아주 빠른 속도로 번갈아 가며 실행하는데 누구에게 먼저 이 일꾼녀석을 줘야 할지를 결정하는 것입니다. 
  - IO burst, IO에서 인스트럭션을 하는 과정
  - CPU burst, CPU에서 인스트럭션을 하는 과정 
문맥교환, context switch
**인터럽트** 발생 후, 문맥교환으로 하나의 프로세스가 CPU를 사용 중인 상태에서 다른 프로세스가 CPU를 사용하도록 하기 위해 **커널**이 이전의 프로세스의 상태를 PCB에 보관하고 스케줄링 알고리즘에 따라 결정된 프로세스로 CPU제어권을 넘겨주는 것입니다. 

스케줄링 알고리즘은 두가지로 나눠집니다.  
**preemptive, 선점형방식**
현대 OS가 이를 씁니다. 현재의 프로세스를 쫓아내고 CPU소유권을 강제로 할당합니다.  
**nonpreemptive, 비선점형방식**
프로세스가 스스로 CPU 점유를 포기해야만 CPU소유권이 할당되는 방식, context switch overhead가 적습니다. 

### CPU 스케쥴링 알고리즘
매 CPU burst시 어떤 알고리즘을 써야 하는가를 결정하는 과정입니다. 그렇다면 어떤 알고리즘을 써야 할까요?
 - 이용률, CPU 이용률이 높아야 합니다.
 - 처리량, 주어진 시간에 많은 일을 해야 합니다. 
 - 소요시간, CPU를 쓰러 들어와서 IO를 하러 나갈 때까지의 시간이 짧아야 합니다.
 - 대기시간, ready queue에 있던 시간이 짧아야 합니다. 
 - 응답시간, 일을 시작해서 결과가 나오는 시간, 짧아야 합니다. 
 
#### FCFS, First Come, First Served [비선점형]
가장 먼저 온 것을 가장 먼저 처리하는 것입니다. 
길게 수행되는 프로세스 때문에 Convoy Effect, Queue에서 오래 기다리는 현상이 발생합니다. 

#### SJF, Shortest Job First[비선점형]
 - 가장 짧은 프로세스를 가장 먼저 스케쥴링 합니다. 
 - 긴 시간을 가진 프로세스가 실행이 안되는 현상, StarVation이 발생합니다. 
 - 평균 대기시간이 가장 짧습니다. 
 - 하지만 실제로는 CPU시간을 알 수 없기 때문에 과거의 CPU burst time의 흔적을 이용해 추측해내서 사용합니다.
 - Priority Scheduling의 일종입니다.  

#### Priority Scheduling[비선점형]
SJF의 StarVation을 Aging을 통해 단점을 보완한 것
 - 에이징 : 오래될수록 우선순위를 높여서 막을 수 있습니다.

#### RB / Round Robin 현대적 컴퓨터가 쓰는 스케쥴링[선점형]
Priority Scheduling의 일종으로 각 프로세스는 동일한 할당시간을 주고 그 시간안에 안끝나면 다시 ready queue 뒤로 갑니다. 

예를 들어 q만큼의 할당시간을 주었을 때 (n - 1)q시간이 지나면 자기 차례가 오게 됩니다. 
할당시간이 너무 크면 FCFS가 되고 짧으면 context switch의 잦음으로 인해 오버헤드,즉 비용이 커집니다. 
일반적으로 전체작업 시간은 길어지지만 평균 응답시간은 짧아진다는 특징이 있습니다. 

#### CPU 스케쥴링 알고리즘 평가방법
 - 큐잉모델 : 확률분포로 큐에 도착하는 비율과 서비스가 끝난후의 비율을 비교해서 각종 퍼포먼스의 인덱스를 계산
 - 구현 & 성능측정모델 : 실제 시스템에 적용시킨 알고리즘 구현, 실제작업성능 비교
 - 모의실험모델 : 알고리즘 모의프로그램으로 구현 

### Deadlock, 데드락 - 교착상태 
![교착상태](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile9.uf.tistory.com%2Fimage%2F997664425C5935A0236E81)

 일련의 프로세스들이 서로가 가진 자원을 기다리며 block된 상태를 말합니다. 프로세스들이 서로 자원을 점유한 채 서로의 자원을 요청하기 때문입니다. 대표적으로 환형 대기가 있습니다. 프로세스 A가 어떤 자원을 점유한 채 다른 자원을 요청하고 있습니다. 근데 프로세스 B가 그 자원을 점유하고 있고 프로세스 B도 프로세스 A가 점유하고 있는 프로세스를 요청하여 대기 상태에 빠지게 됩니다.

발생조건
1. 상호배제(Mutual Exclusion) : 한 자원에 대한 여러 프로세스의 동시 접근 불가
2. 점유와 대기(Hold and Wait) : 자원을 가지고 있는 상태에서 다른 프로세스가 다른 프로세스가 사용하고 있는 자원의 반납을 기다리는 것. 
3. 비선점(Non Preemptive) : 다른 프로세스의 자원을 강제로 가져올 수 없음. 
4. 환형대기(Circle wait) : 각 프로세스가 다음 프로세스가 요구하는 자원을 가지고 있는 것. 

**해결방법**
 1. 자원할당을 할 때 애초에 조건이 성립을 안하게 설계
 2. 데드락 가능성이 없을 때만 자원할당, 이 때 프로세스당 요청할 자원들의 최대치를 통해 자원할당가능 여부를 파악(banker's algorithm)
 3. 데드락 detection and recover
   - 사이클이 있는지를 발견[detection]
   - 모든 데드락관련 프로세스를 죽이거나 한개씩 데드락이 사라질 때까지 지워본다. [recover#1]
   - 데드락에 관련된, 비용을 최소화할 자원을 뺏어서 데드락을 없앤다.  [recover#2] 
 4. 무시(unix, window os 채택), 데드락은 매우 드물게 일어나기 때문에 데드락을 처리하는 비용이 더 크기때문입니다. 데드락이 발생되면 사용자가 작업종료를 합니다. 

### 메모리 구조
프로그램이 실행되기 위해서는 먼저 프로그램이 메모리에 로드(load)되어야 합니다.

또한, 프로그램에서 사용되는 변수들을 저장할 메모리도 필요합니다.

 

따라서 컴퓨터의 운영체제는 프로그램의 실행을 위해 다양한 메모리 공간을 제공하고 있습니다.

프로그램이 운영체제로부터 할당받는 대표적인 메모리 공간은 다음과 같습니다.

 

1. 코드(code) 영역
CPU는 코드 영역에 저장된 명령어를 하나씩 가져가서 처리하게 됩니다.
2. 데이터(data) 영역
메모리의 데이터(data) 영역은 프로그램의 전역 변수와 정적(static) 변수가 저장되는 영역입니다.
데이터 영역은 프로그램의 시작과 함께 할당되며, 프로그램이 종료되면 소멸합니다.

3. 스택(stack) 영역
함수의 호출과 관계되는 지역 변수와 매개변수가 저장되는 영역
4. 힙(heap) 영역
메모리의 힙(heap) 영역은 사용자가 직접 관리할 수 있는 '그리고 해야만 하는' 메모리 영역입니다.

힙 영역은 사용자에 의해 메모리 공간이 동적으로 할당되고 해제됩니다.

힙 영역은 메모리의 낮은 주소에서 높은 주소의 방향으로 할당됩니다.
![메모리구조](http://tcpschool.com/lectures/img_c_memory_structure.png)


메모리의 동적 할당(dynamic allocation)
데이터 영역과 스택 영역에 할당되는 메모리의 크기는 컴파일 타임(compile time)에 미리 결정됩니다.

하지만 힙 영역의 크기는 프로그램이 실행되는 도중인 런 타임(run time)에 사용자가 직접 결정하게 됩니다.

이렇게 런 타임에 메모리를 할당받는 것을 메모리의 동적 할당(dynamic allocation)이라고 합니다
### 메모리 관리
 - 논리적 주소, 프로그램 상 올라가 있는 주소, 프로세스마다 독립적으로 가지는 주소 공간
 - 물리적 주소, 메모리에 실제 올라가 있는 위치

이러한 논리적 주소와 물리적주소를 매핑하는 것을 **주소바인딩**이라고 합니다.  
예를 들어 함수명으로 호출하면 컴퓨터에서는 논리적주소와 물리적주소로 연결합니다.  
구조 : Symbolic Address(코드) - 논리적 주소 - 물리적 주소

#### 가상메모리 
프로세스들이 메모리 여유가 없이 지나치게 많은 요구를 할 경우 이를 방지하기 위해 가상메모리가 존재합니다. 
당장 사용하지 않는 영역을 하드디스크로 옮긴 뒤, 필요할 때만 램에 데이터를 불러와 올리고 사용하지 않으면 하드디스크로 내림으로써 램을 효과적으로 관리합니다. (스와핑)
메모리관리의 단순화, 각 프로세스마다 **가상메모리의 동일한 주소 공간**을 배정할 수 있으므로 메모리 관리가 단순해집니다. 

#### 스와핑
물리적인 RAM의 허용치를 넘어설 경우 하드디스크 등 보조기억장치가 RAM의 대용이 되는데 이는 RAM보다 매우 느리기 때문에 RAM을 초과하는 데이터를 다뤄서 보조기억장치를 끌어다 쓸 경우 시스템의 속도가 확연히 느려집니다.
참고로 페이징은 주소변환입니다.

#### 물리적 메모리 할당 
메모리는 일반적으로 두가지로 나누어진다. 
 - OS 상주 영역, 낮은 주소 영역
 - 사용자 프로세스 영역, 높은 주소 영역 

여기서 사용자 프로세스 영역을 메모리 주소에 올릴 때 방법 나뉘는데 크게 **연속할당, 불연속할당**이 있습니다. 
#### 연속할당 
레지스터 2개(시작 메모리 위치, 메모리의 할당크기)를 통해서 할당합니다. 
1. 고정분할방식 : 분할의 크기를 미리 나눠서 할당합니다. 
2. 가변분할방식 : 프로그램이 실행될 때마다 차곡차곡 올려 놓는 방법입니다. size가 n이상인 hole을 찾아 할당하는 것입니다.  
- best-fit : n 이상인 공간 중 가장 작은 것 부터 할당
- first-fit : n 이상인 공간을 찾으면 바로 할당
- worst-fit : 가장 큰 hole을 찾으면 할당  

 * hole : 비어있는 메모리 공간

#### paging, 불연속할당 
현재의 컴퓨터가 쓰는 방법입니다. page별로 주소변환을 해야 하며 프로그램마다 페이지테이블을 가지고 있어야 합니다. 논리적 메모리를 동일한 크기의 페이지로 나눠서 물리적 메모리에 어디있는가를 결정합니다. 
테이블이라는 자료구조 특성상 위에서 부터 접근해야 하기 때문에 대신에 프로그램 주소 공간만큼 페이지가 생성이 되어야 합니다. 
 1. 논리적메모리를 동일한 크기의 page로 자릅니다. 보통 4kb 
 2. 매칭되는 페이지 테이블을 통해 주소변환이 되고 물리적메모리에 매핑됩니다. 페이지테이블은 메인 메모리에 위치합니다. 때문에 프로그램에 대한 메모리에 접근하기 위해서 2번접근하게 됩니다. (그래도 빠릅니다.)

이 때 속도 향상을 위해 **TLB**가 사용됩니다.  

#### TLB
TLB는 별도의 하드웨어이며 메인메모리와 CPU사이에 있는 메모리 주소변환모듈입니다. 
메인메모리에서 캐싱메모리를 통해 빠르게 접근이 가능한 것처럼 메모리를 빠르게 전환하도록 사용되는 캐싱계층입니다. 
페이지테이블에 가기전에 TLB에 그 메모리가 있는지를 파악해서 빠르게 전달합니다. 

이 페이지 테이블은 각각의 프로세스마다 페이지테이블이 존재하기 때문에 프로세스가 context switch를 하게 되면 원래 있던 것은 비워지게 됩니다.  

#### 이단계 페이지 테이블, Two-level Page table 
Hierarchical Paging의 하나의 예시입니다. 

![이단계페이지테이블](https://t1.daumcdn.net/cfile/tistory/99CD0B3359C4A82D36)

페이지테이블을 4kb에 할당하면 32비트 기준, 총 100만개의 주소공간만이 할당이 되는데 
 - 32비트 기준 2^32B, 4GB의 주소공간을 가집니다. 
그러나 대부분의 프로그램은 4G의 주소공간 중 지극히 일부분만 사용되므로 page table 공간이 심하게 낭비됩니다. 이를 다시 계층적인 page table 로 구성하여 바깥쪽 테이블과 안쪽 테이블을 활용한다면 공간 낭비를 줄일 수 있습니다. 
논리적인 주소는 p1 + p2 + d로 되어있습니다. 
 - p1 : outer page table - 10bit
 - p2 : page of page table - 10 bit
 - d : 그 안에서 몇번째를 나타내는 depth(page offset) - 12bit

안쪽 테이블은 4byte이므로 1k개를 집어 넣을 수 있으며 바깥쪽 테이블은 4kbyte이기 때문에 안쪽으로 많이 넣을 수 있습니다. 이 때 안쪽 테이블도 페이지화 되서 들어간다. 

page table의 엔트리마다 아래의 bit를 둡니다.
- protection bit, page에 대한 접근 권한(read / write / read-only)
코드는 read-only, 데이타들은 read, write 가능하게 설계됩니다.

이렇게 2단계 페이지를 만드는데도 효율성이 높아집니다. 
왜냐하면 바깥쪽 테이블만 만들고 안쪽테이블은 만들어지지 않는게 많기 때문입니다.

#### inverted page table, 역페이지 테이블
그렇게 해도 페이지 테이블은 너무나 클 수 있습니다. 프로세스마다 본인의 페이지테이블을 가지고 있기 때문입니다. 
많은 프로세스를 실행시키면 차지하는 메모리양이 늘어나게 되죠. 그렇기 때문에 나온 테이블이 바로 역 페이지 테이블, inverted page table입니다. 하나의 global 페이지 테이블을 갖고 프로세스를 구분할 수 있는 PID 정보와 page number 정보를 가지고 있습니다. 그렇게 실제 메모리 적재된 프레임의 주소만을 가지고 가상 주소로 매핑시킴으로써 메모리 크기를 줄입니다. 하지만 주소변환요청이 들어오면 페이지 엔트리를 전부다 검색해야 하는 단점이 있습니다.  

#### Shared Page
read - only 로 하여 프로세스 간에 하나의 code만 메모리에 올리는 것입니다. 
중복 코드가 있을 때 공유하는 페이지 기법입니다. 
코드가 동일하다면 동일한 논리적 메모리에 위치해야 합니다. 
**valid / invalid bit**, 사용되냐 안되냐를 위해서 사용되는 비트로 프로세스 내용이 있느냐 없느냐만 파악합니다. 

#### segmentation, 불연속할당
프로세스 주소공간을 의미단위로 쪼갭니다.(페이지처럼 동일한 크기가 아닙니다.)
segment number, offset 로 이루어져있으며 번호만큼 떨어진 위치로 가면 

1. limit(세그먼트의 길이) 
2. base(세그먼트 시작위치)

라는 구성의 의미단위로 자르기 때문에 길이가 다를 수 있습니다.  그렇기 때문에 중간 중간에 hole들이 생깁니다.  
각 세그먼트 별로 Protection bit 이 있습니다. 길이가 다르므로 가변분할과 동일한 문제점 발생, 의미단위로 공유와 보안에 대해 효과적입니다.  r, w, x 비트를 만들어 해당 세그먼트에 대한 접근 제어를 하는데 페이지는 같은 간격으로 자르는 대신 segmentation은 코드영역, 내용측면 등으로 잘라지기 때문에 그 기능을 수행하기 쉬워집니다. code, data, stack 부분이 하나의 세그먼트로 이 엔트리는 사용하는 엔트리의 갯수만큼 만들어집니다. 
 - 운영체제는 메모리할당에 대해서 관여하지 않고 하드웨어적으로만 작동됩니다. 운영체제를 거치는 경우는 IO작업이 필요한 트랩의 경우에만 해당이 됩니다. 

#### segmentation & paging
공유나 보안은 세그먼트로 의미단위로 하고 물리적 메모리는 페이지로 하는 것을 말합니다.  
 
### 가상메모리의 Demanding Paging, page fault
프로세스가 메모리에 없는 페이지를 접근하려 할 때 페이지 부재 트랩(page falut trap)을 발생시킨다. 페이징 하드웨어는 페이지 테이블을 이용한 주소 변환 과정에 무효 비트(invalid-bit)를 발견하고 운영체제에 트랩을 걸게 된다. 이 때 비트가 유효하면 메모리에 있는 것을 의미하고 유효하지 않으면 메모리에 없거나(디스크에있거나) 해당 페이지가 유효하지 않다는 것
을 의미한다.  
1. 프로세스에 대한 내부 테이블(internal table)을검사해서 그 메모리 참조가 유효/무효인지를 알아 낸다.
2. 무효한 페이지에 대한 참조라면 프로세스는 중단 된다. 유효한참조인 경우 메모리에 없으면 디스크로 부터 가져와야 한다.
3. 빈 공간, 자유 프레임(free frame)을 찾거나 replace를 합니다. 
4. 디스크에 새로이 할당된 프레임으로 해당 페이지를 읽어 들이도록 요청
5. 디스크 읽기가 끝나면 이 페이지가 메모리에 있다는 것을 알리기 위해 페이지 테이블을 갱신하며프로세스가 유지하고 있는 내부 테이블을 수정 한다.
6. 트랩에 의해 중단되었던 명령을 다시 수행하며 프로세스는 그 페이지가 항상 메모리에 있었던것처럼 간주하여 해당 페이지를 접근 할 수 있다.  

디스크는 메모리에 비해 수십만배 ~ 백만배 느리기 때문에 page fault가 많이 발생이 되면 느려지게 됩니다.  

자신의 주소 공간에는 존재하지만 시스템의 RAM에는 현재 없는 데이터나 코드에 접근 시도하였을 경우 발생하는 현상을 말하며 메모리 유효접근시간은 (1 - p) * 메모리 접근시간 + p(OS & HW page fault overhead, swap page, OS & HW restart overhead)이 됩니다. 

#### MMU
메모리 관리 장치(Memory Management Unit, 줄여서 MMU)는 CPU가 메모리에 접근하는 것을 관리하는 컴퓨터 하드웨어 부품입니다. 가상 메모리 주소를 실제 메모리 주소로 변환하며, 메모리 보호, 캐시 관리, 버스 중재(버스는 컴퓨터시스템의 구성 요소들(CPU, 기억장치, I/O 장치들)을 상호 연결해주는 통로)등의 역할을 담당합니다. CPU가 MMU에게 주소할당요청을 통해 메모리가 할당되게 됩니다.  

그렇다면 어떤 것과 replace를 할 것인가?  아래의 알고리즘들을 Buffer Replacement algorithm이라고 합니다. 
#### offline-algorithm, optimal 
가장 먼 미래에 참조되는 페이지를 쫓아냅니다. 원래 있는 것 중에서 가장 먼 미래에 참조되는 페이지를 바꿉니다.사용할 수 없지만 다른 알고리즘 성능 비교에 대한 upper bound를 제공합니다. 이것보다 더 나은 방법이라는 것은 있을 수 없습니다. 
#### FIFO
메모리에 먼저 들어온 것을 먼저 쫓아냅니다. 메모리프레임을 늘려줘도 page fault가 증가하는 문제점 발생
#### LRU, Least Recently Used 
가장 오래된 참조를 바꾼다. 최근에 참조된 것들이 다시 참조될 가능성이 높기 때문이다. 
 - Linked list로 구현 O(1) 참조될 때마다 그 부분을 가장 아래쪽으로 매달면 됨.  

오래된 시간이 걸린 것을 파악하기 위해 각 페이지마다 계수기, 스택을 두어야 하며 때문에 오버헤드 발동, 이를 해결하기위해 NUR이라는 기법(clock 알고리즘) 등장, 참조, 변형 비트로 최근의 사용여부를 파악해서 교체함.

#### LFU,Least Frequently Used
참조횟수가 제일 적은 것을 바꾼다.가장 적은 참조를 바꾼다. 참조횟수가 같다면 오래된 참조를 바꾸는 것이 좋다.
 - HEAP을 통해 O(logn) 구현 

### clock 알고리즘
LRU의 근사 알고리즘으로 불린다. 최근에 사용되지 않은 프로세스를 쫓아 냅니다.
reference bit을 1로 설정, 최근에 참조되었다를 의미합니다. 시계방향을 돌면서 0을 찾아서 바꿉니다.
운영체제는 circular linked list를 사용하여 0을 찾아서 바꿉니다. 그리고 지나가면서 reference bit이 1인것은 0으로 바꿉니다. 
```
  P   U   3    P   U   2   P   U   3   P   U   0   P   U   8   P   U  4
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+---+
|   | 0 |*   | 3 | 1 |   | 3 | 1 |   | 3 | 1 |   | 3 | 1 |   | 3 | 1 |
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+---+
|   | 0 |    |   | 0 |*  | 2 | 1 |   | 2 | 1 |   | 2 | 1 |   | 2 | 1 |
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+---+
|   | 0 |    |   | 0 |   |   | 0 |*  |   | 0 |*  | 0 | 1 |   | 0 | 1 |
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+---+
|   | 0 |    |   | 0 |   |   | 0 |   |   | 0 |   |   | 0 |*  | 8 | 1 |
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+---+
|   | 0 |    |   | 0 |   |   | 0 |   |   | 0 |   |   | 0 |   |   | 0 |*
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+----  


  P   U   2    P   U   5   P   U   0   P   U   9   P   U   8   P   U  3
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+---+
| 3 | 1 |*   | 3 | 1 |*  | 5 | 1 |   | 5 | 1 |   | 5 | 1 |   | 5 | 1 |
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+---+
| 2 | 1 |    | 2 | 1 |   | 2 | 0 |*  | 2 | 0 |*  | 9 | 1 |   | 9 | 1 |
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+---+
| 0 | 1 |    | 0 | 1 |   | 0 | 0 |   | 0 | 1 |   | 0 | 1 |*  | 0 | 1 |*
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+---+
| 8 | 1 |    | 8 | 1 |   | 8 | 0 |   | 8 | 0 |   | 8 | 0 |   | 8 | 1 |
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+---+
| 4 | 1 |    | 4 | 1 |   | 4 | 0 |   | 4 | 0 |   | 4 | 0 |   | 4 | 0 |
+---+---+    +---+---+   +---+---+   +---+---+   +---+---+   +---+----  


  P   U   2    P   U   
+---+---+    +---+---+ 
| 5 | 1 |*   | 5 | 0 | 
+---+---+    +---+---+ 
| 9 | 1 |    | 9 | 0 |
+---+---+    +---+---+
| 0 | 0 |    | 2 | 1 |   
+---+---+    +---+---+  
| 8 | 0 |    | 8 | 0 |*
+---+---+    +---+---+ 
| 3 | 1 |    | 3 | 1 |  
+---+---+    +---+---+  

* = indicates the pointer which identifies the next location to scan 
P = page# stored in that frame 
U = used flag, 
0 = not used recently 
1 = referenced recently

This is called linear scanning algorithm or Second chance algorithm, used in BSD Linux. 
Generally it is implemented as a circular queue
```

### COW
프로세스1과 프로세스2가 같은 자원을 활용하고 있을 때 그 자원을 수정하면 문제가 발생할 수 있다. 
이런 상황을 막기 위해 평소에는 같은 자원을 공유했지만 자원을 수정할 경우, 복사본을 쓰는 것이다. 
복사를 했지만 원래는 원본을 보여주며 그 데이타 수정을 가할 때 copy되는 것을 말합니다.

### page frame의 allocation
프로그램마다 할당받아야 하는 페이지의 개수를 조절하는데도 알고리즘이 필요합니다. 아래의 방법들이 있습니다. 
1. 모든 프로그램에 똑같은 갯수를 할당
2. 프로그램 크기에 비례 할당
3. 프로세스 우선순위에 따라 다르게 할당

#### Thrashing 
![쓰레싱](https://t1.daumcdn.net/cfile/tistory/24388A4057188EAD38)

프로세스가 너무 적은 page를 할당받은 경우 발생하며 page fault rate가 높아지게 됩니다.  대부분의 프로세스들이 스와핑으로 인한 많은 시간을 소비하게 되여 CPU 이용률이 낮아집니다. OS에서는 CPU이용률이 더 떨어져 다중프로그래밍 정도를 높이고 page fault가 더 자주 발생하는 악순환에 빠져 심각한 성능저하의 원인이 됩니다. 

메모리에 너무 많은 프로세스가 동시에 올라가게 되면 동시에 올라가는 메모리 갯수를 조절해줘야 합니다. 이를 위한 알고리즘은 다음과 같습니다.  

#### working-set
지역성, locality를 기반으로 주로 참조하는 페이지를 계산해서 이를 통해 미리 예상되는 페이지를 메모리에 로드하는 것입니다. 이를 기반으로 한꺼번에 올라와있어야 하는 페이지들의 집합을 working set이라고 하며 과거를 통해 working-set을 참조합니다.

#### page fault frequency algorithm 
상한값과 하한값으로 조절하여 그 안에서 page fault rate에 따라서 페이지 갯수를 조절합니다.

## FILE
파일시스템이란 컴퓨터에서 파일이나 자료를 쉽게 발견 및 접근할 수 있도록 보관 또는 조직하는 체제를 가리키는 말하며 파일이란  다양한 저장장치를 file 이라는 논리적 단위로 볼 수 있게 해준다.  파일을 읽게 되면 순차적으로 위치포인터가 이동해가며 읽게 된다. 

### open()
이 파일의 메타데이타를 메모리에 올려놓는 과정을 말합니다.

1. Open[사용자 메모리영역]
2. 시스템콜 > 운영체제로 넘어간다. [커널 메모리영역]
3. root의 metadata를 올린다. [커널 메모리영역]
4. root의 content의 해당 메타데이타가 있어서 메타데이타를 메모리영역에 올리며 순차적으로 찾아간다.[커널 메모리영역]
5. 해당 디렉토리의 meta 데이타를 찾게 되면 그 파일의 메타데이터의 포인터가 몇 번째 인덱스 (file descriptor)인 것을 반환하게 됩니다. 

이 때 똑같은 파일을 두번 요청하게 되면 **메모리영역**에 미리 올려 놓은 것을 리턴하게 됩니다. 이것을 `버퍼캐싱`이라고 합니다.
이 때, 메타데이타를 디스크에서 메모리에 올려 놓게 되면 현재 이 프로세스가 이 파일의 어느 위치, offset을 참조하고 있는가를 나타내는 데이타가 필요합니다. 

### File Protection 방법
누구에게 read, write, execution 을 허락할 것인가를 정하는 방법입니다. 
 - Access control Matrix :  행 : user, 열 : file에 대해서 권한을 사용해서 하는 방법
 - Grouping : 전체 user을 owner, group, pulic의 세 그 룹으로 구분하여 3비트씩으로 표시 (UNIX)
 - Password : 파일마다 password를 두는 방법입니다.

### FILE 용어
 - file attribute, 메타데이터 : 파일을 관리하기 위한 각종 정보들
 - file system : 운영체제에서 파일을 관리하는 부분, 파일 및 파일의 메타데이타 등을 관리, 파일의 저장 방법을 결정 
 - Directory : 파일의 메타데이터 중 일부를 보관하고 있는 일종의 특별한 파일(파일 이름을 그 위치로 바꿔준다), 파일 이름, 파일 attribute를 담고 있습니다. 디렉토리의 연산은 search / create / delete / list a diretory / rename / traverse the File System이 있습니다. 
 - 마운트 : 특정 디렉토리에 파일시스템을 탑재 

### 파일을 디스크에 저장하는 방법
 - 연속할당 : 파일들은 start와 length를 가지고 있는데 순차적으로 할당, 파일이 커질 때 반응하기가 어렵, 삭제했을 경우 빈공간이 발생, 그 공간에 들어가지 않는 현상 발생 
 - Linked Allocation : 빈위치에 아무렇게나 들어가기. 포인터로 연결하지만 포인터를 위한 공간이 필요. 공간 효율성 저하
 - Indexed allocation : 파일의 크기에 따라 순차적으로 index가 주어짐. 인덱스 블록을 만듬. 작은 파일의 경우 공간을 낭비  
 
### Memory - Mapped I/O
파일의 일정부분을 가상메모리에 매핑을 해서 메모리 직접연산을 통해서 
메모리 접근하는 연산을 통해 파일 입출력을 수행하게 하는 것. 물리적메모리에 있는 내용을 카피해서 쓰는게 file read & write call이고
물리적메모리와 가상메모리를 매핑하여 쓰는것이 MMAP,  Memory - Mapped I/O, 시스템콜을 하지 않고 메모리를 통해 접근하기 때문에 효율이 높다. 
한번의 메모리카피가 줄어들다.  

#### 디스크 스케줄링 알고리즘, 찾는 시간을 최소화 하자 
 - FCFS(First Come First Served): 들어오는 순서대로 처리 
 ![그림](https://t1.daumcdn.net/cfile/tistory/99AB873C5BDF03AF03)
 - SSTF(Shortest Seek Time First) : 현재 헤드에서 가장 가까운 트랙의 요청을 먼저 처리  
 ![그림](https://t1.daumcdn.net/cfile/tistory/99F8B13C5BDF03AF0B)
 - SCAN  : 헤드에서 처리하다가 끝까지 이동후 방향 전환
 ![그림](https://t1.daumcdn.net/cfile/tistory/997ABB3C5BDF03B026)
 - C-SCAN : 한쪽 방향으로 끝까지 가고, 그리고 다시 한쪽방향 처음으로 가서 스캔 
 ![그림](https://t1.daumcdn.net/cfile/tistory/99C6553C5BDF03AF30)
 - LOOK & C-LOOK : 스캔을 하다가 그 방향에 처리할 요청이 없다면, 헤드가 이동하는 방향에 더 이상 요청이 없다면 방향을 바꾼다.  제일 낮은 주소로 가서 다시 탐색(이게 가장 효율적인 것으로 알려져있음) 
 ![그림](https://t1.daumcdn.net/cfile/tistory/993BC6455BDF09B605)

# 스펙
## MongoDB
대용량INSERT에 대한 요건이 커지면서 NOSQL DBMS가 도입 시작되었고 방대한 양의 데이터를 충분히 빠른 속도로 처리할 수 있는 데이터베이스입니다. 
먼저 NoSQL, Not Only SQL이며 관계형 DB가 아닌 유동적인 DB라는 특징이 있습니다. 
NoSQL은 데이터의 일관성을 약간 포기한 대신 여러 대의 컴퓨터에 데이터를 분산하여 저장하는 것(Scale-out : 수평적 확장)을 목표로 등장하였습니다. NoSQL의 등장으로 작고 값싼 장비 여러 대로 대량의 데이터와 컴퓨팅 부하를 처리하는 것이 가능하게 되었고 유연성, 확장성 등이 RDBMS에 비해 좋습니다. 
<p align="center"> 
  <img src="https://raw.githubusercontent.com/wnghdcjfe/happyKundol/master/prepare/img/db.jpg" width="700">
</p> 
스토리지엔진 : 디스크에서 데이터를 어떻게 가져오고 어떻게 최적으로 저장할 것인지 결정하는 부분이 스토리지 엔진이다

<p align="center">
  <img src="https://raw.githubusercontent.com/wnghdcjfe/happyKundol/master/prepare/img/2.png" width="700">
</p>
 
여기서 중요한 부분은 스토리지엔진입니다. 이 엔진은 디스크에서 데이터를 어떻게 가져오고 어떻게 최적으로 저장할 것인지를 결정합니다. 3.2이상은 wiredTiger가 default이며 이외에도 MMAPv1, RocksDB가 있습니다.

서버안에 MongoDB자체의 메모리버퍼가 전체 메모리의 50%를 쓰게 됩니다. 때문에 한 서버안에 프라이머리 / 세컨더리 두개 절대 놓지 않는 것이 중요합니다. 왜냐하면 서버의 메모리를 100% 가까이 쓰게 되면 정적파일을 클라이언트에게 제대로 못준다거나 요청을 제대로 처리하지 못하는 등의 오류들이 발생하게 되기 때문입니다.

트랜젝션이 일어나게 되면 Jounal log에 쌓이고 Buffer pool로 들어가 체크포인트, 그리고 eviction작업이 일어나게 됩니다.
이 때, 메모리가 부족할 경우 eviction이 잘되지 않고 메모리버퍼를 아예 지우는 작업을 하고 심할 경우 데몬이 죽게 됩니다.   

 - ▶ 용어 : eviction: 메모리버퍼에서 필요없는 데이타를 삭제하는 작업
 - ▶ 용어 : 체크포인트: 메모리 버퍼와 디스크사이의 데이터 불일치를 해소하기 위해 메모리에서 디스크로 data 동기화를 하는 작업
 - ▶ 용어 : 저널링 : 변경이록을 저장해서 롤백을 할 수 있도록하기 위함, 이 롤백은 ACID 중 지속성에 해당하는 것입니다.

  + 데몬

멀티태스킹 운영 체제에서 데몬은 사용자가 직접적으로 제어하지 않고, 백그라운드에서 돌면서 여러 작업을 하는 프로그램을 말한다. 시스템 로그를 남기는 syslogd처럼 보통 데몬을 뜻하는 ‘d’를 이름 끝에 달고 있으며, 일반적으로 프로세스로 실행된다.

​

데몬은 대개 부모 프로세스를 갖지 않으며, 즉 PPID가 1이며, 따라서 프로세스 트리에서 init 바로 아래에 위치한다. 데몬이 되는 방법은 일반적으로 자식 프로세스를 포크(fork)하여 생성하고 자식을 분기한 자신을 죽이면서 init이 고아가 된 자식 프로세스를 자기 밑으로 데려가도록 하는 방식이다. 이러한 방법을 ‘fork off and die’라 부르기도 한다.

​

시스템은 시동할 때 데몬을 시작하는 경우가 많으며, 이런 데몬들은 네트워크 요청, 하드웨어 동작, 여타 프로그램에 반응하는 기능을 담당하게 된다. 그 밖에도 몇몇 리눅스에 있는 devfsd처럼 하드웨어 설정이나, cron처럼 주기적인 작업을 실행하는 등 기타 다양한 목적으로 사용된다.

데몬은 부팅 중에 메모리에 로딩되어 컴퓨터가 종료될 때까지 유지된다. 

데몬프로그램의 명령어는 d로 끝난다. 예를 들어 ftpd, mysqld, httpd

일반 process는 실행 상태에 들어가 일련의 명령을 수행하고 명령이 끝나면 process가 소멸되는데 비해 daemon process는 일련의 명령이 끝나도 소멸되지 않고 메모리 상에 상주하면서 특정한 조건이 되면 다시 명령을 수행하는 process라고 한다.  

리눅스 상에서 현재 실행되고 있는 데몬의 현황을 보려면 pstree 명령어를 쓴다. stand-alone, 시스템에 상주하면서 클라이언트 요청이 오면 처리해주는 방식과  수퍼데몬 방식(xinetd),클라이언트 요청이 있을 때만 슈퍼데몬이 해당 데몬을 실행시키는 방식이 있다. 


### MonogoDB 특징
MongoDB의 특징은 정말 많지만 크게 10가지만 뽑아 보았습니다.  
1. 그리고 한개의 DATA 구조는 key - value 형태로 이루어져 있으며 _id라는 고유한 아이디를 가집니다. 또한 MongoDB는 JSON 형태로 쿼리를 만들고 JSON을 인자로 받아 BJSON 형태로 DB에 삽입, 추출이 가능합니다. 그렇기 때문에 Type 변환이 일어나지 않으며 이를 통해 JSON데이타를 주고받을때 성능적으로 MongoDB는 더 나은 선택이 됩니다.또한 MongoDB의 가장 작은 단위인 data는 document, 문서라 불립니다.
2. 스키마 없이 데이터모델을 구현하지 않은채 그냥 유동적으로 데이타를 삽입할 수 있습니다. 
- 스키마 : 데이타베이스를 구성하는 속성, 관계 등 데이타 값들이 갖는 type들을 명시 해놓은 것을 말합니다. 
- 장점 : 다양한 서비스로부터 데이타를 쌓을 때 유동적으로 쌓을 수 있음
- 단점 : RDBMS인 경우에는 int, char[14]인 경우에는 18바이트 그러나 몽고디비는 한 도큐먼트로 칼럼이름또한 바이트에 추가가 되기때문에 바이트가 더 커집니다. 즉, 공간적인 소모가 많습니다.
3. min, max, aggreate, mapReduce 등 강력한 함수로 데이터를 뽑아내고 조합하는 등의 활동을 할 수 있습니다. data들을 모아서 초최대값을 뽑아내거나 최소값 등등의 행위를 할 수 있습니다.  
4. ReplicaSet을 이용해 이중화가 가능합니다. 
5. BJSON(Binary JSON) 형태로 저장합니다. JSON이 아니므로 lean()을 통해 순수 JSON을 만듭니다. 또한 JSON Object를 인자로 받아 추가하고 결과값을 JSON Object로 반환할 수 있습니다.
6. geoSpartial 인덱스를 써서 2Dimension좌표탐색에 활용이 가능합니다.  
7. $lookup을 통한 collection join이 가능합니다.
8. MongoDB의 ObjectId
각 문서는 _id라는 고유한 키를 갖는게 특징입니다. 각 문서를 생성하면 _id라는 primary key가 생성됩니다. 이후 인덱스로 설정되는 키값은 secondary key로 저장됩니다.  
이 키는 12byte로 아래로 구성이 됩니다. 
 1. 4-byte의 초단위의 유닉스시간(1970년 1월 1일부터의 초단위)
 2. 5-byte의 랜덤value
 3. 3-byte의 random value로 부터 순차적인 값 
9. 도큐먼트에서 _id 라는 필드가 자동으로 그 도큐먼트의 프라이머리 키로 선정됩니다. 나머지의 인덱스는 세컨더리 키로 선정됩니다
10. 인덱스의 기본 정렬은 항상 오름차순으로 구현돼 있지만 이 인덱스를 읽는 방향에 따라서 오름차순 또는 내림차순의 효과를 얻을 수 있으며 인덱스에서 각 필드의 정렬을 오름차순, 내림차순 으로 결정할 수 있으며 대부분의 인덱스는 B-Tree를 적용합니다.(인덱스 정렬은 B-tree에서만 가능) 

### 이외 특징
1. 3.0, 3.2.x 이하 버전에서는 WireTiger 엔진 사용시 eviction 문제가 발생할 수 있습니다. 3.2.11 또는 3.4 이상버전을 권장합니다.
2. Background Index생성시 DB 자체에 Lock이 걸리며 쿼리지연이 발생되는데 이는 주로 새벽에 생성됩니다.
3. TDE 플러그인을 통해 엔터프라이즈버전에서 제공하는 보안적용이 가능합니다. 이 보안적용은 응용프로그램으로 보안이 가능(bcrypt모듈 등으로 암호화 하는 것)하지만 범위검색의 경우 수행이 불가한 것을 해결해줍니다.
4. 3.2이상의 경우 wired Tiger엔진이 default로 사용됩니다. LSM_Tree(로그 기반 병합트리)를 이용 읽기 성능을 포기하고 그만큼의 저장 성능을 향상시킨 솔루션이며 그로 인해 느린 읽기 성능을 보완하기 위해 블룸 필터를 사용 
5. 샤딩환경에서 index 설정시 각 샤딩환경안에서만 유니크합니다. 샤딩이란 같은 테이블 스키마를 가진 데이타를 다수의 DB에 분산하여 저장하는 방법

샤딩에도 제약이 있다. 샤딩의 대표적인 제약 사항은 다음과 같다.
 - 두 개 이상의 샤드에 대한 JOIN 연산을 할 수 없다.
 - auto increment (serial) 등은 샤드별로 달라질 수 있다. 
 - 하나의 트랜잭션에서 두 개 이상의 샤드에 접근할 수 없다.


### Hbase와의 비교
조회조건에 따라서 세컨더리 인덱싱이 필요하는데 Hbase는 그걸 하지 못하며 하둡에 올라가서 물리적으로 분리가 되어있으나 MongoDB는 샤드 단위로 논리적으로 분리가 되어있으며 wired tiger로 높은 수준의 ACID를 할 수 있다. 또한 REST API를 사용하니까 편리하게 JSON을 제공할 플랫폼이 필요! 이를 위한 MongoDB (샤드는 데이터 검색을 위해 구분되는 최소 단위)

## Node.js 
Node.js는 비동기적 이벤트주도방식, 논블로킹 I/O모델을 사용하는 구글의 V8 엔진을 장착한 자바스크립트 런타임입니다  

 - I/O모델 : 주로 libuv가 지원하는 시스템 디스크나 네트워크와 상호작용하는 것 
 - 멀티코어 : child_process.fork() API를 사용해서 자식 프로세스를 생성할 수 있습니다. 같은 인터페이스로 만들어진 cluster을 사용하면 다수의 코어에 로드 밸런싱이 가능하도록 프로세스 간에 소켓을 공유할 수 있습니다. 

### 이벤트 루프, 타이머
이벤트 루프는 가능하다면 언제나 시스템 커널에 작업을 떠넘겨서 Node.js가 논 블로킹 I/O 작업을 수행하도록 해줍니다.(JavaScript가 싱글 스레드임에도 불구하고)

이러한 작업 중 하나가 완료되면 커널이 Node.js에게 알려주어 적절한 콜백을 poll 큐에 추가할 수 있게 하여 결국 실행
```
  ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

 - timers: 이 단계는 setTimeout()과 setInterval()로 스케줄링한 콜백을 실행합니다.제공된 콜백이 일정 시간 후에 실행되어야 하는 기준시간을 지정
 - pending callbacks: 다음 루프 반복으로 연기된 I/O 콜백들을 실행합니다.이 단계에서는 TCP 오류 같은 시스템 작업의 콜백을 실행합니다. 예를 들어 TCP 소켓이 연결을 시도하다가 ECONNREFUSED를 받으면 일부 *nix 시스템은 오류를 보고하기를 기다리려고 합니다.
 - idle, prepare: 내부용으로만 사용합니다.
 - poll: 새로운 I/O 이벤트를 가져옵니다. I/O와 연관된 콜백(클로즈 콜백, 타이머로 스케줄링된 콜백, setImmediate()를 제외한 거의 모든 콜백)을 실행합니다. 적절한 시기에 node는 여기서 블록 합니다.poll 큐가 비어있지 않다면 이벤트 루프가 콜백의 큐를 순회하면서 큐를 다 소진하거나 시스템 의존적인 하드 한계에 도달할 때까지 동기로 콜백을 실행합니다.poll 큐가 비어있다면 다음 중 하나의 상황이 발생합니다.스크립트가 setImmediate()로 스케줄링되었다면 이벤트 루프는 poll 단계를 종료하고 스케줄링된 스크립트를 실행하기 위해 check 단계로 넘어갑니다.스크립트가 setImmediate()로 스케줄링되지 않았다면 이벤트 루프는 콜백이 큐에 추가되기를 기다린 후 즉시 실행합니다.
 - check: setImmediate() 콜백은 여기서 호출됩니다.setImmediate()는 사실 이벤트 루프의 별도 단계에서 실행되는 특수한 타이머입니다. setImmediate()는 poll 단계가 완료된 후 콜백 실행을 스케줄링하는데 libuv API를 사용합니다.
 - close callbacks: 일부 close 콜백들, 예를 들어 socket.on('close', ...).setImmediate()와 setTimeout()은 비슷하지만 호출된 시기에 따라 다르게 동작합니다.setImmediate()는 현재 poll 단계가 완료되면 스크립트를 실행하도록 설계되었습니다.setTimeout()는 최소 임계 값(ms)이 지난 후 스크립트가 실행되도록 스케줄링합니다.

### process.nextTick()
비동기 함수가 아닌 것을 비동기로 만들 수 있는 것. 

모든 이벤트는 한번에 하나씩 처리된다. 그래서 노드는 I/O가 많은 작업에 적합하고 CPU 작업량이 많은 작업에는 적합하지 않습니다. 모든 I/O기반 작업에서 이벤트큐에 추가될 콜백을 쉽게 정의할 수 있습니다. 콜백은 I/O작업이 완료되면 실행되고 동시에 어플리케이션은 다른 I/O작업에 대한 요청을 계속해서 처리할 수 있습니다.

process.nextTick()은 액션의 실행을 이벤트루프의 다음 차례까지 실제로 연기합니다. 
```js
function foo() {
  console.log('foo');
}

process.nextTick(foo);
console.log('bar'); // bar foo
```

CPU 작업량이 많은 계산을 계속해서 실행해야 하는 compute() 작업을 가정해 보겠습니다. 같은 노드 프로세스에서 HTTP요청의 처리같은 다른 이벤트도 처리해야 한다면 process.nextTick()을 사용해서 다른 이벤트를 처리하면서 compute()의 실행을 나누어서 처리할 수 있습니다.
```js
var http = require('http');

function compute() {
  // 복잡한 계산을 계속해서 수행한다
  // ...
  process.nextTick(compute);
}

http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(5000, '127.0.0.1');

compute();
```

#### 스트림
 - [프로세스 관점] : 데이터 입출력 처리의 중간자 역할, 큐에 의한 메세지 전달방식 등을 이용한 가상 연결 통로 또는 구현 소프트웨어 모듈
 - [데이터 관점] : 일반적으로, 데이터,패킷,비트 등의 일련의 연속성을 갖는 흐름을 의미
 - C언어가 가지고 있는 표준 입력 스트림, stdin, stdout  

### V8 저스트인타임 컴파일러
2008년부터 V8을 이용한 JIT, 프로그램을 실제 실행하는 시점에 기계어로 번역하는 컴파일 기법이다. 이 기법은 프로그램의 실행 속도를 빠르게 하기 위해 사용된다.

전통적인 입장에서 컴퓨터 프로그램을 만드는 방법은 두 가지가 있는데, 인터프리트 방식과 정적 컴파일 방식으로 나눌 수 있다. 이 중 인터프리트 방식은 실행 중 프로그래밍 언어를 읽어가면서 해당 기능에 대응하는 기계어 코드를 실행하며, 반면 정적 컴파일은 실행하기 전에 프로그램 코드를 기계어로 번역한다.

JIT 컴파일러는 두 가지의 방식을 혼합한 방식으로 생각할 수 있는데, 실행 시점에서 인터프리트 방식으로 기계어 코드를 생성하면서 그 코드를 캐싱하여, 같은 함수가 여러 번 불릴 때 매번 기계어 코드를 생성하는 것을 방지한다.

### V8 - 히든클래스
기존의 속성은 딕셔너리를 이용해서 비용이 많이 드는데 V8에서는 오프셋을 이용해서 메모리 주소로 점프, 또한 같은 히든클래스는 캐싱이 된다. 어떤게 캐싱이 되는가? 바로 다음과 같다. 
 - 속성 변경의 순서 통일
 - 동일 메소드의 경우 

### V8 - GC, 가비지 컬렉션
전역 변수를 최소화 하고 DOM에서 벗어난 태그는 참조하지 말아야 한다.  
1. 할당 > 사용 > 해제
2. 참조를 기반으로 해제
3. 최종적으로 마크스위프 알고리즘, root로 부터 닿을 수 있는가 없는가를 통해 해제 

### 메모리 누수주의!!
전역변수 / 잊혀진 콜백함수 / 사라진 DOM의 참조 / 클로저

## D3.js 
매우 작은 용량의 라이브러리로 정말 작은 부분 하나하나 세세하게 커스터마이징이 가능한 장점을 가지고 있습니다. 
 - Bitmap(canvas) : 성능이 중요하고 디자인은 덜중요할 때 (빠른 대용량 데이터 처리) 
 - vector : 디자인 및 요소별을 커스터마이징, 다양한 해상도 중요

다른 라이브러리와 비교

| 라이브러리 | 용량(min기준) | 러닝커브 | 인터페이스 | 표현방법
|:--------|:--------| --------| --------| --------| 
| chart.js	| 153kb | 쉬움 | 보통 | bitmap
| echarts.js | 729kb | 매우쉬움 | 보통 | bitmap
| D3.js	| 237kb | 보통 | 매우높음 | vector Or bitmap
| C3.js	|  | 보통 | 매우높음 | vector

## nginx 
오버플로우 방지를 위해 nginx를 proxy서버 앞단에 두는 것이 좋다. 싱글 프로세스 스레드. 논블로킹

버퍼 오버플로우 : 버퍼는 보통 데이타가 저장되는 메모리 공간을 뜻하는데 메모리 공간을 벗어나는 경우 오버플로우가 되고 이 때 사용되지 않아야 할 영역에 데이터가 덮어씌워져 주소, 값을 바꾸는 공격입니다.

gzip : html, javascript, css 등을 압축해줘서 리소스를 받는 로딩시간을 줄여주어서 성능을 개선시켜 줍니다 하지만 Gzip을 압축하고 푸는데도 서버와 웹브라우저에 약간의 CPU가 쓰이게 되므로 통상적으로 1kb ~ 2kb 이하는 Gzip을 압축하지 않는것이 좋습니다.

CGI : Common GateWay Interface 는 웹서버에서 정적인 컨텐츠가 아닌 동적인 컨텐츠를 사용자에게 제공하기 위한 인터페이스, 이 CGI의 요청에 따라 프로세스가 생성되는 문제가 있는데 이걸 해결, 많은 요청을 하나의 프로세스에서 처리하는 것이 FastCgi입니다. 웹서버가 요청을 받으면 응답에 필요한 데이타를 웹서버에게 넘겨주고 웹서버는 HTML 또는 필요한 데이타를 클라이언트에게 전달합니다. 
- 비동기 Event-Driven 기반 구조.  
- 다수의 연결을 효과적으로 처리가능.  
- 대부분의 코어 모듈이 Apache보다 적은 리소스로 더 빠르게 동작가능
- 더 작은 쓰레드로 클라이언트의 요청들을 처리가능

## Apache
정적인 데이터를 처리하는 웹서버 , 무겁다. 아파치는 기본적으로 80포트
- 쓰레드 / 프로세스 기반 구조로 요청 하나당 쓰레드 하나가 처리하는 구조 
- 사용자가 많으면 많은 쓰레드 생성, 메모리 및 CPU 낭비가 심함 
- 하나의 쓰레드 : 하나의 클라이언트 라는 구조

Client에서 요청을 받으면 MPM (Multi Processing Module : 다중처리모듈) 이라는 방식으로 처리를 하는데 대표적으로는 Prefork와 Worker방식이 있다. 간단하게 어떤식으로 처리하는지 알고 넘어가자.

### Prefork, 프로세스 기반 방식
실행중인 프로세스를 복제되어 처리가 된다. 각 프로세스는 한번에 한 연결만 처리하고 요청량이 많아질수록 프로세스는 증가하지만 복제시 메모리영역까지 복제되어 동작하므로 프로세스간 메모리 공유가 없어 안정적이라 볼수 있다. 

### Worker, 스레드 기반 방식
Prefork 동작방식이 1개의 프로세스가 1개의 스레드로 처리가 되었다면 Worker 동작방식은 1개의 프로세스가 각각 여러 쓰레드를 사용하게 된다. 쓰레드간의 메모리를 공유하며 PreFork방식보다 메모리를 덜 사용하는 장점이 있다.

## 아파치 톰캣(Apache Tomcat)
동적인 데이터를 처리하는 WAS, 톰캣은 기본적으로 8080포트로 연결, 톰캣은 아파치 소프트웨어 재단의 어플리케이션 서버로서, 자바 서블릿을 실행시키고 JSP코드가 포함되어 있는 웹 페이지를 만들어준다. 
즉, 톰캣은 웹 서버에서 넘어온 동적인 페이지를 읽어들여 프로그램을 실행하고 그 결과를 다시 html로 재구성하여 아파치에게 되돌려 준다. 자바 런타임 환경이 필요하다

## 함수형 프로그래밍
함수형프로그래밍은 네이버페이, 인프랩 등에 쓰이는 유명한 프로그래밍 패러다임 중 하나로 작은 순수함수들의 집합으로 최소의 부수효과를 누리는 패러다임입니다.

좀 더 자세히 말하자면 함수들을 작게 쪼개서 블록을 쌓듯이 로직을 구현하고 다형성을 높이고 고차함수를 활용하여 재사용성을 높이고 참조투명성을 통해 부수효과가 줄어들어 유지보수성을 증대시키는 함수형 프로그래밍에 대해서 알아보겠습니다. 함수형프로그래밍을 하면 단순하고 간결한 흐름 중심의 모델이 되고 서술부와 평가부가 분리되어 지연평가가 가능합니다.   
 
 - ▶ 용어 : 다형성 : 어떠한 인자든 가능한 것 
 - ▶ 용어 : 참조투명성: 함수의 출력은 오로지 그 함수에 입력된 값에만 의존성을 가진다는 의미
 - ▶ 용어 : 추상화를 높이다. : 다형성을 증가시켜 특정 데이터형에서 분리한다는 것  

### 파괴적인 함수를 쓰지 않습니다.  – slice VS splice
가능한한 원본 객체나 인자는 그대로 있어야 합니다. 
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
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]
console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]
console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```

### 커링
어떤 함수의 예상되는 여러개의 인자 보다 적은 수의 인자를 받아서 그 함수는 그 인자를 받은 채로 함수를 리턴합니다. 인자가 완전히 채워지지 않은 함수는 실행되지 않고 넘겨지게 되다가 모든 인자가 채워지면 그 때서야 실행되는 기법입니다. 
다시 말하자면 함수 하나가 n개의 인자를 받는 과정을 n개의 함수로 쪼개서 한 개의 함수는 한 개의 인자를 받게 됩니다. 함수들이 각각의 인자를 받고 그 인자가 다 채워지면 그때서야 함수들의 합성이 실행하는 것을 말합니다. 이렇게 지연되는 실행이 가능한 이유는 내부함수가 외부함수의 컨텍스트가 소멸이 되도 외부함수의 실행환경을 참조할 수 있는 클로저 때문이며 내부함수는 파라미터가 완성될 때까지 실행시점을 미룰 수 있습니다. 
또한 커링을 이용해 나중에 설명할 무인수프로그래밍도 가능합니다. 
```js
const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);
```
### 무인수
```js
const prop = key => obj => obj[key]    
const propEqual = value => key => obj => prop(key)(obj) === value 
console.log(t)  
const t2 = go(
	친구들, 
	L.filter(propEqual('개발자')('do')), 
	L.takeAll
)
console.log(t2)
``` 
### promise
```js
const g = JSON.parse;
const f = k => k.temp; 
const fg = x => new Promise((resolve, reject)=> resolve(x)).then(g).then(f)
const log = x => console.log(x)

fg('{"temp":36.5}').catch(_ => 'JSON PARSE is not working').then(log)
```
Promise는 3가지의 상태를 가집니다.  
1. 함수 처리가 아직 완료되지 않은 Pending상태, promise를 정의했을 때 발동합니다. 
2. 함수 처리가 완료되어 "프로미스 결과 값"을 반환해주는 Fulfilled 상태, resolve 메소드를 통해 발동됩니다. 
3. 함수 처리 실패가 발생되었을 때의 Rejected 상태가 있습니다. reject 메소드또는 애러를 통해 발동됩니다.  

퓨처모나드, 비동기를 처리하거나 null값이 발생할 수 있는 로직에 대해서 어떠한 값의 결과가 불확실하게 2가지형태 이상으로 나타날 수 있습니다. 이럴 때 컨테이너로 래핑하여 하나의 값으로 안전하게 연산을 할 수 있습니다. 또한 함수형프로그래밍의 특징을 지키기 위해서도 존재합니다. 함수형프로그래밍에서는 반드시 참조투명성, 입력과 출력이 동일하게 1 : 1 매칭이 되어야 하기 때문에 불완전하게 2가지형태이상으로 나타나게 되면 이 특성이 성립하지 않게 되죠 이를 위해 안전하게 보호하기 위해 래핑하는 것입니다.   

### 모나드
모나드는 Context를 값 레벨로 끌어들인 다음, 이 Context를 가진 값들을 기존의 값들과 별 차이 없이 다루기 위한 방법이자 안전한 함수 합성에 주로 쓰입니다. 

다음 세가지 조건을 만족해야 한다.
 
1. 타입생성자 - 타입을 인자로 받아 모나드화 된 타입을 반환할 수 있어야 한다.  예를 들어 number를 받아 Monad<number> 타입을 반환해야 합니다.
2. unit 함수 - 기초타입의 값을 감싸 모나드에 넣어야 할 수 있어야 함.  
3. bind 함수 - 모나드로 동작을 실행할 수 있는 함수이자 감싸진 타입을 꺼낼 수 있는 방법이 있어야 합니다. 설령 모나드가 중복되어 감싸지더라도 감싸진 타입을 꺼낼 수 있어야 합니다. flatmap이라고도 불리거나 여러가지 이름으로 불리지만 하는 역할이 같다면 그건 bind함수라고 볼 수 있습니다.  참고로 Promise의 then으로 받는 인자는 resolved된 인자이며 이는 flatten되었다라고 할 수 있기 때문에 then은 bind함수라고 볼 수 있습니다. 
```js
const identity_monad = () =>{
    return unit = (value) => {
        const monad = Object.create(null);
        monad.bind = f => f(value)
        return monad; 
    }
} 
const a = identity_monad()(4).bind(e => e * 2)
console.log(a)
```

### 펑터
Functor란? 박싱된 값에서 값을 뺀 후, 값에 특정 함수를 적용해 타입 과 값을 변경하고, 다시 값을 박싱하는 것을 말합니다. 변경된 값은 같은 타입일 수도 있고 다른타입일 수도 있습니다.
 - 값 형식을 참조 형식으로 변환하는 것을 박싱(Boxing),
 - 참조 형식을 값 형식으로 변환하는 것을 언박싱(UnBoxing)이라고 합니다

# CS, 컴퓨터 공학
## 포인터
 - 주소값 : 데이터의 주소값이란 해당 데이터가 저장된 메모리의 시작 주소
 - 포인터 : 메모리의 주소값을 저장하는 변수
 - 주소 연산자(&) : 주소 연산자는 변수의 이름 앞에 사용하여, 해당 변수의 주소값을 반환합니다.'&'기호는 앰퍼샌드(ampersand)라고 읽으며, 번지 연산자라고도 불립니다.

### 포인터와 배열
포인터와 배열은 매우 긴밀한 관계를 맺고 있으며, 어떤 부분에서는 서로를 대체할 수도 있습니다. 배열의 이름은 그 값을 변경할 수 없는 상수라는 점을 제외하면 포인터와 같습니다. 따라서 배열의 이름은 포인터 상수(constant pointer)입니다.

## P - NP
 - P 문제(Polynomial problem) : 결정론적 튜링머신으로 다항시간()O(n, n^2) 내에 풀 수 있는 문제
 - NP 문제(Non-deterministic Polynomial problem) : 비 결정론적 튜링머신으로 다항시간 내에 풀 수 있는 문제, 운에 기대면 현실적인 비용으로 풀 수 있다는 것이 무슨 뜻인가? 미로찾기 문제를 생각하자. 입구에서 출구로 이어지는 길을 찾아야 한다. 갈림길마다 선택을 한다. 잘못 선택하면 시간을 낭비한다. 답이 아닌 곳으로 빠져 한참을 헤매게 된다. 하지만 선택의 갈림길마다 운 좋게 늘 옳은 답을 선택했다면? 시간 낭비 없이 출구를 찾게 된다. 그런 운 좋은 선택을 현실적인 횟수만큼 해서 탈출로를 찾을 수 잇다면 ‘운에 기대면 현실적인 비용으로 해결할 수 있는’ 문제인 거다.
 - 튜링머신 : 정해진 명령표에 따라 원하는 일을 수행하는 가상의 기계 
 - 비결정론적 튜링 머신 : 튜링 머신에서 특정 상태에서 움직일 수 있는 상태의 개수가 하나로 정해져 있지 않은 경우를 말한다.
 
## CSMA/CD 
LAN의 통신 프로토콜의 종류중 하나이며, 이더넷 환경에서 충돌이 일어날경우 좀 기다렸다가 다시 데이타를 보내는 방식 15번충돌하면 통신을 끊습니다.  

## DB와 File의 차이
네 DB는 File과 다르게 질의 등 SQL과 같은 일반화된 쿼리를 사용할 수 있으며 애플리케이션에 영향을 주지 않습니다.
파일의 경우 관리하기도 DB보다 훨씬 어려우며 보안기능, 회복기능이 없으며 파일의 구조가 애플리케이션에 반영되어있으므로 파일의 구조가 바뀌면 영향을 받습니다. 

### Data Independence
일반적으로 자료의 독립성이란 어느 단계의 스키마를 바꾸었을 때 그 위 단계의 스키마에 영향을 주지 않고 결국 응용 프로그램에 영향을 주지 않는 것을 가리킵니다. 
 - 물리적 : 자료가 실제 저장되는 수준
 - 논리적 : DBA(데이타 베이스관리자)가 처리하는 수준
 - 뷰수준 : 일반 사용자가 쓰는 수준 
  
## 하노이의 탑
```c++
#include <cstdio> 
using namespace std;  
int n;
void solve(int n, int from, int to){
    if(n == 0) return;
    solve(n - 1, from, 6 - from - to);
    printf("%d %d\n", from, to);
    solve(n - 1, 6 - from - to, to);
    return;   
}
int main() {
    scanf("%d", &n);
    printf("%d\n", (1 << n)- 1);
    solve(n, 1, 3); 
    return 0;
}
```
## MAC address와 IP address
만약 MAC IP어드래스만 두면, 모든 컴퓨터는 항상 고유의 주소를 
가져야 할것이고 한컴퓨터는 그것이 패기될때까지 다른주소를 
가질수 없습니다. 이 때문에 네트워크를 구성하기 힘들죠. 따라서 논리적 계층을 하나 더 둠으로써 융통성을 두었다고 생각합니다. 
 - MAC 주소: 한 컴퓨터(링크계층)에 할당된 고유 식별 주소, 물리 주소나 하드웨어 주소(Hardware address) 라고도 불립니다.
 - IP 주소: 호스트나 라우터 장비의 인터페이스에 할당된 32 bit 의 주소입니다. 목적지 네트워크 식별을 용이하게 함으로써 IP 라우팅에 도움을 줍니다. 128비트를 사용하는 것을  IPv6라 합니다. 
 
## LAN, MAN, WAN
 - LAN : 작은 범위의 컴퓨너 네트워크, 이더넷으로 구성, 물리계층, 데이터 링크계층과 관련, 비교적 가까운 거리에 위치한 장비들이 특정 전송매체로 연결된 모임 
 - WAN : 여러개의 LAN이 모여 이루는 넓은 범위의 네트워크 두 개 이상의 LAN이 서로 통신하기위해서는 라우터라는 장치가 필요합니다. 우리나라에선 KT, SK 이런데서 관리

### 이더넷
이더넷은 네트워크에 연결된 각 기기들이 48비트 길이의 고유의 MAC 주소를 가지고 이 주소를 이용해 상호간에 데이터를 주고 받을 수 있도록 만들어졌다.
 
## 컴파일러
![구문분석](http://www.kwangsiklee.com/wp-content/uploads/direct/compiler/border/compiler6_0800.png)
구문분석 방법 
 - 항향식 : 좌단 유도, LL 문법 
 - 상향식 : LR 구문 분석 

## 캐시
CPU가 cache에서 데이타를 읽어오되 최대한 메모리에서 읽는 것과 동일한 효과를 낼 수 있느냐라는 것이고 이걸 cache의 transparency라고 합니다. 
서로 다른 두 주소가 같은 인덱스를 가지면 충돌이 발생하고, 교체 정책에 따라 블록을 교체한다. 하지만 충돌이 발생할 때마다 캐시 내용을 바꾸면 더 많은 미스가 발생하게 되고, 한 자리의 내용을 끝없이 바꾸는 핑퐁 문제(Ping-pong problem)가 일어날 수 있다.

 - directed mapping : 캐시와 메모리 간의 매핑이 되어있는 것. 메모리가 1 ~ 100까지 있고 캐시가 1 ~ 10까지 있다면 1 : 1 ~ 10 이런식으로 매핑하는 것. 처리가 빠르지만 충돌발생이 잦다. 
 - associative mapping : 순서를 일치시키지 않고 메모리의 값을 캐시에 어디든 저장 가능, 필요한 캐시들 위주로 저장 가능, 충돌이 적지만 모든 블록을 탐색해야 해서 속도가 느리다.
 - set associate mapping : 위의 2개 합쳐 놓은 것. 순서 일치 시키지만 그룹 두어서 저장, 블록화 되어 있어서 검색은 좀 더 효율적이 됨. 메모리가 1 ~ 100 있고 캐시가 1 ~ 10까지 있다면 캐시 1 ~ 5에는 1 ~ 50의 데이타를 무작위로 저장 시키는 것. 

L1캐시 : CPU칩안에 저장되어 데이터 사용/참조에 가장 먼저 사용, L2캐시 : L1에서 찾지 못하면 여기로 넘어감. 

## VM
컴퓨터 안에 또 다른 컴퓨터를 동작 시키는 것이다. 컴퓨터 시스템을 에뮬레이션 한다고 말한다. 
![가상머신](https://postfiles.pstatic.net/MjAxOTAzMTdfMjQw/MDAxNTUyODI2MjQzNjI1.u6ivNeSLEU5nvy3_OvD0li6n-A85iuzB1p9VepCLoG8g.Uw7woVB7TK29JWbLriAaP3UApKW7EAxUI6M7zkYtDFMg.PNG.jhc9639/1.PNG?type=w966) 

## 멀티 코어 프로그래밍
예를 들어 A라는 프로세스를 처리중에 있을때 입출력 이벤트가 발생했는데 프로세서가 입출력 이벤트에 대한 응답을 위해 무작정 대기하고 있다면 프로세서의 자원을 낭비하는 결과를 초래합니다. 프로세서, CPU는 한번에 하나의 프로세스만 처리하도록 되어있기 때문에 A 프로세스에 대한 입출력 이벤트에 대한 응답을 대기하는 동안 아무일도 하지 않기 때문이죠.
멀티 프로그래밍은 이렇게 낭비되는 시간동안 프로세서가 다른 프로세스를 수행할 수 있도록 하는 것 입니다. 

이 때 공유자원 문제가 발생합니다. 
### 공유자원
공유 자원이란 시스템 안에서 각 프로세스, 스레드끼리 함께 접근을 할 수 있는, 모니터, 프린터, 메모리, 파일, 네트워크등의 자원을 말한다. 공유자원은 프로세스에서 접근하여 수정할 수 있기 때문에 A라는 프로세스에서 B라는 파일을 수정하고 있을 때, C라는 프로세스가 B파일을 읽는다면 C프로세스가 읽는 B파일 데이터에 오류가 생길 수 있으며, A프로세스와 C프로세스가 B파일을 동시에 수정하려 할 때는 충돌이 일어날 수 있다.

이런 공유자원에 접근하는 등, 동시에 여러 프로세스나 스레드가 접근하면 안 되는 코드 구간을 임계영역(Critical Section)이라 부른다. 이런 임계영역에 대한 접근을 제한하기 위한 동기화기법과 통신기법이 있다.  

### 멀티테스킹
일반적으로 CPU는 한번에 하나의 프로세스만 관리할 수 있습니다.
그런데 우리는 한번에 여러개의 프로그램을 실행하고 있죠? 즉, 우리는 한번에 여러개의 프로세스를 사용하고 있습니다.
CPU는 하나의 프로세스만 관리가 가능한데, 이점을 극복하고 우리가 사용하듯이 여러개의 프로세스가 동시에 실행되는 것 처럼 보이도록 하는 것이 멀티태스킹입니다.  

### 멀티 프로세싱 
멀티 프로세싱은 한마디로 말해서 '두개 이상, 다수의 프로세서가 협력적으로 작업을 동시에 처리하는 것' 입니다.
위에서 설명한 '프로세스'가 아닌 '프로세서'를 말하는 것에 혼동되면 안됩니다.
프로세서는 대략적으로 CPU라고 생각하시면 됩니다.

아래 사진을 보면 더 이해하기 쉬울 것 입니다.
![멀티프로세싱](https://t1.daumcdn.net/cfile/tistory/99602E3359F1B08B23)

각각의 프로세서가 하나의 작업만을 처리하는 것이 아니라 다수의 작업을 처리하며,
하나의 작업은 하나의 프로세서에 의해 처리되는 것이 아니라 다수의 프로세서에 의해 처리됩니다.

멀티 프로세싱을 하는 장점으로는 여러가지가 있습니다.

여러개의 프로세스가 처리되어야 할때 동일한 데이터를 사용한다면 이러한 데이터를 하나의 디스크에 두고 모든 프로세서가 이를 공유하도록 한다면 비용적으로 저렴합니다.

또한, 만약 하나의 프로세서가 하나의 작업만을 처리한다면 특정 프로세서가 고장이 났을 때 해당 작업은 정지됩니다. 하지만 멀티 프로세싱을 사용한다면 작업은 정지되지 않습니다. 단지 속도가 느려지는 정도의 손해만 발생하겠죠. 

### 멀티 쓰레딩
말 그대로 프로세스내에서 하나의 스레드가 아닌 여러개의 스레드를 형성하여 명령어들을 처리하는걸 의미한다.
프로세스에 대한 설명을 드리면서 멀티태스킹에 대해 간략히 설명을 드렸습니다. 멀티태스킹에서는 다수의 프로세스가 만들어져서 순차적으로 실행됩니다.

헌데 만약 A라는 프로세스와 B라는 프로세스가 대규모의 동일한 데이터를 필요로 한다면 어떨까요?

이러한 프로세스들은 단순히 동일한 데이터를 공유하기 위해서 운영체제에서의 복잡한 메커니즘을 사용하게 됩니다.

여기서 프로그래머들은 생각합니다. 프로세스가 생성되는 초기부터 데이터를 공유하도록 해준다면 어떨까? 이러한 발상이 스레드의 시작이 됩니다. 그리고 멀티스레드를 통해 메모리를 효율적으로 사용할 수 있게 됩니다. 
 
멀티 스레딩은 하나의 프로그램 안에서 병렬 처리의 이점을 보는 것이며 멀티 프로세싱은 여러 개의 프로그램들을 병렬로 처리할 수 있는 것 입니다.멀리 프로세싱 시스템이 여러 개의 완전한 처리 장치들을 포함하는 반면, 멀티 스레딩은 스레드 수준뿐 아니라 명령어 수준의 병렬 처리에까지 신경을 쓰면서 하나의 코어에 대한 이용성을 증가하는 것에 초점을 두고 있습니다. 멀티 스레딩의 장점으로는 자원을 공유하여 메모리에 대한 효율성을 가져올 수 있는 것과 이로 인해 경제성 또한 증가하는 것 등이 있습니다.
 
하나의 프로세스는 동작하기 위해 이러한 두가지의 공간을 모두 요구하게 되는데.. 멀티 프로세스란 이러한 개별적인 프로세스들이 서로 간에 독립적인 코드공간과 데이터 공간을 유지하면서 함께 작동할 수 있는 상태를 말한다.

반면에 쓰레드란 좀더 작은 규모의 프로세스를 말한다. 다수 개의 쓰레드는 하나의 프로세스 하부에서 나타나는데 이들은 독립적인 코드
공간을 가지고 개별적으로 작동할 수 있지만, 독립적인 데이터 공간을 가지지 않으므로 하나의 프로세스 아래에 있는 모든 쓰레드들은 해당 프로세스의 데이터 공간을 각각 공유하게 된다.

멀티쓰레드란 이런 방식으로 하나의 프로세스가 다수 개의 작업을 각각 스레드를 이용하여 동시에 작동 시킬 수 있는 것을 말하는데 보통 쓰레드의 생성과 파괴는 코드공간의 관리 만을 필요로 하기 때문에 프로세스의 생성과 파괴보다 훨씬 적은 자원을 소모한다. 이 때문에 멀티 쓰레드는 동일 작업을 위한 멀티 프로세스보다 훨씬 효율적이라고 이야기한다.


■ 멀티쓰레드의 효율성과 안정성 문제

다수개의 쓰레드가 동일한 데이터 공간을 공유하면서 이들을 수정한다는 점에 필연적으로 생기는 문제이다.
멀티 프로세스의 방식의 프로그램에서 하나의 프로세스가 자신의 데이터 공간을 망가뜨린다면 그것은 해당 프로세스의 중단을 낳게 될 것이다. 하지만 멀티 쓰레드 방식의 프로그램에서는 하나의 쓰레드가 자신이 사용하던 데이터 공간을 망가뜨린다면 그 결과는 하나의 데이터 공간을 공유하는 모든 쓰레드를 작동불능 상태로 만들어 버릴 것 이다. 이러한 문제에 대비하기 위해 Critical Section 기법이 존재한다.

### 뮤텍스
 - 동기대상 하나
 - Key 에 해당하는 어떤 오브젝트가 있으며 이 오브젝트를 소유한 (쓰레드,프로세스) 만이 공유자원에 접근할 수 있다. 

### 세마포어
 - 동기화대상 여러개일 때
 - 현재 공유자원에 접근할 수 있는 쓰레드, 프로세스의 수를 나타내는 값을 두어 상호배제를 달성하는 기법   
  
## 객체지향 언어의 특징
 - 추상화, struct
 - 캡슐화, 데이터 구조와 데이터를 다루는 방법을 결합시킴
 - 상속성, 상위개념을 하위개념이 물려받는 것
 - 다형성, 재 어떤 클래스 객체가 참조되는지와 무관하게 프로그래밍 하는 것.

```java
// 부모 클래스
public abstract class Pet {
  public abstract void talk();
}
// 자식 클래스
public class Cat extends Pet {
  public void talk(){ System.out.println("야옹"); }
}
public class Dog extends Pet {
  public void talk(){ System.out.println("멍멍"); }
}
public class Parrot extends Pet {
  public void talk(){ System.out.println("안녕"); }
}
```
```java
public class Main {
  public static void main(String[] args) {
    Pet[] pets = { new Cat(), new Dog(), new Parrot() };
    // 애완동물 세 마리의 울음소리 호출
    for (int i = 0; i < 3; i++){
      // 실제 참조하는 객체에 따라 talk 메서드가 실행된다.
      pets.talk();
    }
  }
}
``` 
  
## TCP/IP 와 OSI
TCP/IP : 인터넷프로토콜 슈트 중의 가장 많이 쓰이는 프로토콜 

application / transport(TCP, 패킷교환방식으로 효율적인 이동을 한 후 순서보장 + 연결지향, 3HandShake / UDP 비연결지향형 순서재조합기능x) / internet(상대의 주소를 지정, 데이터전달) / network access(이더넷, 와이파이) / physical(link) - 전선, 두 매체 간의 실제 접속방법 등의 대한 규칙

OSI는 여기서 application이 + presentation, session으로 나눠짐. 
```
fin_wait1 > (fin) close_wait
          < (ack)
fin_wait2         
                  last_ack
          < (fin)
time_wait
          > (ack) 
                  closed
closed
``` 

## 메세지큐(MQ)
메세지 큐의 한가지 의미는 IPC(Inter-Process Communication) 도구 중 하나로 시스템 프로그래밍에서 사용되며 분산 메시징 시스템에도 사용됨. 

실질적인 예로는 소셜서버에 글을 올렸을때, 내가 글을 올린것을 즉시 확인해야하는 나 자신을 위한 프로세스는 가장 우선되야하며, 내가 올린글이 다른사람에게 전달(feed) 되기 위한 시간은 즉시가 아니어도 된다. 그때 처음 버튼을 눌렀던 행위를 메세지큐에 던저넣고 바로 리턴한후에 나 자신을 위한 프로세스가 즉각적으로 응답되게 하는것이다. 
 - 다수의 메세지를 batch 형태로 한번에 publish 하는게 가능하여 HTTP를 사용하는 서비스의 경우 RTT를 줄일 수 있습니다.  
 - AMQP(Advanced Message Queueing Protocol) : 메시지 지향 미들웨어를 위한 프로토콜 
  
## 오버라이딩, 오버로딩
 - 오버라이딩 : 상위클래스의 메소드를 하위클래스에서 재정의하는 것. 
 - 오버로딩 : 매개변수유형과 개수를 다르게 해서 같은 이름의 함수를 여러개 정의하는 것.

## DAO, DTO, VO 
 - DAO : 데이터베이스 엑세스 등 비즈니스 로직이 담김 
 - DTO : 로직을 갖고 있지 않은 순수한 데이터 객체이며 속성과 getter, setter 메소드만을 가진 클래스(계층간 데이터 교환을 위한 객체, Java Beans를 뜻함)
 - VO : DTO와 동일하나 read only라는 속성을 같는다. 

## 서블릿 필터와 인터셉터, AOP
스프링에서 사용되는 Filter, Interceptor, AOP 세 가지 기능은 모두 무슨 행동을 하기전에 먼저 실행하거나, 실행한 후에 추가적인 행동을 할 때 사용되는 기능들입니다. 

![흠냐](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile22.uf.tistory.com%2Fimage%2F9983FB455BB4E5D30C7E10)

 - 서블릿필터 : 서블릿 밖에서, XSS방어
 - 인터셉터 : AOP 밖에서, 로그인 체크
 - AOP : 컨트롤러 밖에서, 로깅, 트랜젝션

## Spring
IoC 컨테이너이자 MVC 프레임워크 

## 컨테이너, IOC, DI
 - 컨테이너 : 인스턴스의 생명주기를 관리, 생성된 인스턴스에게 추가적인 기능을 제공, Servlet을 실행해주는 WAS는 Servlet 컨테이너를 가지고 있다고 말합니다 
 - IOC : 컨테이너가 코드 대신 오브젝트의 제어권을 갖고 있어 IoC(제어의 역전)이라 합니다.예를 들어, 서블릿 클래스는 개발자가 만들지만, 그 서블릿의 메소드를 알맞게 호출하는 것은 WAS입니다.이렇게 개발자가 만든 어떤 클래스나 메소드를 다른 프로그램이 대신 실행해주는 것을 제어의 역전이라고 합니다.
 - DI : 의존성 주입이란 뜻을 가지고 있으며, 클래스 사이의 의존 관계를 빈(Bean) 설정 정보를 바탕으로 컨테이너가 자동으로 연결해주는 것을 말합니다.

```java
@Component
class 엔진 {

}

@Component
class 자동차 {
     @Autowired
     엔진 v5;
}
``` 

### 스프링 디스패처 서블릿
Servlet Container에서 HTTP프로토콜을 통해 들어오는 모든 요청을 프레젠테이션 계층의 제일앞에 둬서 중앙집중식으로 처리해주는 프론트 컨트롤러(Front Controller) 

### 어떤 파일을 다운로드 받고 있을 때 진행 상황을 표시하려면 
`xhr.onprogress`
### Stack 2개를 이용해서 Queue 처럼 거동하는 클래스
```js
class Queue{
    constructor(){
        this.s1 = []
        this.s2 = []
    }
    front(){
        if(this.s1.length === 0){
            console.log("큐가 비었습니다. ")
            return
        }else return this.s1[this.s1.length - 1];
    }
    enqueue(value){
        while(this.s1.length){
            this.s2.push(this.s1[this.s1.length - 1]); 
            this.s1.pop(); //앞에서 빼는 것은 shift
        }
        this.s1.push(value)
        while(this.s2.length){
            this.s1.push(this.s2[this.s2.length - 1])
            this.s2.pop()
        }
    }
    dequeue(){
        if(this.s1.length === 0){
            console.log("큐가 비었습니다. ")
            return
        }
        let front_value = this.s1[this.s1.length - 1];
        this.s1.pop();  
        return front_value
    }
}
```      
## 스레드 세이프한 Queue   
Queue가 꽉찼을때의 삽입 시도 / Queue가 비어있을때의 추출 시도를 막는 BlockingQueue를 의미합니다. PriorityQueue와 같은 정렬방식을 지니는 용량제한이 없는 Queue. 하지만 Element 추출에 대해 Block기능을 제공하는 PriorityBlockingQueue 등이 있습니다.   
  
## 그리디
<p align="center"> 
  <img src="https://raw.githubusercontent.com/wnghdcjfe/wnghdcjfe.github.io/master/docs/그리디.png" width="700">
</p>  
그리디 알고리즘은 local optimum을 찾으면서 global optimum에 도달하는 방식이기 때문에 global optimum에 도달하지 못하고 local optimum에 빠져 버릴 수가 있습니다. 

## 오토마타 
계산 능력이 있는 추상 기계와 그 기계를 이용해서 풀 수 있는 문제들을 연구하는 컴퓨터 과학의 분야

## Cache
속도 차이를 보상하기 위해서 사용합니다. 흔히 CPU와 RAM 사이에 존재하여, 두 장치 간의 데이터를 임시적으로 저장하여 빠르게 처리할 수 있도록 도와줍니다. 빠르게 접근할 수 있는 곳에 보관하고 관리함으로써 이 내용을 다시 필요로 할 때 보다 빠르게 참조하도록 하는 제어장치를 뜻한다. 메모리에는 Locality 라는 특징이 있기 때문에 Cache는 큰 효과가 있습니다. Locality로는 시간적 지역성(최근 사용된 재 이용률 높음), 공간적 지역성(최근 사용된 데이터의 인접 데이터 사용률이 높음)이 있으며 이를 통해 cache hit를 높여서 효과를 높일 수 있습니다. 캐시메모리 mapping 기법으로는 블록을 캐시위 정해진 위치에 매핑하는 방식등이 있으며 LRU(사용하지 않은 캐시중 오래된 시간을 가진 것 교체), FIFO(먼저 들어온 블록이 교체) 등이 있습니다.  
 
## Memory Hierarchy
Memory Hierarchy는 CPU부터 보조기억장치에 이르는 각각의 메모리 장치 간의 관계를 계층적으로 설명한 것입니다. CPU에 가까울 수록 비용이 비싸고, 저장 장치가 작지만 빠르다는 특징이 있습니다. 아까 설명했던 Cache의 개념이 전체적으로 통용됩니다. 예를 들어 RAM 또한 CPU와 보조기억장치의 Cache라고 볼 수 있습니다.

## 파이프라이닝
명령어를 처리할 때 명령어를 하나씩 순차적으로 처리하는 것보다, 명령어를 여러 단계로 나누어서 병렬적으로 처리하면 더 빠르게 데이터를 처리할 수 있기 때문에 파이프라이닝 기법을 사용합니다. 명령어는 Fetch, Decode, Execute, Memory, Write Back 등으로 나눌 수 있습니다.  

파이프라이닝 해저드는 각 상황에서의 한계점 때문에, 파이프라이닝 속도를 저해하는 요소입니다. Hazard의 종류는 세 가지입니다. 
 - 구조적 해저드. 구성요소, 장롱에 개어진 세탁물을 넣어줄 친구가 없다던지 등
 - 데이터 해저드, 명령어들이 종속성을 가질 때 
 - 제어 해저드, 다른 명령어들이 한 명령어 결과값에 기반을 둔 결정을 내려야 할 때  
 
해결방법으로 지연, 예측이 있습니다.  
 
## 컴파일러
프로그래머가 이해하는 언어를 프로세서가 쓰는 기계어로 멋지게 번역해준다. 컴파일러의 실행단계는 다음과 같다. 
1. 구문분석 : 소스코드를 읽어 연산자, 괄호 등 문법요소 단위로 자른 후, 이 문법 요소들을 해석하여 "추상구문 트리"를 생성한다. 이 때 문법에 맞지 맞지 않는다면  사용자에게 알려준다. 
2. 최적화 : "추상 구문 트리"를 분석하여 최적화를 수행한다. 상수표현식을 미리 계산, 루프 풀기 등의 최적화가 이루어 진다. 
3. 코드생성 : 최적화된 구문트리로부터 목적코드를 생성한다. 목표언어가 기계어일 경우, 레지스터 할당, 연산 순서 바꾸기 등 하드웨어에 맞는 최적화가 이루어진다. 
4. 링킹 : 목적 코드가 기계어일 경우, 여러 라이브러리 목적 코드로 묶어 하나의 실행 파일을 생성하게 된다. 
이 과정은 "링커"에 의해 실행된다. 

> 추상구문트리 : 프로그래밍 언어로 작성된 소스코드의 추상구문 구조의 트리, 이 트리의 각 노드는 소스코드에서 발생되는 구조체를 나타낸다. 

프로그램이 컴파일이 되고 실행까지 일련의 과정들을 거치게 된다. 

1. 전처리  : 헤더파일병합(#include), 매크로 치환(#define)

2. 컴파일러 : 최적화작업, 오브젝트코드(어셈블리어)를 만든다.

3. 링커 : 이 오브젝트 코드들은 API, 라이브러리와 링크되어 실행가능하게 된다. 

4. 로더 : 생성된 프로그램을 메모리에 붙인다. 

5. CPU에서 실행 : 메모리에 있는 코드를 읽어와서 실행시킨다. 

## 레지스터
컴퓨터가 계산을 하기 위해 필수적으로 필요한, 작은 용량이지만 매우 빠른 임시 기억 장치를 가리킨다.
메모리로 연산의 결과를 보내고 영구적으로 저장할 데이터를 하드디스크에 저장해야 하는 등의 명령을 처리하기 위해서는 이들의 주소와 명령의 종류를 저장할 수 있는 기억공간이 필요하며, 이 공간은 "메모리"보다 빨라야 한다. 이 역할을 하는 것이 바로 레지스터이다.  이것은 CPU와 직접연결되어있으므로 연산속도가 메모리보다 실제 수십 배에서 수백 배까지 빠르다. 그리고 CPU는 자체적으로 데이터를 저장할 방법이 없기 때문에 메모리로 직접 데이터를 전송할 수 없다. 때문에 연산을 위해서 반드시 레지스터를 거쳐야 하며, 이를 위해 레지스터는 메모리의 특정주소를 가리키거나 값을 읽어올 수 있다.

![레지스터](https://postfiles.pstatic.net/MjAxNzEwMjNfMTA0/MDAxNTA4NzA5MjA5ODIz.RW5Uwe9_y5gyMb4GvcZp4sAkl021oJnfJGALirQYHfog.bhasSm3Y3dGZb0LiyHC9DIsr2nPMKY3P4iSFEoqhxaAg.PNG.jhc9639/CPU%EB%82%B4%EB%B6%80%EA%B5%AC%EC%A1%B0.png?type=w966) 

## 시스크(CISC)와 리스크(RISC)
프로세서는 시스크(Complex Instruction Set Computer)방식과 RISC(Reduced Instruction Set Computer)방식으로 구분할 수 있다. 
### 시스크
기본 명령어가 있고 필요에 따라 뒤에 명령어의 길이를 늘리는 방식으로 명령어를 확장한다. 따라서 하위 호환성을 갖게 된다. 
### 리스크
우리가 실제 사용하는 명령어 패턴으로 간단하고 명령어 크기를 고정, 그 개수를 대폭 줄인 것. 필요한 명령어 세트만을 제한적으로 지원하고 명령어의 길이가 일정하게 구성이 된다. 따라서 하위 프로세서와 호환이 되지 않으며 전용 운용 시스템에 전용 소프트웨어를 필요로 한다. 이 경우에 명령어의 길이가 일정하고 명령어의 실행위치가 미리 확연하게 정해져 있기 때문에 프로그램을 기계어로 변환하는 과정에서 프로그램이 최적화되게 된다. 
단점으로는 명령어 폭이 고정이므로 간단히 처리할 수 있는 일을 여러번 나눠서 해야 함.  
eg) 스마트폰의 많이 쓰이는 ARM, IBM의 PowerPC, MP3  
x86같은 시스크 프로세서에서 사용된 복잡한 멀티사이클 명령어 대신 극히 간단한 명령어만 사용하여 각 클럭 사이클당 하나의 명령을 실행함으로써 프로세서를 엄청나게 빠른 속도로 작동시킬 수 있다는 원리를 가짐.


## RFID(Radio Frequency Identification)
소형 전자칩과 안테나로 구성된 전자 태그를 사물에 부착하여 리더기가 무선주파수를 사용하여 진짜 태그의 정보를 읽어 사물을 인식하는 기술

## 폰노이만 구조
프로그램과 데이터를 하나의 메모리에 저장하여 데이터는 메모리에서 읽어나 메모리에 쓰기도 하는 반면, 명령어는 메모리에서 읽기만 하는 구조. 
명령어와 데이터를 위한 메모리 인터페이스가 하나. 
일반적으로 100에서 250개의 많은 수의 명령어가 있다. 

## 하버드 구조
폰노이만 아키텍쳐의 변형으로 명령어와 데이터가 서로 다른 메모리 영역을 차지하여 메모리 영역마다 주소버스, 데이터버스, 제어 버스가 따로 존재한다. 명령어와 데이터를 동시에 읽을 수 있으며 명령어 길이가 표준데이터 크기로 제한받지 않는다. 명령 구조상으로 RISC구조이다. 
프로그램과 데이터를 물리적으로 구분하여 다른 메모리에 저장하는 구조.
명령어를 읽을 때 데이터를 읽거나 쓸 수 있어 성능이 우수하다.  

# 배열
배열은 인덱스에 해당하는 원소를 빠르게 접근해야 할 때, 그리고 마치 창고처럼 데이터를 쌓아두고 싶을 때 유용하게 활용할 수 있습니다. 만약 데이터의 삽입/삭제가 빈번한 상황이면 배열이 비효율적입니다. 사실 거의 대부분의 문제에서, 일단 입력값을 저장해놓고 시작하는 일이 많기 때문에 배열이 쓰입니다. 

# 연결리스트
연결 리스트는 임의의 위치에 원소를 추가하는 것, 그리고 제거하는 것 모두 O(1)입니다. 여기서 주의해야 하는게, 해당 임의의 위치에 일단 도달을 하고 난 후에 O(1)이라는 의미입니다. 만약 시작 위치만 주어진 후에 kk번째 위치에 원소를 추가해라 라는 명령이 들어오면 배열과 다르게 kk번째 위치를 O(1)에 찾아갈 수가 없기 때문에 이것은 O(1)에 수행할 수 없고 평균적으로 O(N)이 걸립니다.
 
 
  