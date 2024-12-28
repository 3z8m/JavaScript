var express = require('express');
var router = express.Router();

// ログインのチェック
function check(req, res) {
  if (req.session.login == null) {
      req.session.back = '/three_steelcode'
      res.redirect('/users/login');
      return true;
  }
  else {
      return false;
  };
};

/* GET home page. */
router.get('/', function(req, res, next) {
  //if (check(req, res)) { return };                  // check関数を実行
  res.render('cg/three_steelcode', { title: '鋼種' });
});

module.exports = router;
