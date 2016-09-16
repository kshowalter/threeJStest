module.exports = function(){
  var low = require('lowdb');

  var normalizedPath = require('path').join(__dirname, '../db/');
  const db = low(normalizedPath+'db.json');

  return db;
};
