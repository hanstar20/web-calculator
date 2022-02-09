var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('reference', { title: '웹 계산기' });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
