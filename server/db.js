module.exports = function(dbName, defaults){
  var low = require('lowdb');

  var normalizedPath = require('path').join(__dirname, '../db/');
  const lowdb = low(normalizedPath+dbName+'.json');

  if(defaults){
    lowdb.defaults(defaults)
      .value();
  } else {
    lowdb.defaults()
      .value();
  }

  var db = {
    get: function(dbName){
      var doc = lowdb.get(dbName)
        .cloneDeep()
        .value();
      return doc;
    },
    set: function(dbName, doc){
      lowdb.get(dbName)
        .push(doc)
        .value();
      //lowdb.set('user.name', 'typicode')
      //  .value();
      return true;
    }
  };




  return db;
};
