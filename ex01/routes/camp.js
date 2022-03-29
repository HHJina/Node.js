var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('camp', { title: '캠핑장 관리' });
});

//캠핑장목록
router.get('/list', function(req, res){
  let data ='[';
  data +='{"id":1,"name":"솔밭캠핑장","address":"인천 서구 경서동"},';
  data +='{"id":2,"name":"다람쥐캠핑장","address":"인천 남구 학익동"},';
  data +='{"id":3,"name":"도토리캠핑장","address":"인천 부평구 삼산동"}';
  data +=']';
  res.send(data)
});
module.exports = router;