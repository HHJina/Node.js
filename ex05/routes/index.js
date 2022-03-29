var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '캠핑장관리', pagename:'list.ejs' });
});

module.exports = router;
