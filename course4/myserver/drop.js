var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://sagar:x@sagar-83iwx.mongodb.net";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("conFusion");
  dbo.collection("favorites").drop(function(err, delOK) {
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});