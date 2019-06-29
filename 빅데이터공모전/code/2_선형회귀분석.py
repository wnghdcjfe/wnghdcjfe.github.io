import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns 
df = pd.read_csv('./result.csv', header=None)
df.columns = ['when','city','district','firearea','prec','minhumi','maxtemp','maxwindv'] 
# IPython 디스플레이 설정 - 출력할 열의 개수 한도 늘리기
pd.set_option('display.max_columns', 10)  

# 독립변수 : 'prec','minhumi','maxtemp','maxwindv' 
ndf = df[['prec','minhumi','maxtemp','maxwindv']]
print(ndf.head())   
print('\n')
 
def show_linear_predict(_x):
    # 훈련용, 검증용 데이타 구분 7 : 3 
    X=ndf[[_x]]  # 독립 변수 X
    y=ndf['firearea']     # 종속 변수 Y

    # train data 와 test data로 구분(7:3 비율)
    from sklearn.model_selection import train_test_split
    X_train, X_test, y_train, y_test = train_test_split(X,               #독립 변수 
                                                        y,               #종속 변수
                                                        test_size=0.3,   #검증 30%
                                                        random_state=10) #랜덤 추출 값 

    print('train data 개수: ', len(X_train))
    print('test data 개수: ', len(X_test)) 

    # sklearn 라이브러리에서 선형회귀분석 모듈 가져오기
    from sklearn.linear_model import LinearRegression

    # 단순회귀분석 모형 객체 생성
    lr = LinearRegression()   

    # train data를 가지고 모형 학습
    lr.fit(X_train, y_train)

    # 학습을 마친 모형에 test data를 적용하여 결정계수(R-제곱) 계산
    r_square = lr.score(X_test, y_test)
    print(r_square)
    print('\n')

    # 회귀식의 기울기
    print('기울기 a: ', lr.coef_)
    print('\n')

    # 회귀식의 y절편
    print('y절편 b', lr.intercept_)
    print('\n')

    # 모형에 전체 X 데이터를 입력하여 예측한 값 y_hat을 실제 값 y와 비교 
    y_hat = lr.predict(X)

    plt.figure(figsize=(10, 5))
    ax1 = sns.distplot(y, hist=False, label="y")
    ax2 = sns.distplot(y_hat, hist=False, label="y_predict", ax=ax1)
    plt.show()
    plt.close()

show_linear_predict('prec')
show_linear_predict('minhumi')
show_linear_predict('maxtemp')
show_linear_predict('maxwindv')