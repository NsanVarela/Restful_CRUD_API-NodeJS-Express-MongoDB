var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017';
var dbName = 'myproject';
var collection = 'contact';

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/', function (req, res) {
  try {
    MongoClient.connect(mongoUrl, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      var myobj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
      };
      dbo.collection(collection).insertOne(myobj, function (err, res) {
          if (err) throw err;
          db.close();
      });
    })
  } catch (e) {
    console.log("error")
  }
  
  res.render('index', {
    message: '"Vos données ont bien été envoyées"'
  });
});


module.exports = router;