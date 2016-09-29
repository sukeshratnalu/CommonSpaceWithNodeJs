/**
 * Created by semanticbits on 7/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .service('questionService',questionService);
    questionService.$inject=['$rootScope','$q','api','$timeout'];
    function questionService($rootScope,$q,api,$timeout){
        var service={
            readAllQuestions:readAllQuestions,
            readQuestions:readQuestions,
            updateQuestionRate:updateQuestionRate
        };
        //function for reading questions By id from server
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
        //function for sending request to server for updating question rating
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
        //function for getting all questions from server
        function readAllQuestions(){
            var deferred = $q.defer();

            api.getAllQuestions().$promise.then(getAllQuestionsComplete).catch(getAllQuestionsFailed);

            function getAllQuestionsComplete(response) {

                deferred.resolve(response);
            }

            function getAllQuestionsFailed(error) {
                deferred.reject(error)
            }

            return deferred.promise;
        }

        return service;
    }
}());
