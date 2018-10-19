var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = 'mongodb://localhost:27017';
var dbName = 'myproject';
var collection = 'contact';


router.get('/', function(req, result, next) {
  MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection(collection).find({})/*.limit(10)*/.toArray(function (err, res) {
      if (err) throw err;
      db.close();
      result.render('contact', {
        contacts: res
      });
    });
  });
});

router.get('/delete', function (req, result) {
  var idToFind = req.query._id;
  console.log(idToFind);

  var objToFind = {_id: new ObjectId(idToFind)};
  MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection(collection).deleteOne(objToFind, function(err, res) {
      if (err) throw err;
      db.close();
    });
    dbo.collection(collection).find({}).toArray(function (err, res) {
      if (err) throw err;
      db.close();
      result.render('contact', {
      contacts: res
      });
    });
  });
});

// const findDocuments = function(db, callback) {
//   const collection = db.collection(collection);
//   return collection.find({}).toArray(function(err, docs) {
//     callback(docs);
//     return docs;
//   });
// }


//   // Delete single document
//   var myquery = { lastname: 'Jones' };
//     collection.deleteOne(myquery, function(err, obj) {
//       if (err) throw err;
//       // console.log("1 document deleted");
//     });

// const deleteDocument = function(db, callback) {
//   const collection = db.collection('contact');
//   var myquery = { lastname: 'Jones'};
//   collection.deleteOne(myquery, function(err, obj) {
//       if (err) throw err;
//       // console.log("1 document deleted");
//     });
// }

  // Update
  // var myquery = { firstname: 'Nicolas' };
  // var newvalues = { firstname: 'Nuno', address: "Saint-Ouen" };
  // db.collection("contact").update(myquery, newvalues, function(err, res) {
  //   if (err) throw err;
  //   // console.log("1 document updated");
  // });

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