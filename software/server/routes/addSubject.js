/**
 * Created by semanticbits on 21/9/16.
 */
var addSubject=function(app,subject){
    app.post('/addTopic', function(req, res) {
        subject.create({
            topicName:req.body.name,
            done : false
        }, function(err, subjects) {
            if (err)
                res.send(err);
            subject.find({topicName:req.body.name},function(err,data){
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
module.exports=addSubject;
