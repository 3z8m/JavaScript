var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cg', { title: '工場・プロセス' });
});

module.exports = router;
