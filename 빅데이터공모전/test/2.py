import pandas as pd
a = {'수학' : [1, 2, 3], '영어' : [1, 2, 3]} 
print(a) 
def add10(a):
    return a + 10
df = pd.DataFrame(a, index = ['홍철', '형규', '아름'])

# 수학 행에만 add10을 추가할 수 있다. 그래도 원래 df는 반영이 되지 않는다. 
df['수학'].apply(add10) 
# 전체적으로 다 반영할 수 있다. 
ret = df.apply(add10) 
print(ret)

mask = (df['수학'] >= 11)
_df = df.loc[mask, :]
print(_df.head())
# print(df.loc['홍철'])
# print(df.iloc[0])

# label = df.loc('b')
# pos = df.iloc[0]
