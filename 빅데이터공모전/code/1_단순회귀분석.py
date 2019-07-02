import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns 
import os
df = pd.read_csv('../data/result.csv') 
df.columns = ['when','city','district','firearea','prec','minhumi','maxtemp','maxwindv'] 
#  IPython 디스플레이 설정 - 출력할 열의 개수 한도 늘리기
pd.set_option('display.max_columns', 10)  

# 데이터 자료형 확인   
# 데이터 통계 요약정보 확인
print(df.describe()) 
'''
[Step 3] 속성(feature 또는 variable) 선택
'''
# 독립변수 : 'prec','minhumi','maxtemp','maxwindv' 
ndf = df[['firearea', 'prec','minhumi','maxtemp','maxwindv']] 
 
# Matplotlib으로 산점도 그리기 
def _draw(name, _figname):  
    fig = plt.figure(figsize=(10, 5))    
    sns.regplot(x= name, y='firearea', data=ndf)                 # 회귀선 표시  
    fig.savefig("../img/" + _figname + ".png") 
    plt.show()
    plt.close()
     
    # print(1)
    # _path = os.path.join(os.getcwd(), '../img/',_figname)
    # path = os.path.realpath(_path) 
    # print(path) 
_draw('prec', '1_prec')
_draw('minhumi', '1_minhumi')
_draw('maxtemp', '1_maxtemp')
_draw('maxwindv', '1_maxwindv') 