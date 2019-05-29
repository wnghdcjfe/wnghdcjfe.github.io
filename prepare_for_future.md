# 목차
## 1. 실행환경구축 VS CODE
 - VS CODE 설치
 - VS thema, icon thema 폰트 설정
 - 단축키설명 꿀팁

## 2. MEVN이란? (MongoDB, Express, Vue.js, Node.js) 

### 2.1. Node.js
- Node.js 의 구조  
- Node.js의 장단점
- Pm2를 통한 성능향상

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

## 3. 코드최적화 
- 함수형프로그래밍
- CSS최적화
- 자바스크립트 최적화
  - 어떤 함수를 쓸 것인가 parsInt와 ~~의 성능비교
  - 어떤 함수를 쓸 것인가. deepCopy 성능비교
  - 어떤 함수를 쓸 것인가. includes, indexOf 성능비교
- 로직최적화
 - 시간복잡도와 공간복잡도
 - 서버요청최소화
  - minify, 메모이제이션
 - 피벗알고리즘 
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
## 6. 프로젝트3. UX 테스트 자동화 프로그램
- nightmare.js를 통한 테스트 프로그램 구축 
