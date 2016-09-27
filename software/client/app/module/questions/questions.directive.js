/**
 * Created by semanticbits on 6/9/16.
 */
(function(){
    angular.module('commonSpace')
        .directive('topAnswer',topAnswer);
    topAnswer.$inject=['$rootScope','answerService'];
    function topAnswer($rootScope,answerService){
        var directive = {
            link: link,
            templateUrl: 'partials/topAnswer.html',
            restrict: 'EA',
            scope:{
                name:'@',
                question:'@'

            }
        };
        return directive;
        function link(scope) {
            scope.topAnswer=answerService.readTopAnswer(scope.name,scope.question);
        }
    }
}());
