var express = require('express');
var path = require('path');
var router = express.Router();
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var dbName = 'myproject';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


module.exports = router;