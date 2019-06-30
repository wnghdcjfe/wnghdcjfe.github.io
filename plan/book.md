비전공자도 만들 수 있는 한권으로 끝내는 MEVN교과서

# 목차

## MEVN이란? (MongoDB, Express, Vue.js, Node.js) 
MEVN이란 MongoDB, Express.js, Vue.js, Node.js로 이루어진 프로젝트를 뜻합니다. 웹 어플리케이션을 만들기 위한 방법들은 많습니다. 그 중 
우리는 MEVN이라는 스택으로 웹앱을 만들것입니다. 

웹 어플리케이션이란 뭘까요? 
웹 어플리케이션은 크게 서버와 클라이언트로 구성되어있습니다. 클라이언트는 사용자, 내가 보는 화면을 뜻합니다. 서버는 그 화면을 제공해주는 제공자입니다. 
예를 들어 치킨집에 가서 맛초킹치킨을 시키면 맛초킹치킨이 나옵니다. 그 과정을 계략적으로 보면 다음과 같습니다. 
 1. 치킨 주문
 2. 치킨 생산
 3. 치킨을 주문자에게 배달

이와 마찬가지로 웹 애플리케이션도 그와 같습니다. 
 1. 클라이언트가 서버에게 화면을 요청
 2. 서버에서는 화면에 필요한 데이타 생성
 3. 클라이언트에게 전달

다시 예를 들어 www.naver.com을 쳐서 네이버란 사이트에 들어간다고 치면 다음과 같습니다. 네이버라는 서버에 우리는 요청을 하고 네이버라는 서버는 그 요청을 수락해 마침내 
네이버라는 사이트가 **보여지게** 되는 것입니다. 

우리는 이런 요청을 할 때 HTTP요청이라는 약속을 통해 요청할 수 있습니다.
자세한 설명은 이 링크를 참고하시길 바랍니다. 
 - [HTTP요청의이해](https://kundol.kr/2019/05/11/HTTP/)

### 2.1.1 실행환경구축 VS CODE
 
### 1.3 단축키설명 꿀팁
제가 자주 사용하는 단축키는 다음과 같습니다. 
 - Ctrl + F : 텍스트 찾기
 - Ctrl + / : 주석(반대도 가능합니다.)
 - Ctrl + z : 실행 취소 
 - Tab : 들여쓰기
 - Shft + Tab : 반대로 들여쓰기
 - alt + Shift : 같이 누르면서 드래그를 하면 세로 형태로 선택이 된다.
  

### 2.1. Node.js
- Node.js설명
- Node.js의 장단점
- Pm2를 통한 성능향상
- node forever 설명

### 2.2. Express
- Express의 구조
- Static, router 예제
- 미들웨어만들기  

### 2.3. Vue.js
- SPA 설명, 장단점
- Vue.js기본설명은 링크로
- Vue-cli를 통한 시작
- Webpack설명

### 2.4. MongoDB
- MongoDB의 구조 (엔진, API구성)
- Eviction 등 서버 구축시 주의사항
- Mongoose와 MongoDB node.js 드라이버 성능비교
- MongoDB node.js 드라이버와 함께하는 기본적인 CRUD 
- aggregate와 mapReduce 성능비교
- aggregate 예제, mapReduce 예제

## 3. 코드최적화와 패러다임
- 함수형프로그래밍
 - 참조투명성, 순수함수
 - 모나드 등.. 
- CSS최적화
- 자바스크립트 최적화
  - 어떤 함수를 쓸 것인가 parsInt와 ~~의 성능비교
  - 어떤 함수를 쓸 것인가. deepCopy 성능비교
  - 어떤 함수를 쓸 것인가. includes, indexOf 성능비교
  - 얼마나 많은 객체를 선언할 것인가. 
  - 서버 요청개수에 따른 최적화 비교
- 로직최적화
 - 시간복잡도와 공간복잡도
 - 서버요청최소화
  - minify
  - 메모이제이션
   - 다이나믹 프로그래밍
 - 피벗알고리즘 - 이미지리시트를 찾는 실질적 예 설명
- UX 향상
 - lazy load
 - 이미지 크기 줄이기 : panda png 사이트 소개

## 4.프로젝트1. 미술품 소개 및 결제 사이트 제작  
기상청자료를 기반으로 실시간 기상데이터를 표출하는 RESTAPI 
- 아키텍처 설계
 - MongoDB 스키마 구축
 - 디렉토리 설계
 - 이벤트 설계
- JWT 인증방식 및 구축
 - JWT 소개
 - postman을 통한 테스트
- Passport를 이용한 naver, kakao, facebook 로그인 
 - 작가별 로그인페이지
 - JWT 연동
- 작가별 미술품정보 입력모듈
 - 이미지 업로드 모듈
  - 이미지크기 줄이는 모듈제작
 - summernote 또는 toast UI editor를 통한 입력 모듈
  - XSS, CSRF토큰 등 보안 주의사항 
  - axios의 validateStatus, cancelToken 활용 예제
  - 데이터 베이스 저장모듈 제작
 - 이미지 게시판 페이지 구축
  - 무한 스크롤 이벤트
  - Lazy load 적용 
- 네이버페이 SDK를 이용한 거래연동

## 5. 프로젝트2. 실시간 데이터시각화 
기상청자료를 기반으로 실시간 기상데이터를 표출하는 RESTAPI 
- REST API 
 - 이해 
 - 구축예제 
 - CORS 및 주의사항
 - 요청 제한 및 IP 설정  
- 실시간통신, Socket.io
 - websocket방식과 polling 방식 비교
 - 간단한 채팅 예제
- 시각화 라이브러리 D3.js
 - 구조 및 D3의 장단점
 - 간단한 예제
  - circle, rectangle, data, enter, selectAll 
- 재사용컴포넌트제작
 - 차트 컴포넌트 Vue + D3
  - 고정된 데이타를 기준으로 차트 
  - 업데이트되는 데이타를 기준으로 차트
  - tooltip 이벤트
  - REST API와 연동되어 실제 데이터와 차트구축
  - 메모이제이션 알고리즘을 적용하여 서버요청 최적화 
 - 지도 컴포넌트 Vue + D3
  - topojson과 geojson비교
  - 메르카토르 도법 소개
  - 위경도를 계산한느 geolib 라이브러리 소개
  - 지도 매핑
  - zoom이벤트추가 
- 안정적인 서버를 위한 구축과정
 - 로그시스템
  - 실시간 로그시스템
  - 로그 자료조회
 - 오류처리 
  - 모나드이용 예제 
  - uncaughtException 처리방법
 - 메시지큐
  - AMQP(Advanced Message Queueing Protocol)를 활용한 메시지큐로 서버불안정화 대비
  - 메시지큐 만들어보기

## 6. 프로젝트3. UX 테스트 자동화 프로그램
- nightmare.js를 통한 테스트 프로그램 구축

## 7. 크로스 브라우징
 - css, js IE용 변환
  - babel