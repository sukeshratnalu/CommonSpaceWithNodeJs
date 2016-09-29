/**
 * Created by semanticbits on 21/9/16.
 */
var addQuestion=function(app,question){
    app.post('/addQuestion', function(req, res) {
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

    });
};
module.exports=addQuestion;
