var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cg/three_fps', { title: '金属箔工場' });
});

module.exports = router;
