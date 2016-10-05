/**
 * Created by semanticbits on 21/9/16.
 */
var express = require('express');
var path=require('path');
var app = express();
var fs = require("fs");
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var jwt        = require("jsonwebtoken");
//connecting with DataBase
require('./model/db');

var User     = require('./model/userModel');

app.use(express.static(__dirname + '/../client/app'));
/*app.get('*', function(req, res) {
    res.sendFile(__dirname + '../../client/app/index.html');
});*/


app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
app.get('/me', ensureAuthorized, function(req, res) {
    User.findOne({token: req.token}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

process.on('uncaughtException', function(err) {
    console.log(err);
});
//injecting mai route for all operations
require('./routes/mainRoute')(app);

require('./routes/user/user.authenticate')(app,User);
require('./routes/user/user.signin')(app,User,jwt);


//starting server
var server = app.listen(3500, 'localhost', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example application listening at http://%s:%s", host, port)

});
