# 참고 코드 
# https://medium.com/datadriveninvestor/k-fold-cross-validation-6b8518070833
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns   
from sklearn.model_selection import KFold
from sklearn.preprocessing import MinMaxScaler 
from sklearn.svm import SVR  # SVR이 SVC라고 불린다.
from sklearn.model_selection import cross_val_score 

df = pd.read_csv('../data/result.csv')
df.columns = ['when','city','district','firearea','prec','minhumi','maxtemp','maxwindv']  

ndf = df[['firearea', 'prec','minhumi','maxtemp','maxwindv']] 
X = ndf[['prec','minhumi','maxtemp','maxwindv']]
y = ndf['firearea']

scaler = MinMaxScaler(feature_range=(0, 1))
X = scaler.fit_transform(X)
   
scores = []
best_svr = SVR(kernel='rbf', gamma='auto')
cv = KFold(n_splits=10, random_state=42, shuffle=False)
for train_index, test_index in cv.split(X): 
    X_train, X_test, y_train, y_test = X[train_index], X[test_index], y[train_index], y[test_index]
    best_svr.fit(X_train, y_train)
    scores.append(best_svr.score(X_test, y_test))

best_svr.fit(X_train, y_train)
scores.append(best_svr.score(X_test, y_test))
print(np.mean(scores))  
ret = cross_val_score(best_svr, X, y, cv=10)
print(ret) 