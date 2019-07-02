import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns   

df = pd.read_csv('../data/result.csv')
df.columns = ['when','city','district','firearea','prec','minhumi','maxtemp','maxwindv']  

# IPython 디스플레이 설정 - 출력할 열의 개수 한도 늘리기
pd.set_option('display.max_columns', 10)    
print(df.dtypes)
print(df.info())
print(df['prec'])
# 독립변수 : 'prec','minhumi','maxtemp','maxwindv' 
ndf = df[['firearea', 'prec','minhumi','maxtemp','maxwindv']]
 
X = ndf[['prec','minhumi','maxtemp','maxwindv']]
y = ndf['firearea']

# train data 와 test data로 구분(7:3 비율)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=10) 

print('훈련 데이터: ', X_train.shape)
print('검증 데이터: ', X_test.shape)   
print('\n') 


'''
Step 5: 다중회귀분석 모형 - sklearn 사용
'''

# sklearn 라이브러리에서 선형회귀분석 모듈 가져오기
from sklearn.linear_model import LinearRegression

# 단순회귀분석 모형 객체 생성
lr = LinearRegression()   

# train data를 가지고 모형 학습
lr.fit(X_train, y_train)

# 학습을 마친 모형에 test data를 적용하여 결정계수(R-제곱) 계산
r_square = lr.score(X_test, y_test)
print(r_square)  
# 회귀식의 기울기
print('X 변수의 계수 a: ', lr.coef_)  
# 회귀식의 y절편
print('상수항 b', lr.intercept_)  
# train data의 산점도와 test data로 예측한 회귀선을 그래프로 출력 
y_hat = lr.predict(X_test) 
  
plt.figure(figsize=(10, 5))
ax1 = sns.distplot(y_test, hist=False, label="real firearea")
ax2 = sns.distplot(y_hat, hist=False, label="predict firearea", ax=ax1)
plt.show()
plt.close()
