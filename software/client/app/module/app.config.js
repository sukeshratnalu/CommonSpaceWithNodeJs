/**
 * Created by semanticbits on 22/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .config(function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider) {
            $locationProvider.html5Mode(true);
            /*$locationProvider.hashPrefix('!');*/
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('/topics', {
                    url: '/topics',
                    templateUrl: 'partials/dashboard.html',
                    controller: 'dashboardController',
                    controllerAs: 'vm'
                })
                .state('question',{
                    url:'/question/:id?name',
                    templateUrl:'partials/question.html',
                    controller:'questionController',
                    controllerAs:'qm'
                })
                .state('answer',{
                    url:'/answer/:id?name?question',
                    templateUrl:'partials/answers.html',
                    controller:'answerController',
                    controllerAs:'am'
                })
                .state('signin', {
                    url:'/',
                    templateUrl: 'partials/signin.html',
                    controller: 'HomeCtrl',
                    hideMenus: true
                })
                .state('signup', {
                    url:'/signup',
                    templateUrl: 'partials/signup.html',
                    controller: 'HomeCtrl'
                })


        });
    /*$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/signin');
                }
                return $q.reject(response);
            }
        };
    }]);*/


}());
