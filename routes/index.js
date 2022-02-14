var m_calc = require('../module/m_calculator');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('calculator', { title: '웹 계산기' });
});

router.post('/api/calc', (req, res) => {
  try {
    console.log('req', req.body);
    m_calc
      .calc(req, res, function (result) {
        console.log('r_calc result', result);
        res.send(result);
      })
      .then();
  } catch (e) {
    //예외처리
  }
});

module.exports = router;
