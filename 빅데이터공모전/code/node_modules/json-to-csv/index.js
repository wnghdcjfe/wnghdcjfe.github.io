var fs           = require('fs'),
    R            = require('ramda'),
    json2csv     = require('json2csv');

module.exports = function toCSV(records, fileName) {
  if (!records.length) throw 'Error - Array is empty';

  var fields = {data: records, fields: R.keys(records[0])};

  return new Promise(function(resolve, reject) {
    json2csv(fields, function(err, csv) {
      if (err) reject(err);
      fs.writeFile(fileName, csv, function(err) {
        return !err ? resolve() : reject(err);
      });
    });
  });
};
