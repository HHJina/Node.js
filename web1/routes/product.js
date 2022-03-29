var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
var db = require('../db');

/* 상품목록 */
router.get('/list', function(req, res, next) {
  var sql="select * from product order by id desc";
  db.get().query(sql,function(err, rows){
    res.send(rows);
  });
});

//상품정보
router.get('/read', function(req,res){
    var id=req.query.id;
    var sql='select * from product where id=?'
    db.get().query(sql,[id],function(err,rows){
        res.send(rows[0]);
    });
});


//상품등록 페이지
router.get('/insert', function(req,res){
    res.render('insert')
});


//이미지 업로드
var multer = require('multer');
var upload = multer({
    storage:multer.diskStorage({
        destination:(req, file, done)=>{
            done(null, './public/images')
        },
        filename:(req, file, done) => {
            done(null, Date.now()+'_'+file.originalname);
        }
    })
});


//상품등록
router.post('/insert',upload.single('image'), function(req,res){
    var name=req.body.name;
    var price=req.body.price;
    var image='';
    if(req.file !=null) image=req.file.filename;
    console.log(`name:${name}\nprice:${price}\nimage:${image}`)
    var sql='insert into product(name,price,image) values(?,?,?)';
    db.get().query(sql, [name,price,image], function(err,rows){
        res.sendStatus(200);
    });
});



module.exports = router;
