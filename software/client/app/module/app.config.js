/**
 * Created by semanticbits on 22/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
            $locationProvider.html5Mode(true);
            $locationProvider.hashPrefix('!');
            $urlRouterProvider.otherwise('/dashboard');
            $stateProvider
                .state('dashboard', {
                    url: '/',
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

        });

}());
