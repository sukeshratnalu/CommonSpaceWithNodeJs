/**
 * Created by semanticbits on 26/9/16.
 */
var getQuestionById=function(app,questions){
    /*Get all All questions by id*/
    app.post('/getQuestion',function(req,res){
        questions.find({t_id:req.body.id},function (err, question) {
            if (err) {
                next(err);
            } else {
                res.send(JSON.stringify(question));
                res.end();
            }
        })
    });

};

module.exports=getQuestionById;
