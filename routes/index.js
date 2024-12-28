var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { 
      title: 'NSCM',
      massage: "Metal Foil Mill"
    });
});

module.exports = router;
