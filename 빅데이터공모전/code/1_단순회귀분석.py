import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns 
df = pd.read_csv('./result.csv', header=None)
df.columns = ['when','city','district','firearea','prec','minhumi','maxtemp','maxwindv'] 
#  IPython 디스플레이 설정 - 출력할 열의 개수 한도 늘리기
pd.set_option('display.max_columns', 10) 

# 데이터 자료형 확인
print(df.info())  
print('\n')

# 데이터 통계 요약정보 확인
print(df.describe())
print('\n')

'''
[Step 3] 속성(feature 또는 variable) 선택
'''
# 독립변수 : 'prec','minhumi','maxtemp','maxwindv' 
ndf = df[['prec','minhumi','maxtemp','maxwindv']]
print(ndf.head())   
print('\n')
 
# Matplotlib으로 산점도 그리기
ndf.plot(kind='scatter', x='prec', y='firearea',  c='coral', s=10, figsize=(10, 5))
plt.show()
plt.close()
ndf.plot(kind='scatter', x='minhumi', y='firearea',  c='coral', s=10, figsize=(10, 5))
plt.show()
plt.close()
ndf.plot(kind='scatter', x='maxtemp', y='firearea',  c='coral', s=10, figsize=(10, 5))
plt.show()
plt.close()
ndf.plot(kind='scatter', x='maxwindv', y='firearea',  c='coral', s=10, figsize=(10, 5))
plt.show()
plt.close()