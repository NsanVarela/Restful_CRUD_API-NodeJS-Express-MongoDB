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
    dbo.collection(collection).find({}).limit(10).toArray(function (err, res) {
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
  var objToFind = {_id: new ObjectId(idToFind)};
  MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection(collection).deleteOne(objToFind, function(err, res) {
      if (err) throw err;
      db.close();
    });
    dbo.collection(collection).find({}).limit(10).toArray(function (err, res) {
      if (err) throw err;
      db.close();
      result.render('contact', {
        contacts: res
      });
    });
  });
});

router.get('/update', function (req, result, next) {
  // console.log('ab?cd');
  var idToFind = req.query._id;
  // console.log(idToFind);

  var objToFind = {_id: new ObjectId(idToFind)};
  // console.log(objToFind);

  MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection(collection).find(objToFind).toArray(function (err, res) {
      if (err) throw err;
      db.close();
      result.render('contact/update', {
        contacts: res
      });
    });
    var objToUpdate = { $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    }};
    dbo.collection(collection).updateOne(objToFind, objToUpdate, function(err, res) {
      if (err) throw err;
      // console.log("1 document updated");
      db.close();
    });
    // dbo.collection(collection).find({}).limit(10).toArray(function (err, res) {
    //   if (err) throw err;
    //   db.close();
    //   result.render('contact', {
    //     contacts: res
    //   });
    // });
  });
});

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

module.exports = router;