/**
 * Created by semanticbits on 5/10/16.
 */
var Topics = require('../model/subjectModel');
var topics={
    /*inserting topics to collection*/
    insertTopics:function(req,res){

        Topics.create({
            topicName:req.body.name,
            done : false
        }, function(err, subjects) {
            if (err)
                res.send(err);
            Topics.find({topicName:req.body.name},function(err,data){
                if(err){
                    console.log(err);
                }
                else {
                    res.send(data);
                }
            });
        });
    },
    /*list topics from collection*/
    getTopics:function(req,res){
        Topics.find(function (err, subject) {
            if (err) {
                next(err);
            } else {
                res.send(JSON.stringify(subject));
                res.end();
            }
        })
    },
    /*delete topic by id*/
    deleteTopicById:function(req,res) {
        Topics.remove(
            {
                _id: req.body.id
            },
            function (err, data) {
                if (err)
                    res.send(err);


                Topics.find(function (err, data) {
                    if (err)
                        res.send(err);
                    res.json(data);
                });
            });
    }
};
module.exports=topics;
