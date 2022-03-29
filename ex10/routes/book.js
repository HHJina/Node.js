var express = require('express');
var router = express.Router();
var db = require('../db');

/*도서목록*/
router.get('/list', function(req, res, next) {
    var page=req.query.page;
    var start=(page-1)*8;
    var word='%' + req.query.word + '%';

    var sql='select count(*) total from tbl_book where title like ?';
    db.get().query(sql, [word], function(err, rows){
        var total=rows[0].total;
        var sql='select *,format(price,0) fprice from tbl_book where title like ? order by code desc limit ?,8';
        db.get().query(sql, [word, start], function(err, rows){
            res.send({rows:rows, total:total});
        });
    });
});

//상품정보 페이지 이동
router.get('/read',function(req,res){
    var code=req.query.code;
    var sql='select *, format(price,0) fprice from tbl_book where code=?';
    db.get().query(sql,[code], function(err,rows){
        var vo=rows[0];
        res.render('index', {pagename:'read.ejs', vo:vo, userid:req.session.userid});
    });
  });


module.exports = router;