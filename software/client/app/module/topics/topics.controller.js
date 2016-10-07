/**
 * Created by semanticbits on 22/9/16.
 */
(function(){
    angular.module('CommonSpace.topics')
        .controller('dashboardController',dashboardController);
    //injecting dependencies for controller.
    dashboardController.$inject=['dashboardFactory','$rootScope','questionService'];

    function dashboardController(dashboardFactory,$rootScope,questionService){

        //declaring view model
        var vm=this;

        //declaring variables
        vm.addTopics=addTopics;
        vm.getAllTopic=getAllTopic;
        vm.getTotalQuestion=getTotalQuestion;
        vm.getAllQuestion=getAllQuestion;


        function addTopics(){
            dashboardFactory.addTopic();

        }
        //function for getting all topics from dashboardFactory
        function getAllTopic(){
            dashboardFactory.readTopics().then(listTopicsSuccess).catch(listTopicsFail);
            function listTopicsSuccess(response){
                vm.topics=response;
            }
            function listTopicsFail(error){
                console.log(error);
            }
        }
        vm.getAllTopic();
        //function for getting allQuestions from questionService
        function getAllQuestion() {
            questionService.readAllQuestions().then(listQuestionSuccess).catch(listQuestionFail);
            function listQuestionSuccess(response){
                vm.allQuestions=response;
            }
            function listQuestionFail(error){
                console.log(error);
            }
        }
        vm.getAllQuestion();
        //function for getting total count of questions
        function getTotalQuestion(id){
            var questions=[];
            var questionsById=[];
            var questionLength=0;
            angular.forEach(vm.allQuestions,function(data){
                questions.push(data);
            });
            angular.forEach(questions,function(data){
                if(data.t_id==id){
                    questionsById.push(data.question);
                }
            });
            questionLength=questionsById.length;
            return questionLength;
        }


    }
}());
