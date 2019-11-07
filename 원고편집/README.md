7. 모나드
이제 Promise를 설명했으니 원론적으로 모나드가 뭔지 자세하게 얘기를 하고자 합니다.  
모나드는 기본적으로 함수합성을 안전하게 하기 위해서 존재합니다. 예를 들어 f라는 함수가 있고 g라는 함수가 있고 f(g())  이런식으로 합성을 한다고 했을 때 예상치 못한 값을 집어넣게 되면 오류가 발생하거나 예상치 못한 결과가 나올 수 있습니다. 이를 방지하고 안전하게 컨테이너 박스안에서 연산을 실행할 수 있는 것을 모나드라고 합니다. 모나드는  아이덴티티 모나드, 퓨처 모나드 등이 있으며 이 중 여기서 퓨처모나드인 Promise를 중점으로 알아봅니다. (컨티뉴어스모나드라고도 부릅니다.)

퓨처모나드인 Promise 모나드는 래핑하기 위해 쓰입니다. 비동기를 처리하거나 null값이 발생할 수 있는 로직에 대해서 어떠한 값의 결과가 불확실하게 2가지형태 이상으로 나타날 수 있습니다. 이럴 때 컨테이너로 래핑하여 안전하게 연산을 하는 것을 말합니다. 또한 함수형프로그래밍의 특징을 지키기 위해서도 존재합니다.

함수형프로그래밍에서는 반드시 참조투명성, 입력과 출력이 동일하게 1 : 1 매칭이 되어야 하기 때문에 불완전하게 2가지형태이상으로 나타나게 되면 이 특성이 성립하지 않게 되죠 이를 위해 안전하게 보호하기 위해 래핑하는 것입니다.   

Promise는 퓨처모나드이며 미래의 값을 담을 수 있다는 뜻을 가지고 있습니다. 미래의 값이 뭐가 있을까요? 바로 I/O모델적인 상황입니다. 데이타베이스에서 값을 가져오거나 네트워크를 통해서 어떠한 API서버로부터 값을 가져온다고 했을 때 그 값은 미래의 값이 됩니다. 지금상황으로써는 그 값이 어떠한 결과인지 모르고 단지 예상만 가능하기 때문이죠. 

이러한 비동기적인 상황에서 성공과 실패라는 두가지의 값으로 놓고 미래를 다루는 하나의 컨테이너 박스가 Promise입니다. 뭔가 멋져 보이죠? 2장에서 설명했듯이 Promise를 통해 불완전한 비동기의 결과값을 콜백이 아닌 하나의 값으로 로직을 수행하는 것을 볼 수 있었습니다.  

▶ 용어 : 콜백 : 어떤 함수가 어떠한 시점에서 다시 호출 되는 것

7.1 안전한 함수합성, Promise를 이용한 예(1)
const g = JSON.parse;
const f = k => k.temp; 
const fg = x => new Promise((resolve, reject)=> resolve(x)).then(g).then(f)
const log = x => console.log(x)

fg('{"temp":36.5}').catch(_ => 'JSON PARSE is not working').then(log)
함수 g와 함수 f를 준비합니다. {"temp":36.5}라는 문자열을 g를 이용해서 JSON Object로 변환합니다. 이 때 Promise를 이용해서 오류가 있다면 then(f)가 아닌 catch로 넘어가서 애러를 처리하게 합니다.   

7.2 안전한 함수합성 , Promise를 이용한 예(2)
const log = console.log
const users = [{name : ‘큰돌’}, {name : ‘제호’}, {name : ‘우람’}, {name : ‘다빈’}] 
const getUserByName = (name) => users.find(u => u.name === name) || Promise.reject(“객체에 없습니다.”)
const g = getUserByName;
const f = ({name}) => ${name}이가 춤을 춥니다.
Const fg = x => new Promise((resolve, reject)=> resolve(x)).then(g).then(f) 
fg(“큰돌1”).catch(_ => _).then(log)
//객체에 없습니다.
fg(“큰돌”).catch(_ => _).then(log)
// 큰돌이가 춤을 춥니다.
/*
큰돌이가 춤을 춥니다.
객체에 없습니다.
*/

아까 보았던 코드와 같은 구조이지만 다른 예제입니다. getUserByName의 경우 원하지 않는 결과값이 나올 경우 Promise.reject를 통해 다음 로직은 실행하지 않은 바로 catch로 rejected상태의 Promise를 넘겨서 종료시켜버립니다. 

더 깊게 알아보는 모나드
사실 모나드는 기본적으로 함수합성을 안전하게 하기 위해서 존재라는 설명으로는 매우 부족합니다. 하지만 실무에서는 Promise만으로도 충분히 이렇게 함수합성을 안전하게 하는 것만으로도 모나드를 잘 이용했다고 할 수 있습니다. 
하지만 정말 모나드가 어떠한 존재인지 집고 넘어가는 것은 중요합니다. 모나드는 아래의 조건을 충족하는 객체를 말합니다. 

모나드의 조건  
1. 타입을 인자로 받아 모나드화 된 타입을 반환할 수 있어야 한다.  예를 들어 number를 받아 Monad<number> 타입을 반환해야 합니다.
2. unit 함수가 있어야 합니다. 타입의 값을 순수하게 끄집어낼 수 있어야 합니다.
3. bind 함수가 있어야 합니다. 감싸진 타입을 꺼낼 수 있는 방법이 있어야 합니다. 설령 모나드가 중복되어 감싸지더라도 감싸진 타입을 꺼낼 수 있어야 합니다. flatmap이라고도 불리거나 여러가지 이름으로 불리지만 하는 역할이 같다면 그건 bind함수라고 볼 수 있습니다.  참고로 Promise의 then으로 받는 인자는 resolved된 인자이며 이는 flatten되었다라고 할 수 있기 때문에 then은 bind함수라고 볼 수 있습니다. 
Array.prototype.flatMap = function(fn) { 
  return [].concat.apply([], this.map(fn)); 
};
const a = [[1], [2], [3]].flatMap(e => e) 
console.log(a);
 
위의 코드를 보면 알 수 있듯이 Array<number> 형태의 값이 flatmap을 통해  number로 변환되는 것을 볼 수 있습니다.이렇게 푸는 것을 할 수 있는 함수를 flatMap이라 일컫습니다.

Promise는 왜 모나드일까? 
위의 모나드 조건을 모두 충족시킵니다. 
1.	순수한 값을 Promise로 래핑해서 반환할 수 있습니다.
2.	Promise.resolve(value)를 통해 순수한 값을 끄집어 낼 수 있습니다. 
3.	Promise가 중복되더라도 순수한 값을 끄집어 낼 수 있습니다.  

펑터, functor
모나드와 함께나오는 개념이 바로 펑터입니다. 펑터는 하나의 단순히 매핑할 수 있는 객체이자 컨테이너입니다.  모나드는 펑터의 일종이며 펑터의 특징에 flatMap이 있는 것을 모나드라고 합니다. Array, Promise, Stream은 펑터이며 여기서 flatMap이 있는 Promise, Stream이 모나드인 것입니다. 
배열로써 예를 들겠습니다. 배열에 map이라는 함수를 이용해서 각각의 요소에 매핑하여 새로운 배열을 변화시킬 수 있죠? 배열은 펑터입니다. 이 때 컨테이너의 type는 변화시키지 않습니다. 하지만 컨테이너안에 있는 요소들의 type들을 변화시킬 수 있습니다.
배열또한 functor입니다. 어떠한 요소를 받아서 Array라는 새로운 type를 만들기 때문입니다.  

그렇다면 functor를 만들어보겠습니다. 아래의 간단한 펑터는 아이덴티티 모나드와 동일합니다. map 역할을 bind가 하며 이 bind를 통해 f라는 함수를 받아 value에 매핑할 수 있습니다. 
const identity_monad = () =>{
    return unit = (value) => {
        const monad = Object.create(null);
        monad.bind = f => f(value)
        return monad; 
    }
} 
const a = identity_monad()(4).bind(e => e * 2)
console.log(a)
 
자바스크립트 파일을 만들고 node [파일명]으로 실행시키면 됩니다. 

모나드는 여러가지 모나드가 있습니다. 아이덴티티 모나드, 메이비 모나드를 살펴보겠습니다. 

아이덴티티 모나드, identity monad
어떤 값을 감싸고 unit 함수가 있는 모나드를 말합니다. 펑터설명할 때 얘기를 했습니다.
이를 좀 더 발전 시켜 lift 함수가 있는  아이덴티티 모나드를 만들어 보겠습니다. lift함수란 함수의 추상화 개념으로 타입에 관련없이 만들 수 있는 높은 함수의 개념입니다. 여기서는 함수를 만드는 함수로 정의됩니다. 
const identity_monad = () =>{
    const prototype = Object.create(null);
    const unit = (value) => {
		const monad = Object.create(prototype); 
        monad.bind = (f, args) => f(value, ...args)
        return monad; 
    }
	unit.lift = (name, func) =>{  
		prototype[name] = function (...args){
            //기본값으로 ...args로 빈 배열을 받을 수 있다.  
			return unit(this.bind(func, args))
		}; 
		return unit
	}
    return unit
}  
const a = identity_monad().lift("log", console.log)([1, 2, 3]) 
a.log() //[ 1, 2, 3 ]
 
자바스크립트 파일을 만들고 node [파일명]으로 실행시키면 됩니다. 
log라는 메서드를 만들어서 로그를 하는 모습을 볼 수 있습니다. 

메이비 모나드, Maybe monad  
