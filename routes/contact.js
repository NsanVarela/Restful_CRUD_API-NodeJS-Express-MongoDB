var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'myproject';


router.get('/', function(req, res, next) {
  // console.log("totot get")
  MongoClient.connect(url, function(err, client) {
    // console.log("Connected correctly to server");
    const db = client.db(dbName);
    findDocuments(db, function() {
      client.close();
    });
  });
});

const findDocuments = function(db, callback) {
  const collection = db.collection('contact');
  collection.find({}).toArray(function(err, docs) {
    // console.log("Found the following records");
    // console.log(docs)
    callback(docs);
    return docs;
  });

  // Delete single document
  var myquery = { lastname: 'Jones' };
    collection.deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      // console.log("1 document deleted");
    });

const deleteDocument = function(db, callback) {
  const collection = db.collection('contact');
  var myquery = { lastname: 'Jones'};
  collection.deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      // console.log("1 document deleted");
    });
}

  // Update
  // var myquery = { firstname: 'Nicolas' };
  // var newvalues = { firstname: 'Nuno', address: "Saint-Ouen" };
  // db.collection("contact").update(myquery, newvalues, function(err, res) {
  //   if (err) throw err;
  //   // console.log("1 document updated");
  // });
}

// POST method route
router.post('/', function (req, res) {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var dbo = db.db("myproject");
    var myobj = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    };
    dbo.collection("contact").insertOne(myobj, function (err, res) {
        if (err) throw err;
        // console.log("1 document inserted");
        db.close();
    });
  });

  res.render('contact', {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  });
});

router.post('/update', function (req, res, next) {

});

router.post('/delete', function (req, res, next) {
  
});

module.exports = router;