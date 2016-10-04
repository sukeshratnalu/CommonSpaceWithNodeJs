/**
 * Created by semanticbits on 3/10/16.
 */
var express = require('express');
var app = express();
//connecting with DataBase
require('../model/db');
//creating collection
var subjects = require('../model/subjectModel');
var questions=require('../model/questionModel');
var answers=require('../model/answerModel');

    console.log('I m in main Route');
    require('../routes/addAnswer')(app,answers);
    require('../routes/addQuestion')(app,questions);
    require('../routes/addSubject')(app,subjects);
    require('../routes/getAllTopics')(app,subjects);
    require('../routes/getQuestionsById')(app,questions);
    require('../routes/updateQuestionsRating')(app,questions);
    require('../routes/getAnswersById')(app,answers);
    require('../routes/updateAnswerRating')(app,answers);
    require('../routes/getAllQuestions')(app,questions);

