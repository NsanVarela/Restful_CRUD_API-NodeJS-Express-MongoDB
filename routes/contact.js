const express = require('express');
const passport = require('passport');
const app = express();
const router = express.Router();
const {
  findContactWithLimit,
  findOneContact,
  updateContact,
  deleteContact,
  addContact,
  updatedContact
} = require('../repository/contact-repository');
const {
  findOneUserInfo,
  registerUserInfo
} = require('../repository/user-info-repository');

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'myproject';
const contact = 'contact';
const userInfo = 'userInfo';
const bodyParser = require('body-parser');

router.get('/', function (req, result, next) {
  findContactWithLimit(20).then(val => {
    result.render('admin/contact', {
      contacts: val
    })
  })
});

router.get('/signin', function (req, result) {
  const contact = {
    firstname: req.query.firstName,
    email: req.query.emailSignIn,
    password: req.query.passwordSignIn,
  };
  //findOneUserInfo
  findOneUserInfo(contact).then(val => {
    result.render('index', {
      messageLogg: 'Bonjour ' + val.firstName,
      confirmlog: true
    })
  })
  // findOneContact(contact).then(val => {
  //   result.render('index', {
  //     messageLogg: 'Bonjour ' + val.firstName,
  //     confirmlog: true
  //   })
  // })
});

router.get('/user', function (req, result, next) {
  const user = {
    _id: new ObjectId(req.query._id)
  };
  findOneContact(user).then(val => {
    console.log("val=", val);
    result.render('admin/update', {
      contacts: val
    })
  })
});

router.get('/delete', function (req, result) {
  const user = {
    _id: new ObjectId(req.query._id)
  };
  deleteContact(user).then(val => {
    result.render('admin/contact', {
      contacts: val
    })
  })
});

router.post('/', function (req, res) {
  const user = {
    firstname: req.body.firstName,
    lastname: req.body.lastname,
    email: req.body.email
  };
  addContact(user).then(val => {
    res.render('admin/contact', {
      contacts: val
    })
  })
});

router.post('/update', function (req, result) {
  const user = {
    _id: new ObjectId(req.body._id)
  };
  const userUpdated = {
    $set: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    }
  };
  updateContact(user, userUpdated).then(val => {
    result.render('admin/contact', {
      contacts: val
    })
  })
});

router.post('/signup', function (req, result) {
  const contact = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  registerUserInfo(contact).then(val => {
    result.render('index', {
      messageLogg: 'Bonjour ' + val.firstName,
      confirmlog: true
    })
  })
});

module.exports = router;