var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cg/three_hikariworks', { title: '製鉄所' });
});

module.exports = router;
