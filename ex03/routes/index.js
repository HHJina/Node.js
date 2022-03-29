var express = require('express');
var router = express.Router();

/* 주소목록화면 출력 */
router.get('/', function(req, res, next) {
  res.render('index', { title: '주소목록',pageName:'address_list.ejs' });
});

module.exports = router;
