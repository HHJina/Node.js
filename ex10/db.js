var mysql = require('mysql'); 
var conn;
exports.connect=function() {
    conn=mysql.createPool({
        connectionLimit:100, 
        host:'localhost', 
        user:'book', 
        password:'pass', 
        database:'bookdb' 
    });
}

exports.get=function(){
    return conn;
};