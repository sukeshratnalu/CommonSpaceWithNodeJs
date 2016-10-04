/**
 * Created by semanticbits on 6/9/16.
 */
/*(function(){
    angular.module('CommonSpace.question')
        .directive('topAnswer',topAnswer);
    topAnswer.$inject=['answerService'];
    function topAnswer(answerService){
        var directive = {
            link: link,
            templateUrl: 'partials/topAnswer.html',
            restrict: 'EA',
            scope:{
                id:'@'

            }
        };
        return directive;
        function link(scope) {
            //logic for getting top answer
            answerService.readanswersById(scope.id).then(function(response){
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
                scope.topAnswer=answer[0];
                scope.totalAnswer=answer.length;

            });


        }
    }
}());*/
