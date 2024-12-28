var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cg/p5_rolling', { title: '形状制御' });
});

module.exports = router;