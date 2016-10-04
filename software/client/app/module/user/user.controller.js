/**
 * Created by semanticbits on 3/10/16.
 */
angular.module('CommonSpace.user')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'userFactory', function($rootScope, $scope, $location, $localStorage, userFactory) {

        $scope.signin = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }

            userFactory.signin(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    console.log('Its signin service');
                    console.log($localStorage.token);
                    /*window.location = "/";*/
                    $location.path('/topics');
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            })
        };

        $scope.signup = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            }

            userFactory.save(formData, function(res) {
                if (res.type == false) {
                    alert(res.data)
                } else {
                    $localStorage.token = res.data.token;
                    window.location = "/"
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };

        $scope.me = function() {
            userFactory.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };

        $scope.logout = function() {
            userFactory.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;
    }])

    .controller('MeCtrl', ['$rootScope', '$scope', '$location', 'userFactory', function($rootScope, $scope, $location, userFactory) {

        userFactory.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
    }]);
