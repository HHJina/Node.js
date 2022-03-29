var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('address', { title: '주소관리 프로그램' });
});


//주소목록
router.get('/list', function (req, res) {
  let data = '[';
  data += '{"id":1, "name":"홍길동", "tel":"010-1010-1010", "address":"인천"},';
  data += '{"id":2, "name":"심청이", "tel":"010-2020-2020", "address":"서울"},';
  data += '{"id":3, "name":"강감찬", "tel":"010-3030-3030", "address":"부산"}';
  data += ']';
  res.send(data);
});
module.exports = router;
