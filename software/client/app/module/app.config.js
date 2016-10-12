/**
 * Created by semanticbits on 22/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .config(function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider) {
            $locationProvider.html5Mode(false);
            /*$locationProvider.hashPrefix('!');*/
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('topics', {
                    url: '/topics',
                    templateUrl: 'partials/dashboard.html',
                    controller: 'dashboardController',
                    controllerAs: 'vm'
                })
                .state('question',{
                    url:'/question',
                    params: {
                        id: null,
                        name: null
                    },
                    templateUrl:'partials/question.html',
                    controller:'questionController',
                    controllerAs:'qm'
                })
                .state('answer',{
                    url:'/answer',
                    params:{
                        id:null,
                        name:null,
                        question:null
                    },
                    templateUrl:'partials/answers.html',
                    controller:'answerController',
                    controllerAs:'am'
                })
                .state('signin', {
                    url:'/',
                    templateUrl: 'partials/signin.html',
                    controller: 'HomeCtrl',
                    hideMenus: true,
                    controllerAs:'um'
                })
                .state('forgotpassword', {

                    url: "/forgotpassword",
                    templateUrl: "partials/forgotPassword.html",
                    controller:'forgotpasswordController',
                    controllerAs:'fc'

                })
                .state('changePassword',{
                    url:'/changePassword',
                    params:{
                      userName:null
                    },
                    templateUrl: "partials/changePassword.html",
                    controller:'changePasswordController',
                    controllerAs:'cp'

                })
                .state('signup', {
                    resolve : {
                        'acl' : ['$q', 'AclService', function($q, AclService){
                            if(AclService.can('signup')){
                                // Has proper permissions
                                return true;
                            } else {
                                // Does not have permission
                                return $q.reject('Unauthorized');
                            }
                        }]
                    },
                    url:'/signup',
                    templateUrl: 'partials/signup.html',
                    controller: 'HomeCtrl',
                    controllerAs:'um'
                });
            $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
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
            }]);


        });



}());
