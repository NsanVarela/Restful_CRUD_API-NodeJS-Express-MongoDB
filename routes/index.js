const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myproject';
const contact = 'contact';

router.get('/', function (req, res) {
  res.render('index');
});

router.post('/', function (req, result) {
  try {
    MongoClient.connect(mongoUrl, {
      useNewUrlParser: true
    }, function (err, db) {
      var dbo = db.db(dbName);
      var myobj = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
      };
      dbo.collection(contact).insertOne(myobj, function (err, res) {
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