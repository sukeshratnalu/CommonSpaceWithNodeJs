/**
 * Created by semanticbits on 27/9/16.
 */
(function(){
    angular.module('CommonSpace.answer')
        .service('answerService',answerService);
    answerService.$inject=['$q','api','$timeout'];
    function answerService($q,api,$timeout){
        var service={
            readanswersById:readanswersById,
            updateAnswerRate:updateAnswerRate
        };
        function readanswersById(Qid){
            var deferred = $q.defer();
            var question={
                id:Qid
            };
            api.getAnswers(question).$promise.then(getanswersComplete).catch(getanswersFailed);
            function getanswersComplete(response) {
                deferred.resolve(response);
            }
            function getanswersFailed(error) {
                deferred.reject(error)
            }
            return deferred.promise;
        }
        function updateAnswerRate(id,rate){
            var answer={
                a_id:id,
                rating:rate
            };
            var deferred = $q.defer();

            api.updateAnswerRating(answer).$promise.then(updateAnswerComplete).catch(updateAnswerFailed);

            function updateAnswerComplete(response) {

                deferred.resolve(response);
            }

            function updateAnswerFailed(error) {
                deferred.reject(error)
            }

            return deferred.promise;
        }
        return service;
    }
}());
