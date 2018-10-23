var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = 'mongodb://localhost:27017';
var dbName = 'myproject';
var collection = 'contact';
var adminCollection = 'administrator';

router.get('/', function(req, result, next) {

  MongoClient.connect(mongoUrl, function(err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection(collection).find({}).limit(20).toArray(function (err, res) {
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
    dbo.collection(collection).find({}).limit(20).toArray(function (err, res) {
      if (err) throw err;
      db.close();
      result.render('contact', {
        contacts: res
      });
    });
  });

});

router.get('/update', function (req, result, next) {

  var idToFind = req.query._id;
  var objToFind = {_id: new ObjectId(idToFind)};

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
    dbo.collection(collection).insertOne(myobj, function (err, res) {
        if (err) throw err;
        db.close();
    });
  });

  res.render('contact', {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  });
  
});

router.post('/update', function(req, result) {

  var idToFind = req.body._id;
  var objToFind = {_id: new ObjectId(idToFind)};
  var objUpdated = { $set : {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  }};

  MongoClient.connect(mongoUrl, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection(collection).updateOne(objToFind, objUpdated, function(err, res) {
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

router.post('/signup', function(req, result) {
  try {
    var myobj = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password: req.body.pass,
    };
    if (req.body.pass === req.body.confirmPass) {

      MongoClient.connect(mongoUrl, function (err, db) {
        if (err) throw err;
    
        var dbo = db.db("myproject");
        dbo.collection(adminCollection).insertOne(myobj, function (err, res) {
          if (err) throw err;
          db.close();
          result.render('index', {
            messageLogg: 'Bonjour ' + req.body.firstName,
            confirmlog: true
          });
        });
      });
    } else {
      error: "Vos mots de passes doivent être identiques !"
    };
  } catch (e) {
    result.render('index', {
      messageLogg: '"Erreur de connexion à votre admin"',
      confirmlog: false
    });
  }
})

router.post('/signin', function(req, result) {

  var myobj = {
    firstname: req.body.email,
    lastname: req.body.pass,
  };

})


module.exports = router;