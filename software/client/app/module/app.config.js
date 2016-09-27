/**
 * Created by semanticbits on 22/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .config(function($stateProvider, $urlRouterProvider,$locationProvider) {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('dashboard', {
                    url: '/',
                    templateUrl: 'partials/dashboard.html',
                    controller: 'dashboardController',
                    controllerAs: 'vm'
                })
                .state('question',{
                    url:'/question/:id',
                    templateUrl:'partials/question.html',
                    controller:'questionController',
                    controllerAs:'qm'
                })
                .state('answer',{
                    url:'/answer/:id',
                    templateUrl:'partials/answers.html',
                    controller:'answerController',
                    controllerAs:'am'
                })

        })
}());
