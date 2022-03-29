var mysql = require('mysql'); 
var conn;
exports.connect=function() {
    conn=mysql.createPool({
        connectionLimit:100, 
        host:'localhost', 
        user:'camp', 
        password:'pass', 
        database:'campdb' 
    });
}

exports.get=function(){
    return conn;
};