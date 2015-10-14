var http = require('http');
var express = require('express');
var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic('views')).listen(8080);

var app = express();

var mysql = require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'singlepage',
    debug    :  false
});

function handle_database(res,query) {

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        connection.query(query,function(err,rows){
            if(typeof rows === 'undefined') {
                res.json({"code" : 204, "status" : err.message});
                return;
            }
            connection.release();
            if(!err) {
                console.log('no error');
                console.log(res);
                res.json(rows);
                return;
            }
            return;
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

app.get("/employeeList",function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var query = "select * from employees";
    handle_database(res,query);
});

app.get("/login", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    var url = require('url');
    var url_parts = url.parse(req.url, true);

    var query = "SELECT * from USERS where username=" + url_parts.query.username + " and password=" + url_parts.query.password;
    handle_database(res,query);
});

app.listen(3000);