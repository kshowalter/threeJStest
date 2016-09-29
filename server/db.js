//var low = require('lowdb');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});


module.exports = function(dbName, defaults){

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
    get: function(dbName, filterObj){
      var doc = lowdb.get(dbName)
        .filter(filterObj)
        .cloneDeep()
        .value();
      return doc;
    },
    set: function(dbName, doc, filterObj ){
      filterObj = filterObj || false;
      console.log('___db.set___', dbName, doc, filterObj );
      var results = lowdb.get(dbName)
        .filter(filterObj);
      console.log(filterObj, results.value());
      console.log('size', results.size().value());
      if( results.size().value() ){
        console.log('assign', doc);
        lowdb.get(dbName)
          .find(filterObj)
          .assign(doc)
          .value();
      } else {
        console.log('pushing', doc);
        lowdb.get(dbName)
          .push(doc)
          .value();
      }
      //lowdb.set('user.name', 'typicode')
      //  .value();
      return true;
    }
  };




  return db;
};
