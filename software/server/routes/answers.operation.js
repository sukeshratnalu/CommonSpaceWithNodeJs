/**
 * Created by semanticbits on 5/10/16.
 */
var answers=require('../model/answerModel');
var answer={
    /*inserting answer to collection*/
    insertAnswer:function(req,res){
        answers.create({
            Q_id:req.body.questionId,
            answer:req.body.form_answer,
            author:req.body.form_author,
            rate:req.body.form_rate,
            answeredDate:req.body.form_answerDate,
            done : false
        }, function(err, answer) {
            if (err)
                res.send(err);
            answers.find(function(err, answer) {
                if (err)
                    res.send(err);
                res.json(answer);
            });
        });
    },
    /*getting answers from collection by using question id*/
    getAnswersByTopicId:function(req,res){
        answers.find({Q_id:req.body.id},function (err, answer) {
            if (err) {
                next(err);
            } else {
                res.send(JSON.stringify(answer));
                res.end();
            }
        })
    },
    /*updating answer rating by id*/
    updateAnswerRating:function(req,res){
        answers.update(
            { _id: req.body.a_id },
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
    },
    /*delete answer by question id*/
    deleteAnswerByQuestionId:function(req, res) {

        console.log('delete answer operation');
        console.log(req.body.questionId);

        answers.remove(
            {
                Q_id : req.body.questionId
            },
            function(err, todo) {
            if (err)
                res.send(err);
                answers.find(function(err, data) {
                if (err)
                    res.send(err);
                res.json(data);
            });
        });
    }
};
module.exports=answer;
