/**
 * Created by semanticbits on 27/9/16.
 */
var getAllQuestions=function(app,questions){
    /*Get all All questions from db*/
    app.get('/getAllQuestions',function(req,res){
        questions.find(function (err, question) {
            if (err) {
                next(err);
            } else {
                res.send(JSON.stringify(question));
                res.end();
            }
        })
    });

};

module.exports=getAllQuestions;
