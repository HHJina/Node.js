var mysql = require('mysql'); 
var conn;

exports.connect=function() {
    conn=mysql.createPool({
        connectionLimit:100, 
        host:'localhost', 
        user:'app', 
        password:'pass', 
        database:'appdb' 
    });
}

exports.get=function(){
    return conn;
};