/**
 * Created by semanticbits on 27/9/16.
 */
var updateAnswerRating=function(app,answers){
/*updating answer rating*/
    app.put('/updateAnswerRating',function(req,res){
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

    });
};
module.exports=updateAnswerRating;
