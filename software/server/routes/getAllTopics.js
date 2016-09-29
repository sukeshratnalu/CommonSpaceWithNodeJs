/**
 * Created by semanticbits on 26/9/16.
 */
var gatAllTopics=function(app,subjects){
    /*Get all All topics from db*/
    app.get('/getAllTopic',function(req,res){
        subjects.find(function (err, subject) {
            if (err) {
                next(err);
            } else {
                res.send(JSON.stringify(subject));
                res.end();
            }
        })
    });

};

module.exports=gatAllTopics;
