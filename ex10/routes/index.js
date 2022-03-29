var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { pagename:'list.ejs',userid:req.session.userid});
});

module.exports = router;