/**
 * Created by semanticbits on 27/9/16.
 */
var getAnswersById=function(app,answers){
    /*Get all All answers by id*/
    app.post('/getAnswer',function(req,res){
        answers.find({Q_id:req.body.id},function (err, answer) {
            if (err) {
                next(err);
            } else {
                res.send(JSON.stringify(answer));
                res.end();
            }
        })
    });

};

module.exports=getAnswersById;
