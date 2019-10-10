### MongoDB
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

서버안에 MongoDB자체가 전체 메모리의 메모리 버퍼를 전체의 50%를 씁니다. 떄문에 한 서버안에 프라이머리 / 세컨더리 두개 절대 놓지 않습니다.  

메모리가 부족할 경우 `eviction`이 잘되지 않고 메모리버퍼를 아예 지우는 작업을 하고 심할 경우 데몬이 죽게 됩니다.  
 - eviction : 메모리버퍼에서 필요없는 데이타를 삭제하는 작업
 - 체크포인트 : 메모리 버퍼와 디스크사이의 데이터 불일치를 해소하기 위해 메모리에서 디스크로 data 동기화를 하는 작업

#### 특징
 1. 그리고 한개의 DATA 구조는 key - value 형태로 이루어져 있으며 _id라는 고유한 아이디를 가집니다. 
 2. 스키마 없이 데이터모델을 구현하지 않은채 그냥 유동적으로 데이타를 삽입할 수 있습니다. 
 - 스키마 : 데이타베이스를 구성하는 속성, 관계 등 데이타 값들이 갖는 type들을 명시 해놓은 것을 말합니다. 
 - 장점 : 다양한 서비스로부터 데이타를 쌓을 때 유동적으로 쌓을 수 있음
 - 단점 : RDBMS인 경우에는 int, char[14]인 경우에는 18바이트 그러나 몽고디비는 한 도큐먼트로 칼럼이름또한 바이트에 추가가 되기때문에 바이트가 더 커집니다. 즉, 공간적인 소모가 많음. 
 3. min, max, aggreate, mapReduce 등 강력한 함수로 데이터를 뽑아내고 조합하는 등의 활동을 할 수 있습니다. data들을 모아서 초최대값을 뽑아내거나 최소값 등등의 행위를 할 수 있습니다.  
 4. ReplicaSet을 이용해 이중화가 가능합니다. 
 5. BJSON, Binary Json 형태로 저장합니다. json 형태가 아닙니다.
 6. geoSpartial 인덱스를 써서 2Dimension 좌표  search에 활용이 가능합니다. 이것을 인덱싱이 자유롭다고 합니다.
 7. $lookup을 통한 collection조인이 가능
 8. 쿼리정렬시 애러 발생할경우 다음과 같이 해결할 수 있다. 
  - 정렬 작업에 인덱스를 활용
  - 메모리 공간을 크게 놓는다. 
  - find명령어 대신 aggregate명령을 사용하고 allowDiskUse옵션을 true로 설정하는 것
 9. TDE를 통해 보안 적용가능(범위검색에 경우 좋음) 응용프로그램으로 보안이 가능(bcrypt)하지만 범위검색의 경우 수행이 불가함.
 10. 3.4이상 wired Tiger엔진 사용
  - LSM_Tree(로그 기반 병합트리)를 이용 읽기 성능을 포기하고 그만큼의 저장 성능을 향상시킨 솔루션 / 느린 읽기 성능을 보완하기 위해 블룸 필터를 사용 
 11. Background Index생성시 DB 자체에 Lock이 걸림 
 12. Mongoose는 빠르지가 않아서 권장하지 않으며 Node.js 2.x 드라이버 권장하며 3.x는 커넥션 문제가 발생됩니다. 
 13. 기본적으로 JSON도큐먼트를 인자로 사용
 14. 도큐먼트에서 _id 라는 필드가 자동으로 그 도큐먼트의 프라이머리 키로 선정된다. 나머지의 인덱스는 세컨더리 키로 선정된다. JSON 값을 문자열로 그대로 저장하는 것이 아니라 문자열 기반의 JSON텍스트를 BSON, Binary JSON형태로 저장한다. 
 15. 샤딩환경에서 index 설정시 각 샤딩환경안에서만 유니크하다. 
 16. 인덱스의 기본 정렬은 항상 오름차순으로 구현돼 있지만 이 인덱스를 읽는 방향에 따라서 오름차순 또는 내림차순의 효과를 얻을 수 있으며 인덱스에서 각 필드의 정렬을 오름차순, 내림차순 으로 결정할 수 있으며 대부분의 인덱스는 B-Tree를 적용한다.(인덱스 정렬은 B-tree에서만 가능)
 17. 디스크에 데이터를 저장하는 가장 기본단위를 페이지 또는 블록이라고 한다. 

#### Hbase와의 비교
조회조건에 따라서 세컨더리 인덱싱이 필요하는데 Hbase는 그걸 하지 못하며 하둡에 올라가서 물리적으로 분리가 되어있으나 MongoDB는 샤드 단위로 논리적으로 분리가 되어있음
wired tiger로 높은 수준의 ACID를 할 수 있다. 또한..REST API를 사용하니까 편리하게 JSON을 제공할 플랫폼이 필요! 이를 위한 MongoDB 

## Node.js
### V8 저스트인타임 컴파일러

### V8 - 히든클래스
오프셋을 이용해서 메모리 주소로 점프
또한 같은 히든클래스는 캐싱이 된다. 어떤게 캐싱이 되는가. 
 - 속성 변경의 순서 통일
 - 동일 메소드의 경우 

### V8 - GC, 가비지 컬렉션
전역 변수를 최소화 하고 DOM에서 벗어난 태그는 참조하지 말아야 한다.  
1. 할당 > 사용 > 해제
2. 참조를 기반으로 해제
3. 최종적으로 마크스위프 알고리즘, root로 부터 닿을 수 있는 가 없는가를 통해 해제 

### 메모리 누수
전역변수 / 잊혀진 콜백함수 / 사라진 DOM의 참조 / 클로저

## D3.js

## nginx 

## 함수형 프로그래밍
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

