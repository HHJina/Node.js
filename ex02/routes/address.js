var express = require('express');
const { route } = require('.');
var router = express.Router();

var db=require('../db')

/* 주소목록 데이터 출력. */
router.get('/', function(req, res, next) {
    var sql="select * from tbl_address "
    db.get().query(sql,function(err,rows){
        res.send(rows); //데이타출력
    });
    
});

//주소등록화면
router.get('/insert', function (req,res){
    res.render('insert', {"title": "주소등록"})//뷰화면출력
});

//주소DB저장
router.post('/insert', function(req, res){
    var name=req.body.name;
    var tel=req.body.tel;
    var address=req.body.address;
    var sql="insert into tbl_address(name,tel,address) values(?,?,?)";
    db.get().query(sql, [name,tel,address], function(err,result){
        res.redirect('/');
    });
    console.log(`${name}-${tel}-${address}`);
});

//특정아이디 주소 읽기
router.get("/read" , function(req,res){
    var id=req.query.id;
    var sql="select * from tbl_address where id=?";
    db.get().query(sql, [id],function(err,rows){
        res.render('read',{"title":"주소 정보","vo":rows[0]});
    });
});

//특정 아이디 수정하기
router.post('/update', function(req,res){
    var id=req.body.id;
    var name=req.body.name;
    var tel=req.body.tel;
    var address=req.body.address;
    var sql="update tbl_address set name=?,tel=?,address=? where id=?";
    
    db.get().query(sql,[name,tel,address,id],function(err,result){
        res.redirect('/'); //목록으로 이동
    });

});

//특정 아이디를 DB에서 삭제하기
router.post('/delete', function(req,res){
    var id=req.body.id;
    var sql="delete from tbl_address where id=?";
    db.get().query(sql, [id], function(err,result){
        res.redirect('/');
    });
});

//특정학생의 성적목록
router.get('/score', function(req,res){
    var id=req.query.id;
    // var sql='select * from tbl_score where id=? order by sdate desc';
    var sql='select id,date_format(sdate, "%Y-%m-%d") fdate,kor,eng,mat,(kor+eng+mat) tot,(kor+eng+mat)/3 avg from tbl_score where id=? order by sdate desc'
    db.get().query(sql , [id], function(err,rows){
        res.send(rows);
    });
});
module.exports = router;
