/**
 * Created by semanticbits on 21/9/16.
 */
var addAnswer=function(app,answer){

    // create todo and send back all todos after creation
    app.post('/addAnswer', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        console.log(req.body);
        answer.create({
            Q_id:req.body.questionId,
            answer:req.body.form_answer,
            author:req.body.form_author,
            rate:req.body.form_rate,
            answeredDate:req.body.form_answerDate,
            done : false
        }, function(err, answers) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            answer.find(function(err, answers) {
                if (err)
                    res.send(err);
                res.json(answers);
            });
        });

    });
};
module.exports=addAnswer;
