/**
 * Created by semanticbits on 27/9/16.
 */
(function(){
    angular.module('CommonSpace.answer')
        .controller('answerController',answerController);
    answerController.$inject=['$stateParams','answerService'];
    function answerController($stateParams,answerService){
        var am=this;
        am.QuestionId=$stateParams.id;
        am.topicName=$stateParams.name;
        am.topicQuestion=$stateParams.question;
        am.getAnswersByQid=getAnswersByQid;
        am.updateAnsRating=updateAnsRating;
        function getAnswersByQid(){
            answerService.readanswersById(am.QuestionId).then(function(response) {
                // This is set when the promise is resolved.
                am.answers=response;

            });
        }
        am.getAnswersByQid();
        function updateAnsRating(id,rate){
            answerService.updateAnswerRate(id,rate).then(function(response){
                am.getAnswersByQid();
            });
        }

    }
}());
