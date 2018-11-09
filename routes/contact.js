const express = require('express');
const passport = require('passport');
const app = express();
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myproject';
const contact = 'contact';
const userInfo = 'userInfo';
const bodyParser = require('body-parser');

router.get('/', function (req, result, next) {
  MongoClient.connect(mongoUrl, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection(contact).find({}).limit(20).toArray(function (err, res) {
      if (err) throw err;
      db.close();
      result.render('admin/contact', {
        contacts: res
      });
    });
  });
});

router.get('/signin', function (req, result) {
  var myobj = {
    firstname: req.query.firstName,
    email: req.query.emailSignIn,
    password: req.query.passwordSignIn,
  };
  MongoClient.connect(mongoUrl, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db("myproject");
    dbo.collection(userInfo).findOne(
      myobj,
      function (err, res) {
        console.log(res);
        if (err) throw err;
        db.close();
        result.render('index', {
          messageLogg: 'Bonjour ' + res.firstName,
          confirmlog: true
        });
      });
  });
});

router.get('/user', function (req, result, next) {
  var idToFind = req.query._id;
  var objToFind = {
    _id: new ObjectId(idToFind)
  };
  MongoClient.connect(mongoUrl, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection(contact).find(objToFind).toArray(function (err, res) {
      if (err) throw err;
      db.close();
      result.render('admin/update', {
        contacts: res
      });
    });
  });
});

router.get('/delete', function (req, result) {
  var idToFind = req.query._id;
  var objToFind = {
    _id: new ObjectId(idToFind)
  };
  MongoClient.connect(mongoUrl, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection(contact).deleteOne(objToFind, function (err, res) {
      if (err) throw err;
      db.close();
    });
    dbo.collection(contact).find({}).limit(20).toArray(function (err, res) {
      if (err) throw err;
      db.close();
      result.render('admin/contact', {
        contacts: res
      });
    });
  });
});

router.post('/', function (req, res) {
  MongoClient.connect(mongoUrl, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myobj = {
      firstname: req.body.firstName,
      lastname: req.body.lastname,
      email: req.body.email
    };
    dbo.collection(contact).insertOne(myobj, function (err, res) {
      if (err) throw err;
      db.close();
      res.render('admin/contact', {
        firstname: req.body.firstName,
        lastname: req.body.lastname,
        email: req.body.email
      });
    });
  });
});

router.post('/update', function (req, result) {
  var idToFind = req.body._id;
  var objToFind = {
    _id: new ObjectId(idToFind)
  };
  var objUpdated = {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    }
  };
  MongoClient.connect(mongoUrl, {
    useNewUrlParser: true
  }, function (err, db) {
    if (err) throw err;
    const dbo = db.db(dbName);
    dbo.collection(contact).updateOne(objToFind, objUpdated, function (err, res) {
      if (err) throw err;
      db.close();
    });
    dbo.collection(contact).find({}).limit(10).toArray(function (err, res) {
      if (err) throw err;
      db.close();
      result.render('admin/contact', {
        contacts: res
      });
    });
  });
});

router.post('/signup', function (req, result) {
  try {
    var myobj = {
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    MongoClient.connect(mongoUrl, {
      useNewUrlParser: true
    }, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbName);
      dbo.collection(userInfo).insertOne(myobj, function (err, res) {
        if (err) throw err;
        db.close();
        result.render('index', {
          messageLogg: 'Bonjour ' + req.body.firstName,
          confirmlog: true
        });
      });

    });
  } catch (e) {
    result.render('index', {
      messageLogg: '"Erreur de connexion à votre compte"',
      confirmlog: false
    });
  }
})

module.exports = router;