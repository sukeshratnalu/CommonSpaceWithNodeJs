/**
 * Created by semanticbits on 3/10/16.
 */

var topics=require('../routes/topics.operation');
var questions=require('../routes/questions.operation');
var answers=require('../routes/answers.operation');
var allOperation=function(app){

    app.post('/topic/add',topics.insertTopics);
    app.get('/topic/listTopic',topics.getTopics);
    app.post('/questions/add',questions.insertQuestion);
    app.post('/question/listById',questions.getQuestionsByTopicId);
    app.get('/question/listQuestions',questions.getQuestions);
    app.put('/question/updateRating',questions.updateQuestionRating);
    app.post('/answer/add',answers.insertAnswer);
    app.post('/answer/listById',answers.getAnswersByTopicId);
    app.put('/answer/updateRating',answers.updateAnswerRating);
    app.delete('/answer/deleteAnswer',answers.deleteAnswerByQuestionId)
};
module.exports=allOperation;
