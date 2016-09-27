/**
 * Created by semanticbits on 26/9/16.
 */

var gatAllTopics=function(app,subjects){
    /*Get all All todos*/
    app.get('/getAllTopic',function(req,res){
        subjects.find(function (err, subject) {
            if (err) {
                next(err);
            } else {
                console.log(JSON.stringify(subject));
                res.send(JSON.stringify(subject));
                res.end();
            }
        })
    });

};

module.exports=gatAllTopics;
