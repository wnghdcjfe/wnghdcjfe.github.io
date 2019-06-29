# 링크 
 - 공유폴더 : https://drive.google.com/open?id=16Bhpv0im_Tb61V6R-w_ZFTUVjq_tZWuf
 - 형규드라이브 : https://1drv.ms/f/s!AgB_1W2QJPdokkSvcYm5vtdLKsc1 
 - 관측자료 : https://data.kma.go.kr/cmmn/main.do
 - 산불통계 : http://www.forest.go.kr/newkfsweb/kfi/kfs/frfr/selectFrfrStats.do?searchCnd=2010&mn=KFS_02_02_01_05_01#1
 

# 산불의 특징
논문참고

# 배경 및 산불지수 문제점
중요도 부각, 시계열(산불이 증가하고 있어요..!), 피해규모

# 자료 

![전국월별산불피해면적](https://raw.githubusercontent.com/wnghdcjfe/wnghdcjfe.github.io/master/빅데이터공모전/img/전국월별산불피해면적.PNG)   
2003 ~ 2019 산불발생건수량이 많은 2, 3, 4월(추후 확대 가능)의 봄철 산불에 영향을 미치는 기상 요소인
강수량, 최소 상대습도, 최고 기온, 최고 풍속으로 분석
 - 근거 : 강원 영동지역 봄철 산불대형화 영향 기상요소 분석 : 이시영, 김지은 저

산림청(산불통계) : http://www.forest.go.kr/newkfsweb/kfi/kfs/frfr/selectFrfrStats.do?searchCnd=2010&mn=KFS_02_02_01_05_01#1
 
관측자료 AWS : https://data.kma.go.kr/cmmn/main.do

# 데이터 전처리
node.js와 pandas를 이용해 필요없는 자료를 필터링하고 매핑하여 필요한 자료를 추출한다.  
1. 산불현황 >> 2019	06	04	14:14 강원 정선 300
2. 관측값 >> 2019 06 04 14:00 강원 정선 .. 
 - 관측값은 AWS, ASOS를 합친 데이타임.

관측값은 한시간단위, 산불현황은 자세한 시간단위로 되어있음

1. 모든 산불현황의 시간단위를 2019 06 04 14:00로 바꾼다. (분 반올림) 
2. 산불, 관측값, 시간단위의 데이타를 모두 json으로 변환
3. 결과적인 JSON 데이타 형식 (결과물은 CSV로 변환하여 pandas로 분석)
```js
        const obj = {
            "when" : a.when, 
            "city" : a.city, 
            "district" : a.district, 
            "firearea" : a.firearea,  
            "prec" : c.prec || 0,
            "minhumi" : c.minhumi,
            "maxtemp" : c.maxtemp,
            "maxwindv" : c.maxwindv,
        }
```
4. 결과물은 csv로 변환 and pandas 등으로 데이터 처리

 > 관측소 이동유무는 나중에 확인

데이터전처리 추가필수 : 관측데이타 이름 상이(정선 | 정선군 | 정선북)
 - 없는 데이타 : 정선,영월,강릉,평창,홍천,고성,춘천,원주,인제,횡성,속초,동해,태백,양양,삼척,철원,양구,화천
 - ASOS 데이타 추가
 - 하는김에 오타수정좀.. maxwindv


## 모델선정
 - K fold Cross Validation : 홍철
 - 의사결정나무[필수](그룹별 상관관계분석)
 - 다중회귀분석[필수] : 홍철
 - 패널회귀분석
 - Lasso Regression
 - Quantile Regression
 - Model Tree method 
 - 6 fold cross validation
 - 다층 신경망(Multi-layered neural network)  
 - KNN : 형규
 - LSTM : 형규
 - Contingency table : 형규
 

# 분석결과

## 1. 다중회귀분석 
독립변수 : 강수량, 최소 상대습도, 최고 기온, 최고 풍속
종속변수 : 산불의 발생면적 

# 활용방안
 1. 강원지역 산불지수(FWI 지수생성)를 생성, 정확한 예측가능
 2. 지수 API 제작 쉽게 애플리케이션 제작 가능활용도 증대
 3. 웹애플리케이션 예제. D3.js로 시각화 활용가능성 부각
 4. 규모에 따른 조건 충족시 그 규모에 따른 인원 효율적 활용가능(중규모에는 1, 대규모에는 3충원 이런식)
