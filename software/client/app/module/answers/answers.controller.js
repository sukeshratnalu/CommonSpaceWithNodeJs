/**
 * Created by semanticbits on 27/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .controller('answerController',answerController);
    answerController.$inject=['$stateParams','answerService'];
    function answerController($stateParams,answerService){
        var am=this;
        am.QuestionId=$stateParams.id;
        am.getAnswersByQid=getAnswersByQid;
        function getAnswersByQid(){
            answerService.readanswersById(am.QuestionId).then(function(response) {
                // This is set when the promise is resolved.
                am.answers=response;
            });
        }
    }
}());
