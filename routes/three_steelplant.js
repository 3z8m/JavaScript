var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cg/three_steelplant', { title: '製鋼' });
});

module.exports = router;
