var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017';
var dbName = 'myproject';
var collection = 'contact';

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Express',
    confirm: false
  });
});

router.post('/', function (req, result) {
  try {
    MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
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
          result.render('index', {
            message: '"Vos données ont bien été enregistrées"',
            confirm: true
          });
      });
    })
  } catch (e) {
    result.render('index', {
      message: '"Vos données n\'ont pas été enregistrées"',
      confirm: false
    });
  }
});


module.exports = router;