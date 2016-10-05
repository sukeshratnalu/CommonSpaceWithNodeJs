/**
 * Created by semanticbits on 5/10/16.
 */
var question=require('../model/questionModel');
var questions={
    insertQuestion:function(req,res){

        question.create({
            t_id:req.body.form_topicId,
            question:req.body.form_question,
            rate:req.body.form_rate,
            done : false
        }, function(err, questions) {
            if (err)
                res.send(err);
            question.find({question:req.body.form_question},function(err,data){
                if(err){
                    console.log(err);
                }
                else {
                    res.send(data);
                }
            });
        });
    },
    getQuestions:function(req,res){
        question.find(function (err, questions) {
            if (err) {
                next(err);
            } else {
                res.send(JSON.stringify(questions));
                res.end();
            }
        })
    },
    getQuestionsByTopicId:function(req,res){
        question.find({t_id:req.body.id},function (err, questions) {
            if (err) {
                next(err);
            } else {
                res.send(JSON.stringify(questions));
                res.end();
            }
        })
    },
    updateQuestionRating:function(req,res){
        question.update(
            { _id: req.body.Q_id },
            {
                rate : req.body.rating
            },
            { upsert: true },function(err,data){
                if(err){
                    console.log(err);
                }
                else {
                    console.log(data);
                    res.send(data);
                }
            }
        )
    }
};
module.exports=questions;
