/**
 * Created by semanticbits on 7/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .service('questionService',questionService);
    questionService.$inject=['$rootScope','$q','api','$timeout'];
    function questionService($rootScope,$q,api,$timeout){
        var service={
            readQuestions:readQuestions,
            updateQuestionRate:updateQuestionRate
        };
        function readQuestions(topicId){
            var deferred = $q.defer();
            var topic={
                id:topicId
            };
            api.getQuestions(topic).$promise.then(getQuestionsComplete).catch(getQuestionsFailed);
            function getQuestionsComplete(response) {
                deferred.resolve(response);
            }
            function getQuestionsFailed(error) {
                deferred.reject(error)
            }
            return deferred.promise;
        }
        function updateQuestionRate(_id,rate){
            var question={
                Q_id:_id,
                rating:rate
            };
            var deferred = $q.defer();

                api.updateQuestionRating(question).$promise.then(updateQuestionComplete).catch(updateQuestionFailed);

                function updateQuestionComplete(response) {

                    deferred.resolve(response);
                }

                function updateQuestionFailed(error) {
                    deferred.reject(error)
                }

            return deferred.promise;
        }

        return service;
    }
}());
