/**
 * Created by semanticbits on 7/10/16.
 */
(function(){
    'use strict';
    angular.module('CommonSpace.user')
        .factory('userFactory',userFactory);
    userFactory.$inject=['$http', '$localStorage','api','$q'];
    function userFactory($http, $localStorage,api,$q){
        var baseUrl = "your_service_url";
        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            save: function(data, success, error) {
                $http.post('/signin', data).success(success).error(error)
            },
            signin: function(data, success, error) {
                $http.post('/authenticate', data).success(success).error(error)
            },
            getUser: function(data) {
                var deferred = $q.defer();
                api.getUserByToken(data).$promise.then(getUserComplete).catch(getUserFailed);

                function getUserComplete(response) {
                    deferred.resolve(response);
                }
                function getUserFailed(error) {
                    deferred.reject(error)
                }
                return deferred.promise;
            },
            logout: function(success) {
                changeUser({});
                delete $localStorage.token;
                console.log('************************');
                console.log($localStorage.token);
                success();
            },
            sendEmail: function(query){

            }
        };
    }
}());

