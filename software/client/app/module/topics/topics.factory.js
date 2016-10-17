/**
 * Created by semanticbits on 22/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .factory('dashboardFactory',dashboardFactory);
    dashboardFactory.$inject=['$uibModal','api','$q','$timeout','$rootScope','answerService','questionService'];
    function dashboardFactory($uibModal,api,$q,$timeout,$rootScope,answerService,questionService){
        var newTopic={
            name:''
        };
        var topic=[];
        var factory={

            openAddAnswerModal:openAddAnswerModal,
            openAddQuestionModal:openAddQuestionModal,
            openAddTopicModal:openAddTopicModal,
            addTopic:addTopic,
            readTopics:readTopics,
            deleteTopic:deleteTopic

        };
        //function for sending topics,questions and answers to server
        function addTopic(){
            openAddTopicModal();
        }
        /*logic for addTopic modal*/
        function openAddTopicModal(){
            var modalInstance = $uibModal.open({
                templateUrl:'partials/addTopic.html',
                windowClass: 'center-modal',
                controller: function($uibModalInstance){
                    var cd=this;
                    cd.questionNumber;
                    cd.form_name;
                    var topic_id;
                    cd.ok = function () {
                        newTopic.name=cd.form_name;
                        var deferred = $q.defer();
                        $timeout(function () {
                            api.postTopics(newTopic).$promise.then(addingTopicCompleted).catch(addingTopicFailed);
                            function addingTopicCompleted(response){
                                deferred.resolve(response);
                            }
                            function addingTopicFailed(error){
                                deferred.reject(error);
                            }
                            return deferred.promise;
                        }, 1).then(function(response) {
                            // This is set when the promise is resolved.
                           topic=response;
                            angular.forEach(topic,function(data){
                                topic_id=data._id;

                            })


                        });
                        $timeout(function () {
                            for(var i=1;i<=cd.questionNumber;i++){
                                openAddQuestionModal(topic_id)
                            }
                        }, 1000);

                        $uibModalInstance.dismiss();
                    };
                    cd.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                },
                controllerAs:'cd'
            });
        }
        function openAddQuestionModal(topic_id){
            var subject={
                form_topicId:topic_id,
                form_question:'',
                form_rate:0

            };
            var questions=[];
            var question_id;
            var modalInstance = $uibModal.open({
                templateUrl:'partials/addQuestion.html',
                windowClass: 'center-modal',
                controller: function($uibModalInstance){
                    var qd=this;
                    qd.answerNumber;
                    qd.rate;
                    qd.question;
                    qd.ok = function () {
                        subject.form_question=qd.question;
                        subject.form_rate=qd.rate;
                        var deferred = $q.defer();
                        $timeout(function () {
                            api.addQuestions(subject).$promise.then(addQuestionsCompleted).catch(addQuestionsFailed);
                            function addQuestionsCompleted(response){
                                deferred.resolve(response);
                            }
                            function addQuestionsFailed(error){
                                deferred.reject(error);
                            }
                            return deferred.promise;
                        }, 1000).then(function(response) {
                            // This is set when the promise is resolved.
                            questions=response;

                            angular.forEach(questions,function(data){
                                question_id=data._id;
                            })

                        });
                        $timeout(function () {

                            for(var j=1;j<=qd.answerNumber;j++){
                                openAddAnswerModal(question_id);
                            }
                        }, 1000);
                        $uibModalInstance.dismiss();
                    };
                    qd.cancel = function () {
                        $uibModalInstance.dismiss();
                    };

                },
                controllerAs:'qd'
            });

            return subject;
        }
        function openAddAnswerModal(question_id){
            console.log(question_id);
            var answers={
                questionId:question_id,
                form_answer:'',
                form_author:'',
                form_rate:0,
                form_answerDate:''
            };
            var modalInstance=$uibModal.open({
                templateUrl:'partials/addAnswer.html',
                windowClass: 'center-modal',
                controller: function($uibModalInstance){
                    var  ad=this;
                    ad.answer;
                    ad.author;
                    ad.rating;
                    ad.answeredDate;
                   ad.ok=function(){
                       answers.form_answer=ad.answer;
                       answers.form_author=ad.author;
                       answers.form_rate=ad.rating;
                       answers.form_answerDate=ad.answeredDate;
                        var deferred = $q.defer();
                       $timeout(function () {
                           api.addAnswers(answers).$promise.then(addingTodoCompleted).catch(addingTodoFailed);
                           function addingTodoCompleted(response){
                               deferred.resolve(response);
                           }
                           function addingTodoFailed(error){
                               deferred.reject(error);
                           }
                           answers=deferred.promise;
                       }, 1000);

                        // The promise is returned to the caller

                       $uibModalInstance.dismiss();
                    };
                    ad.cancel = function () {
                        $uibModalInstance.dismiss();
                    };

                },
                controllerAs:'ad'
            });
               return answers;

        }
        //function for getting allTopics from server
        function readTopics(){
            var deferred = $q.defer();
            api.getTopics().$promise.then(getTopicsComplete).catch(getTopicsFailed);

            function getTopicsComplete(response) {

                deferred.resolve(response);
            }

            function getTopicsFailed(error) {
                deferred.reject(error)
            }
            return deferred.promise;
        }
        function deleteTopic(topic_id,question_id){
            var deferred = $q.defer();
            var query={
                id:topic_id
            };
            answerService.deleteAnswerByQuestionId(question_id).then(deleteAnswerSuccessfully).catch(deleteAnswerFailed);
            function deleteAnswerSuccessfully(response){
                questionService.deleteQuestionByTopicId(topic_id).then(deleteQuestionSuccessfully).catch(deleteQuestionFailed);
                function deleteQuestionSuccessfully(response){
                    api.deletTopicById(query).$promise.then(deleteTopicSuccessfully).catch(deleteTopicFailed);
                    function deleteTopicSuccessfully(response){
                        deferred.resolve(response);
                    }
                    function deleteTopicFailed(error){
                        deferred.reject(error);
                    }
                }
                function deleteQuestionFailed(error){

                }
            }
            function deleteAnswerFailed(error){

            }
            return deferred.promise;


        }
        return factory;
    }
}());
