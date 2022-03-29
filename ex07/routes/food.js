var express = require('express');
var router = express.Router();

var db=require('../db');

/* 상품목록 */
router.get('/list', function(req, res, next) {
    var page=req.query.page;
    var start=(page-1)*4;
    var sql='select count(*) total from tbl_food'; //전체데이터갯수
    db.get().query(sql, function(err, rows){
        var total=rows[0].total;
        sql='select *,format(price,0) fprice from tbl_food order by code desc limit ?,4';
        db.get().query(sql,[start],function(err, rows){
        res.send({rows:rows, total:total});
    });
  });
});


// 상품등록페이지
router.get('/insert', function(req,res){
    res.render('index', {title:'상품등록', pageName:'insert.ejs'});
});

//파일업로드
var multer=require('multer');
var path='./public/images';
var upload=multer({
    storage:multer.diskStorage({
        destination:(req, file, done)=>{
            done(null, path);
        },
        filename:(req, file, done)=>{
            done(null, Date.now() + "_" + file.originalname);
        }
    })
});

//DB에 상품등록
router.post('/insert', upload.single('image'),function(req,res){
    var title=req.body.title;
    var price=req.body.price;
    var image='/images/' + req.file.filename;
    var sql='insert into tbl_food(title,price,image) values(?,?,?)';
    db.get().query(sql, [title,price,image], function(err,rows){
        res.redirect('/');
    })
});


//상품정보페이지
router.get('/read', function(req,res){
    var code=req.query.code;
    var sql='select * from tbl_food where code=?';
    db.get().query(sql, [code] , function(err,rows){
        var vo=rows[0];
        res.render('index', {title:'상품정보',vo:vo, pageName:'read.ejs'});
    })
});

//
var fs=require('fs');

//상품정보수정
router.post('/update', upload.single('image'), function(req,res){
    var code=req.body.code;
    var title=req.body.title;
    var price=req.body.price;
    var image=req.body.oldImage;
    
    if(req.file!=null){ //새로운이미지가 등록된경우
        fs.unlink('./public' + image, function(err){
            if(err) throw err;
        });
        image='/images/' + req.file.filename;
    }
    var sql='update tbl_food set title=?, price=?, image=? where code=?';
    db.get().query(sql,[title,price,image,code],function(err,rows){
        res.redirect('/');
    })
});
//DB에서 상품정보 삭제
router.get('/delete',function(req,res){
    var code=req.query.code;
    var image=req.query.image;
    if(image!=''){
        fs.unlink('./public' + image, function(err){
            if(err) throw err;
        });
    }
    var sql='delete from tbl_food where code=?';
    db.get().query(sql,[code], function(err,rows){
        res.redirect('/');
    })
});
module.exports = router;