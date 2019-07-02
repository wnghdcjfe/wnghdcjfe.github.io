# 참고코드 : https://www.datacamp.com/community/tutorials/decision-tree-classification-python
import pandas as pd
from sklearn.tree import DecisionTreeClassifier 
from sklearn.model_selection import train_test_split  on
from sklearn import metrics  
from sklearn.preprocessing import MinMaxScaler 
from sklearn import preprocessing
from sklearn import utils

df = pd.read_csv('../data/result.csv')
df.columns = ['when','city','district','firearea','prec','minhumi','maxtemp','maxwindv']  

ndf = df[['firearea', 'prec','minhumi','maxtemp','maxwindv']] 
X = ndf[['prec','minhumi','maxtemp','maxwindv']]
y = ndf['firearea'] 

scaler = MinMaxScaler(feature_range=(0, 1))
X = scaler.fit_transform(X) 
print(X)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=1) # 70% training and 30% test


# lab_enc = preprocessing.LabelEncoder()
# y_train = lab_enc.fit_transform(y_train)
clf = DecisionTreeClassifier() 
clf = clf.fit(X_train,y_train)
y_pred = clf.predict(X_test)
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
 