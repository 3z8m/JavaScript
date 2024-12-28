var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cg/three_move', { title: '工場見学' });
});

module.exports = router;
