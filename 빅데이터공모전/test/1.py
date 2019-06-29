import pandas as pd
a = {'수학' : [1, 2, 3], '영어' : [1, 2, 3]}
print(a)

df = pd.DataFrame(a, index = ['홍철', '형규', '아름'])
# 라벨로 참조, 또는 indexloc으로 참조할 수 있다. 
print(df.loc['홍철'])
print(df.iloc[0])
# -1로 하면 역순으로 참조가 가능하다. 
print(df.iloc[::-1]) 