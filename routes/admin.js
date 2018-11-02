var express = require('express');
var passport = require('passport');
var app = express();
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var mongoUrl = 'mongodb://localhost:27017';
var dbName = 'myproject';
var collection = 'contact';
var adminCollection = 'userInfo';
var bodyParser = require('body-parser');

router.use(passport.initialize());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.session());

/*  PASSPORT SETUP  */
passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});

/* MONGOOSE SETUP */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myproject'), {
  useNewUrlParser: true
};

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  firstname: String,
  email: String,
  password: String
});
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

/* PASSPORT LOCAL AUTHENTICATION */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (email, password, done) {
    UserDetails.findOne({
      email: email
    }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (user.password != password) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));


/*  MÉTHODES  */
router.get('/admin', function (req, result, next) {
  result.render('admin/admin', {});
});

router.get('/success', function (req, res) {
  res.send("Welcome " + req.query.username + "!!", {});
});

router.get('/error', function (req, res) {
  res.send("error logging in", {});
});


router.post('/', passport.authenticate('local', {
  failureRedirect: '/error'
}), function (req, res) {
    res.render('admin/admin', {
      messageAdmin: 'Bonjour ' + req.user.firstname,
      confirmlog: true
    });
  }
);


module.exports = router;