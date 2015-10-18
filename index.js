var http = require('http');
var express = require('express');
var connect = require('connect');
var serveStatic = require('serve-static');
var bodyParser = require("body-parser");
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

connect().use(serveStatic('views')).listen(80);

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

function LoginRequest(res,query) {

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 101, "status" : "Unable to connect to database", "message" : "The system is currently offline."});
            return;
        }

        connection.query(query,function(err,rows){
            if(typeof rows === 'undefined') {
                res.json({"code" : 102, "status" : err.message, "message" : "Invalid Username/Password Combination."});
                return;
            }
            connection.release();
            if(!err) {
                if(rows.length == 1) {
                    var token = jwt.sign(rows, 'supersecret', { expiresIn: 60*5 });
                    res.json({"code" : 100, "status" : "Successful Login", "message" : "Success", "token" : token});
                }else if(rows.length == 0){
                    res.json({"code" : 102, "status" : "User not found", "message" : "Invalid Username/Password Combination."});
                }else{
                    res.json({"code" : 104, "status" : "Multiple names found", "message" : "Your account has been compromised."});
                }

                return;
            }
            return;
        });

        connection.on('error', function(err) {
            res.json({"code" : 103, "status" : "Database Connection Error", "message" : "An unexpected error has occurred.  If this problem persists, please contact us."});
            return;
        });
    });
}

function GetEmployeeList(res,query) {

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 101, "status" : "Unable to connect to database", "message" : "The system is currently offline."});
            return;
        }

        connection.query(query,function(err,rows){
            if(typeof rows === 'undefined') {
                res.json({"code" : 102, "status" : err.message, "message" : "No Employee entries found."});
                return;
            }

            res.json(rows);
            connection.release();
            return;
        });

        connection.on('error', function(err) {
            res.json({"code" : 103, "status" : "Database Connection Error", "message" : "An unexpected error has occurred.  If this problem persists, please contact us."});
            return;
        });
    });
}

app.use('/api', expressJwt({secret: 'supersecret'}));
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.get("/api/employeeList",function(req,res) {
    var query = "select * from employees";
    GetEmployeeList(res,query);
});

app.post("/login", function(req,res) {
    var query = "SELECT * from USERS where username='" + req.body.username + "' and password='" + req.body.password + "' and active=1";
    LoginRequest(res,query);
});

app.listen(3000);