/**
 * Created by semanticbits on 6/9/16.
 */
(function(){
    angular.module('CommonSpace.question')
        .controller('questionController',questionController);
    questionController.$inject=['$stateParams','questionService','$rootScope'];
    function questionController($stateParams,questionService,$rootScope){

        var qm=this;
        qm.topicId=$stateParams.id;
        qm.topicName=$stateParams.name;

        qm.getQuestionByTopic=getQuestionByTopic;
        qm.updateQRating=updateQRating;
        //function for getting questions from question service by topic id
        function getQuestionByTopic(){
            questionService.readQuestions(qm.topicId).then(function(response) {

                // This is set when the promise is resolved.
                qm.questions=response;
            });

        }
        qm.getQuestionByTopic();
        //functionn for updating question rating
        function updateQRating(_id,rate){
            questionService.updateQuestionRate(_id,rate).then(function(response){
                qm.getQuestionByTopic();
            });
        }

    }
}());
