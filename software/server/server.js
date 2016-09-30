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
//connecting with DataBase
require('./model/db');
//creating collection
var subjects = require('./model/subjectModel');
var questions=require('./model/questionModel');
var answers=require('./model/answerModel');

app.use(express.static(__dirname + '../../client/app'));

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

require('./routes/addAnswer')(app,answers);
require('./routes/addQuestion')(app,questions);
require('./routes/addSubject')(app,subjects);
require('./routes/getAllTopics')(app,subjects);
require('./routes/getQuestionsById')(app,questions);
require('./routes/updateQuestionsRating')(app,questions);
require('./routes/getAnswersById')(app,answers);
require('./routes/updateAnswerRating')(app,answers);
require('./routes/getAllQuestions')(app,questions);
//starting server
var server = app.listen(3500, 'localhost', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example application listening at http://%s:%s", host, port)

});
