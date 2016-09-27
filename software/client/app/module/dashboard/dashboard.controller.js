/**
 * Created by semanticbits on 22/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .controller('dashboardController',dashboardController);
    dashboardController.$inject=['dashboardFactory','$rootScope'];
    function dashboardController(dashboardFactory,$rootScope){

        var vm=this;
        vm.addTopics=addTopics;
        vm.getAllTopic=getAllTopic;
       /* vm.getQuestionByTopic=getQuestionByTopic;*/

        function addTopics(){
            dashboardFactory.addTopic();
        }
        function getAllTopic(){
            dashboardFactory.readTopics().then(function(response) {
                // This is set when the promise is resolved.
                $rootScope.allTopics = response;
                vm.topics=$rootScope.allTopics;
                console.log('getAllTopic method');
                console.log(vm.topics);

            });
        }
        vm.getAllTopic();

    }
}());
