var mysql = require('mysql'); 
var conn;
exports.connect=function() {
    conn=mysql.createPool({
        connectionLimit:100, 
        host:'localhost', 
        user:'shop', 
        password:'pass', 
        database:'shopdb' 
    });
}

exports.get=function(){
    return conn;
};