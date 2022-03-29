var express = require('express');
var router = express.Router();
var db=require('../db');

/* 상품목록 JSON데이터 */
router.get('/list', function(req, res, next) {
    var page=req.query.page; 
    var start=(page-1)*4;
  
    //전체데이타갯수
    var sql='select count(*) total from tbl_product';
    db.get().query(sql, function(err, rows){
      var total=rows[0].total;
  
      sql=`select *,format(price,0) fprice from tbl_product order by code desc limit ${start},4`;
      db.get().query(sql, function(err, rows){
          res.send({rows:rows, total:total});
      });
    });
  });
//상품등록페이지 이동
router.get('/insert', function(req,res){
    var sql="select max(code) mcode from tbl_product";
    db.get().query(sql, function(err, rows){
        var mcode=rows[0].mcode;
        var code='P'+ (parseInt(mcode.substring(1))+1);
        res.render('index',{title:'상품등록',code:code,
                             pagename:'insert.ejs'});
    });
    
});

//파일업로드
var multer=require('multer');
var path='./public/upload';
var upload=multer({
    storage:multer.diskStorage({
        destination:(req, res, done)=>{
            done(null,path);
        },
        filename:(req, file, done)=>{
            done(null, Date.now()+ '_'+file.originalname);
        }
    })
});

//DB에 상품등록
router.post('/insert',upload.single('image'), function(req, res){
    var code=req.body.code;
    var price=req.body.price;
    var name=req.body.name;
    var image=req.file.filename; //업로드된 파일이름
    var sql='insert into tbl_product(code,price,name,image) value(?,?,?,?)';
    db.get().query(sql, [code,price,name,image], function(err,rows){
        res.redirect('/');
    });
});

//상품정보 페이지 이동
router.get('/read' ,function(req,res){
    var code=req.query.code;
    var sql='select * from tbl_product where code=?';
    db.get().query(sql, [code],function(err,rows){
        res.render('index',{title:'상품정보',vo:rows[0],
                                    pagename:'read.ejs'})
    });
});
//DB에 상품정보 수정하기
var fs=require('fs'); //파일삭제 함수
router.post('/update' ,upload.single('image'), function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var code=req.body.code;
    var image=req.body.oldimage;
    if(req.file!=null){ //이미지가 바뀌었을때
        
        image=req.file.filename; 
        if(req.body.oldimage!=''){
            fs.unlink(path + '/' + req.body.oldimage, function(err){
                if(err) throw err;
            });
        }
    }
    var sql='update tbl_product set name=?,price=?,image=? where code=?';
    db.get().query(sql,[name,price,image,code], function(err,rows){
        res.redirect('/')
    });
});
//DB 상품정보 삭제
router.get('/delete', function(req, res){
    var code=req.query.code;
    var image=req.query.image;
    console.log('.........' + image);
    var sql='delete from tbl_product where code=?';
    db.get().query(sql, [code], function(err, rows){
        //기존이미지가 있으면 삭제
        if(image!=''){
            fs.unlink(path + '/' + image, function(err){
                if(err) throw err;
            });
        }
        res.redirect('/');
    });
});
module.exports = router;
