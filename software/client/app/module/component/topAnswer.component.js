/**
 * Created by semanticbits on 3/10/16.
 */
(function(){
    angular.module('CommonSpace.component')
        .component('topAnswer',{
            bindings: {
                id:'@'
            },
            templateUrl: 'partials/topAnswer.html',
            controller: ['answerService',function (answerService) {

                var self=this;
                console.log('I am in top Answer component');
                //logic for getting top answer
                answerService.readanswersById(self.id).then(function(response){
                    var answers=response;
                    var topicAnswers=[];
                    var answer=[];
                    angular.forEach(answers,function(data){
                        topicAnswers.push(data)
                    });
                    //logic for sorting
                    topicAnswers.sort(function(a, b) {
                        return parseInt(b.rate) - parseInt(a.rate);
                    });
                    angular.forEach(topicAnswers,function(data){
                        answer.push(data.answer);
                    });
                    self.topAnswer=answer[0];
                    self.totalAnswer=answer.length;

                });
            }],
            controllerAs:'self'
        })


}());
