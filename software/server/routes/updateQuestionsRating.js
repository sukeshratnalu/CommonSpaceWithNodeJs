/**
 * Created by semanticbits on 26/9/16.
 */
var updateQuestionRating=function(app,questions){
    //edit a todo
    app.put('/updateQuestionRating',function(req,res){
        console.log('server in update');
        console.log(req.body);
        questions.update(
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

    });
};
module.exports=updateQuestionRating;
