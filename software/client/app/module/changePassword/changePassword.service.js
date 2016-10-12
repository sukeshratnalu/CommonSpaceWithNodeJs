/**
 * Created by semanticbits on 7/10/16.
 */
(function(){
    angular.module('CommonSpace.changePassword')
        .service('changePasswordService',changePasswordService);
    changePasswordService.$inject=['api','$q'];
    function changePasswordService(api,$q){

        var service={
            changePassword:changePassword
        };
        function changePassword(query){
            var deferred = $q.defer();

            api.changePassword(query).$promise.then(changePasswordSucessfully).catch(changePasswordFailure);
            function changePasswordSucessfully(response){
                deferred.resolve(response);
            }
            function changePasswordFailure(error){
                deferred.reject(error);
            }
            return deferred.promise;
        }
        return service;
    }
}());
