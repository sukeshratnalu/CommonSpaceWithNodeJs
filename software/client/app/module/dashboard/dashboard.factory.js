/**
 * Created by semanticbits on 22/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .factory('dashboardFactory',dashboardFactory);
    dashboardFactory.$inject=['$uibModal','api','$q','$timeout'];
    function dashboardFactory($uibModal,api,$q,$timeout){
        var newTopic={
            name:''

        };
        var topic=[];



        var factory={

            openAddAnswerModal:openAddAnswerModal,
            openAddQuestionModal:openAddQuestionModal,
            openAddTopicModal:openAddTopicModal,
            addTopic:addTopic,
            readTopics:readTopics

        };
        function addTopic(){
            openAddTopicModal();
        }
        /*logic for addTask modal*/
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
                            api.postTopics(newTopic).$promise.then(addingTodoCompleted).catch(addingTodoFailed);
                            function addingTodoCompleted(response){
                                deferred.resolve(response);
                            }
                            function addingTodoFailed(error){
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
                                console.log('here calling question modal');
                                console.log(topic_id);
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
                            console.log('hi I m in question modal----------');
                            console.log(subject);
                            api.addQuestions(subject).$promise.then(addingTodoCompleted).catch(addingTodoFailed);
                            function addingTodoCompleted(response){
                                deferred.resolve(response);
                            }
                            function addingTodoFailed(error){
                                deferred.reject(error);
                            }
                            return deferred.promise;
                        }, 1000).then(function(response) {
                            // This is set when the promise is resolved.
                            questions=response;

                            angular.forEach(questions,function(data){
                                question_id=data._id;
                                console.log('returning question promices.....');
                                console.log(question_id);
                            })

                        });
                        $timeout(function () {

                            for(var j=1;j<=qd.answerNumber;j++){
                                openAddAnswerModal(question_id);
                            }
                        }, 2000);
                        $uibModalInstance.dismiss();
                    };
                    qd.cancel = function () {
                        $uibModalInstance.dismiss();
                    };

                },
                controllerAs:'qd'
            });
            console.log(subject);
            return subject;
        }
        function openAddAnswerModal(question_id){
            console.log(question_id)
            var answers={
                questionId:question_id,
                form_answer:'',
                form_author:'',
                form_rate:0,
                form_answerDate:''
            }
            var modalInstance=$uibModal.open({
                templateUrl:'partials/addAnswer.html',
                windowClass: 'center-modal',
                controller: function($uibModalInstance){
                    var  ad=this;

                    ad.answer;
                    ad.author;
                    ad.rating;
                    ad.answeredDate;

                    console.log('I m in answer modal_______');
                    console.log(answers.questionId);
                   ad.ok=function(){
                       answers.form_answer=ad.answer;
                       answers.form_author=ad.author;
                       answers.form_rate=ad.rating;
                       answers.form_answerDate=ad.answeredDate;
                       console.log("Hi I m in ok() of add answer modal");
                       console.log(answers);
                        var deferred = $q.defer();
                       $timeout(function () {
                           console.log('^^^^^^^^^^^^^^^^^^^^^^');
                           console.log(answers);
                           api.addAnswers(answers).$promise.then(addingTodoCompleted).catch(addingTodoFailed);
                           function addingTodoCompleted(response){
                               deferred.resolve(response);
                           }
                           function addingTodoFailed(error){
                               deferred.reject(error);
                           }
                           answers=deferred.promise;
                       }, 10000);

                        // The promise is returned to the caller

                       $uibModalInstance.dismiss();
                    };
                    ad.cancel = function () {
                        $uibModalInstance.dismiss();
                    };

                },
                controllerAs:'ad'
            });

                console.log('add answer modal');
                console.log(answers);
               return answers;

        }
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
        /*function readQuestions(topicId){
            console.log('dashboardfactory readQuestions.....');
            console.log(topicId);
            var deferred = $q.defer();
            var topic={
                id:topicId
            };
            api.getQuestions(topic).$promise.then(getQuestionsComplete).catch(getQuestionsFailed);

            function getQuestionsComplete(response) {

                deferred.resolve(response);
            }

            function getQuestionsFailed(error) {
                deferred.reject(error)
            }
            return deferred.promise;
        }*/
        return factory;
    }
}());
