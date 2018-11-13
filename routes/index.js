const express = require('express');
const router = express.Router();
const {
  addContact
} = require('../repository/contact-repository');

router.get('/', function (req, res) {
  res.render('index');
});

router.post('/', function (req, res) {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email
  };
  addContact(user).then(val => {
    res.render('index', {
      message: '"Vos données ont bien été enregistrées"',
      confirm: true
    })
  }).catch(function (e) {
    result.render('index', {
      message: '"Vos données n\'ont pas été enregistrées"',
      confirm: false
    });
  })
});

module.exports = router;