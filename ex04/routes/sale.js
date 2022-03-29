var express = require('express');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
var router = express.Router();

var db=require('../db');
//판매목록
router.get('/list', function(req, res, next) {
  var code=req.query.code;
  var sql=' select *, format(price*quantity,0) sum, ';
      sql+='date_format(sdate, "%Y-%m-%d") fdate ';
      sql+='from tbl_sale '; 
      sql+='where code=? ';
      sql+='order by id desc';
      db.get().query(sql,[code], function(err,rows){
        res.send(rows);
      });
});

//DB에 매출등록
router.post('/insert', function(req,res){
  var code=req.body.code;
  var sdate=req.body.sdate;
  var price=req.body.price;
  var quantity=req.body.quantity;
  // console.log(`${code}\n${sdate}\n${price}\n${quantity}`);
  var sql='insert into tbl_sale(code,sdate,price,quantity) values(?,?,?,?)';
  db.get().query(sql, [code,sdate,price,quantity],function(err,rows){
    res.sendStatus(200);
  });
});

//DB에 매출수정
router.post('/update', function(req,res){
  var id=req.body.id;
  var price=req.body.price;
  var quantity=req.body.quantity;
  console.log(`${id}\n${price}\n${quantity}`);
  var sql='update tbl_sale set price=?,quantity=? where id=?';
  db.get().query(sql, [price, quantity,id],function(err,rows){
    res.sendStatus(200);
  });
});
//DB매출삭제
router.post('/delete', function(req,res){
  var id=req.body.id;
  var sql='delete from tbl_sale where id=?';
  db.get().query(sql, [id],function(err,rows){
    res.sendStatus(200);
  });
});

module.exports = router;
