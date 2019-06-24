# 구성
강원지역 산불지수(FWI 지수생성)
 1. 기존의 문제점보완
 2. 지수활용API 제작
 3. D3.js로 시각화 활용가능성 부각

# 분석방법
 - 정규화 로지스틱 회귀분석
 - 다층 신경망(Multi-layered neural network) 
 - KNN, 다층 신경망 모형인 딥 러닝(Deep-learning) 알고리즘
 - LSTM으로 미래의 산불지수까지 제공

# 링크 
 - 공유폴더 : https://drive.google.com/open?id=16Bhpv0im_Tb61V6R-w_ZFTUVjq_tZWuf
 - 형규드라이브 : https://1drv.ms/f/s!AgB_1W2QJPdokkSvcYm5vtdLKsc1 
 - 관측자료 : ttps://data.kma.go.kr/cmmn/main.do
 - 산불통계 : http://www.forest.go.kr/newkfsweb/kfi/kfs/frfr/selectFrfrStats.do?searchCnd=2010&mn=KFS_02_02_01_05_01#1

# 자료 


![전국월별산불피해면적](https://raw.githubusercontent.com/wnghdcjfe/wnghdcjfe.github.io/master/빅데이터공모전/img/전국월별산불피해면적.PNG)   

2003 ~ 2019 산불발생건수량이 많은 2, 3, 4월(추후 확대 가능)의 봄철 산불에 영향을 미치는 기상 요소인
강수량, 최소 상대습도, 최고 기온, 최고 풍속으로 분석
 - 근거 : 강원 영동지역 봄철 산불대형화 영향 기상요소 분석 : 이시영, 김지은 저

# 데이터 전처리
node.js와 pandas를 이용해 필요없는 자료를 필터링하고 매핑하여 필요한 자료를 추출한다.  
1. 산불현황 >> 2019	06	04	14:14 강원 정선 300
2. 관측값 >> 2019 06 04 14:00 강원 정선 .. 
 - 관측값은 AWS, ASOS를 합친 데이타임.

관측값은 한시간단위, 산불현황은 자세한 시간단위로 되어있음

1. 모든 산불현황의 시간단위를 2019 06 04 14:00로 바꾼다. (분 반올림) 
2. 산불, 관측값, 시간단위의 데이타를 모두 json으로 변환
3. 결과적인 JSON 데이타 형식
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

# 분석방법
## 1. 회귀분석 
독립변수 : 강수량, 최소 상대습도, 최고 기온, 최고 풍속

종속변수 : 산불의 발생면적

# 2019.06.24
분석방법 구체화 