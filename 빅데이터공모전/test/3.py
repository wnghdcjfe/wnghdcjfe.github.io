import pandas as pd
import numpy as np
df = pd.DataFrame(np.arange(16).reshape((4, 4)), index = [1, 2, 3, 4], columns = ['a', 'b', 'c', 'd'])
print(df)
df1 = df[df > 5].fillna(0).astype('int')
print(df1)  
f = lambda x : 0 if x > 5 else 1
# 복잡한 식은 (그렇게 복잡하지도 않지만) applymap을 이용해야 한다. 
df2 = df.applymap(lambda x : 0 if x > 5 else 1)
print(df2)

df3 = df.isin([1, 2])
print(df3)

chunkers = pd.read_csv('../data/fire.csv', chunksize = 10)
for c in chunkers:
    print(c.describe())