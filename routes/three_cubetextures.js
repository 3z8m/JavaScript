var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cg/three_cubetextures', { title: '背景' });
});

module.exports = router;
