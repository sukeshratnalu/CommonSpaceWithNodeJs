/**
 * Created by semanticbits on 6/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .controller('questionController',questionController);
    questionController.$inject=['$stateParams','questionService'];
    function questionController($stateParams,questionService){

        var qm=this;
        qm.topicId=$stateParams.id;
        qm.getQuestionByTopic=getQuestionByTopic;
        qm.updateQRating=updateQRating;
        function getQuestionByTopic(){
            questionService.readQuestions(qm.topicId).then(function(response) {
                // This is set when the promise is resolved.
                qm.questions=response;
            });

        }
        qm.getQuestionByTopic();
        function updateQRating(_id,rate){
            questionService.updateQuestionRate(_id,rate).then(function(response){
                qm.getQuestionByTopic();
            });


        }
    }
}());
