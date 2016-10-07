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

            questionService.readQuestions(qm.topicId).then(readQuestionByTopicIdSuccess).catch(readQuestionByTopicIdFail);
            function readQuestionByTopicIdSuccess(response){
                qm.questions=response;
            }
            function readQuestionByTopicIdFail(error){
                console.log(error);
            }

        }
        qm.getQuestionByTopic();
        //functionn for updating question rating
        function updateQRating(_id,rate){
            questionService.updateQuestionRate(_id,rate).then(updateQuestionRatingSuccess).catch(updateQuestionRatingFail);
            function updateQuestionRatingSuccess(response){
                qm.getQuestionByTopic();
            }
            function updateQuestionRatingFail(error){
                console.log(error);
            }
        }

    }
}());
