const express = require('express');
const router = express.Router();

router.get('/', function (req, result, next) {
  result.render('admin');
});

router.post('/', function (req, res) {
  const isAdmin = req.body.firstname === "Nicolas";
  res.render('admin', {
    messageAdmin: isAdmin ? 'Bonjour ' + req.body.firstname : 'erreur',
    confirmlog: isAdmin 
  });
});

module.exports = router;