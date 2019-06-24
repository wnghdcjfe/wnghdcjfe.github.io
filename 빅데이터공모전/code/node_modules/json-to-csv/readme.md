#json-to-csv

Given an array of Javascript objects and a file name, this module writes the contents of the array to a csv file, wrapped in a promise.

**To Install**
```
npm install json-to-csv
```

**To Use**
```
var jsonToCSV = require('json-to-csv');
```

**To write to file:**
```
const o = [
	{a: 1, b: 2, c: 3},
	{a: 4, b: 5, c: 6}
];
const fileName = 'something.csv';

jsonToCSV(o, fileName)
.then(() => {
  // success
})
.catch(error => {
  // handle error
})
```
The `something.csv` file will appear as:
```
a,b,c
1,2,3
4,5,6
```
