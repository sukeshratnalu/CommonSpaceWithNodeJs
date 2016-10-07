/**
 * Created by semanticbits on 3/10/16.
 */
(function(){
    angular.module('CommonSpace.user')
        .controller('HomeCtrl',HomeCtrl);

    HomeCtrl.$inject=['$rootScope', '$scope', '$location', '$localStorage', 'userFactory'];

    function HomeCtrl($rootScope, $scope, $location, $localStorage, userFactory){
        var um=this;
        um.signin=signin;
        um.signup=signup;
        um.logout=logout;
        //function for sign in operation
        function signin(){
            var formData = {
                email: um.email,
                password: um.password
            };

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
            });
        }
        //function for signup operation
        function signup(){
            var formData = {
                email: um.email,
                password: um.password,
                role:um.role
            };

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
        }
        //function for logout operation
        function logout(){
            userFactory.logout(function() {
                window.location = "/"
            }, function() {
                alert("Failed to logout!");
            });
        }
        um.token = $localStorage.token;
    }
}());
/*
angular.module('CommonSpace.registerUser')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'userFactory', function($rootScope, $scope, $location, $localStorage, userFactory) {
        $scope.me = function() {
            userFactory.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            })
        };

    .controller('MeCtrl', ['$rootScope', '$scope', '$location', 'userFactory', function($rootScope, $scope, $location, userFactory) {

        userFactory.me(function(res) {
            $scope.myDetails = res;
        }, function() {
            $rootScope.error = 'Failed to fetch details';
        })
    }]);
*/
