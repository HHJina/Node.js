var express = require('express');
var router = express.Router();
var db = require("../db");

/* 게시판 목록. */
router.get('/list', function(req, res, next) {
    var order=req.query.order;
    var word='%'+ req.query.word + '%';
    var sql=`select * from bbs where title like ? or contents like ? order by ${order}`;
    db.get().query(sql,[word, word] ,function(err, rows){
        res.send(rows);
    });
});

//게시판읽기
router.get('/read', function(req,res){
    var id=req.query.id;
    var sql='select * from bbs where id=?';
    db.get().query(sql, [id], function(err,rows){
        res.send(rows[0]);
    });
});

//게시글쓰기
router.post('/insert', function(req,res){
    var title=req.body.title;
    var contents=req.body.contents;
    var sql='insert into bbs(title,contents) values(?,?)';
    db.get().query(sql, [title, contents] ,function(err, rows){
        res.sendStatus(200);
    });
});

//게시물삭제
router.get('/delete', function(req,res){
    var id=req.query.id;
    var sql="delete from bbs where id=?";
    db.get().query(sql, [id], function(err,rows){
       return res.sendStatus(200);
    });
});

//게시글수정
router.post('/update', function(req,res){
    var id=req.body.id;
    var title=req.body.title;
    var contents=req.body.contents;
    var sql="update bbs set title=?, contents=?, date=now() where id=?";
    db.get().query(sql, [title,contents,id], function(err,rows){
        return res.sendStatus(200)
    });
});
module.exports = router;