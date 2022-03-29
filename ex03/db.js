var mysql = require('mysql'); 
var conn;
exports.connect=function() {
    conn=mysql.createPool({
        connectionLimit:100, 
        host:'localhost', 
        user:'web1', 
        password:'pass', 
        database:'webdb1' 
    });
}

exports.get=function(){
    return conn;
};