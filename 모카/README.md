# Mocha
에스프레소? No, 우리는 모카를 마십니다. 

모카에 관한 사항들을 정리합니다. slack에 아싸님이 하신말도 정리합니다. 

# 링크
 - [모카](https://mochajs.org/)
 - [PR하기전체크문서](https://github.com/mochajs/mocha/blob/master/.github/CONTRIBUTING.md)
 - [추천이슈라벨](https://github.com/mochajs/mocha/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Agood-first-issue)

# 명령어 
## PR 준비
1. fork
2. 자신의 저장소로부터 clone 
3. 원격 저장소 확인 git remote -v
4. 원격저장소 연결(모카) git remote add --track master upstream git@github.com:mochajs/mocha.git  
```js
origin  https://github.com/wnghdcjfe/mocha.git (fetch)
origin  https://github.com/wnghdcjfe/mocha.git (push)
upstream        git@github.com:mochajs/mocha.git (fetch)
upstream        git@github.com:mochajs/mocha.git (push)
```
이런 형식으로 뜨면 success

## 모카 커스텀 테스트하기
1. mocha 임의적으로 수정 후
2. node ./../mocha/bin/mocha  m.js

## 현재 관심있는 이슈
https://github.com/mochajs/mocha/issues/3832
https://github.com/mochajs/mocha/issues/3938
 
