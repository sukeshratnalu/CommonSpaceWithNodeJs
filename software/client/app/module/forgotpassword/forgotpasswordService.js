/**
 * Created by Ashish Lamse on 22/9/16.
 */
(function(){
    angular.module('CommonSpace.forgotPassword')
        .factory('forgotpasswordService',forgotpasswordService);

    forgotpasswordService.$inject=['api','$q'];
    function forgotpasswordService(api,$q){
            var deffered=$q.defer();
            var service={
                forgotPassword:forgotPassword,
                forgotPasswordMail:forgotPasswordMail

            };
        return service;
        function forgotPasswordMail(query){
            api.forgotPasswordMail(query).$promise.then(getSuccessMailData).catch(getFailureMailData);

            function getSuccessMailData(result){
                deffered.resolve(result)
            }

            function getFailureMailData(failure){
                deffered.reject(failure)
            }

            return deffered.promise;
        }

        function forgotPassword(username){


            api.forgotPassword(username).$promise.then(validUser).catch(invalidUser);

            function validUser(result){
                deffered.resolve(result);
            }
            function invalidUser(error){
                deffered.reject(error);
            }
            return deffered.promise;
        }
    }
})();
