/**
 * Created by semanticbits on 22/9/16.
 */
(function(){
    angular.module('CommonSpace.topics')
        .controller('dashboardController',dashboardController);
    //injecting dependencies for controller.
    dashboardController.$inject=['dashboardFactory','$rootScope','questionService','userFactory'];

    function dashboardController(dashboardFactory,$rootScope,questionService,userFactory){

        //declaring view model
        var vm=this;

        //declaring variables
        vm.addTopics=addTopics;
        vm.getAllTopic=getAllTopic;
        vm.getTotalQuestion=getTotalQuestion;
        vm.getAllQuestion=getAllQuestion;
        vm.deleteTopics=deleteTopics;
        vm.listUser=listUser;


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
        //function for delete topics
        function deleteTopics(id){
            questionService.readQuestions(id).then(listQuestionSuccess).catch(listQuestionFail);
            function listQuestionSuccess(response){
                var questions=response;
                var q_id=[];
                angular.forEach(questions,function(data){
                    q_id.push(data._id);
                });
                dashboardFactory.deleteTopic(id,q_id).then(deleteTopicSuccess).catch(deleteTopicFail);
                function deleteTopicSuccess(response){
                    vm.getAllTopic();
                }
                function deleteTopicFail(error){
                    alert('delete operation failed');
                }
            }
            function listQuestionFail(error){
                console.log(error);
            }
        }
        function listUser(){

             console.log($rootScope.token);
            var data={
                userToken:$rootScope.token
            };
            userFactory.getUser(data).then(listUserSuccess).catch(listUserFail);
            function listUserSuccess(response){
                var user=response;
                vm.userRole='';
                angular.forEach(user,function(data){
                    if(data.role!=undefined){
                        vm.userRole=data.role;
                        console.log(vm.userRole);
                    }


                });
                console.log('check role');
                console.log(vm.userRole);

            }
            function listUserFail(error){
                console.log(error);
            }
        }
        vm.listUser();


    }
}());
