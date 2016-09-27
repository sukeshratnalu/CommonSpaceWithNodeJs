/**
 * Created by semanticbits on 27/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .service('answerService',answerService);
    answerService.$inject=['$q','api'];
    function answerService($q,api){
        var service={
            readanswersById:readanswersById
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
        return service;
    }
}());
