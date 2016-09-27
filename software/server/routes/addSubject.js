/**
 * Created by semanticbits on 21/9/16.
 */
var addSubject=function(app,subject){

    // create todo and send back all todos after creation
    app.post('/addTopic', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        subject.create({
            topicName:req.body.name,
            done : false
        }, function(err, subjects) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            subject.find({topicName:req.body.name},function(err,data){


                console.log(data+"single recored");
                if(err){
                    console.log(err);
                }
                else {
                    console.log(data);
                    res.send(data);
                }
            });
        });

    });
};
module.exports=addSubject;
