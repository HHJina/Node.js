var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('score', { title: '성적관리' });
});

module.exports = router;