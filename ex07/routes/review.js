var express = require('express');
var router = express.Router();
var db=require('../db')

/* 리뷰페이지 */
router.get('/list', function(req, res, next) {
  var code=req.query.code;
  var sql='select *, date_format(date,"%Y-%m-%d") fdate from tbl_review where code=? order by id desc';
  db.get().query(sql, [code], function(err,rows){
    res.send(rows);
  });
});
//DB에서 리뷰등록
router.post('/insert', function(req,res){
    var code=req.body.code;
    var uid=req.body.uid;
    var text=req.body.text;
    var sql='insert into tbl_review(code,uid,text) values(?,?,?)';
    db.get().query(sql, [code,uid,text], function(err,rows){
        res.sendStatus(200);
    });
});

//DB에 리뷰삭제
router.get('/delete', function(req, res){
    var id=req.query.id;
    var sql='delete from tbl_review where id=?';
    db.get().query(sql, [id], function(err,rows){
        res.sendStatus(200);
    });
});
module.exports = router;
