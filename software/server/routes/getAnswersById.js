/**
 * Created by semanticbits on 27/9/16.
 */
var getAnswersById=function(app,answers){
    /*Get all All todos*/
    app.post('/getAnswer',function(req,res){
        console.log('VVVVVVVVVVVVVVVVVVVV');
        console.log(req.body);
        answers.find({t_id:req.body.id},function (err, answer) {
            if (err) {
                next(err);
            } else {
                console.log(JSON.stringify(answer));
                res.send(JSON.stringify(answer));
                res.end();
            }
        })
    });

};

module.exports=getAnswersById;
