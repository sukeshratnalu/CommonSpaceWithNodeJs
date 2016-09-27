/**
 * Created by semanticbits on 21/9/16.
 */
var addQuestion=function(app,question){

    // create todo and send back all todos after creation
    app.post('/addQuestion', function(req, res) {
        console.log('I m in addquestion server');
         console.log(req.body);
        // create a todo, information comes from AJAX request from Angular
        question.create({
            t_id:req.body.form_topicId,
            question:req.body.form_question,
            rate:req.body.form_rate,
            done : false
        }, function(err, questions) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            question.find({question:req.body.form_question},function(err,data){


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
module.exports=addQuestion;
