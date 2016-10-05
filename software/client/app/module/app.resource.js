/**
 * Created by semanticbits on 14/9/16.
 */
(function(){
    angular.module('CommonSpace')
        .factory('api',api);
    api.$inject=['$resource','$rootScope'];
    function api($resource,$rootScope){
        return $resource('/', getParamDefaults(), getActions($rootScope));
    }
    //default parameters will go here..
    var getParamDefaults = function() {
        return {
            id:'@id'

        };
    };
    var getActions=function(){
        return{
            'addAnswers':{
                method:'POST',
                isArray:true,
                url:'/answer/add'
            },
            'addQuestions':{
                method:'POST',
                isArray:true,
                url:'/questions/add'
            },
            'postTopics':{
                method:'POST',
                isArray:true,
                url:'/topic/add'
            },
            'getTopics':{
                method:'GET',
                isArray:true,
                url:'/topic/listTopic'
            },
            'getQuestions':{
                method:'POST',
                isArray:true,
                url:'/question/listById'
            },
            'updateQuestionRating':{
                method:'PUT',
                url:'/question/updateRating'
            },
            'getAnswers':{
                method:'POST',
                isArray:true,
                url:'/answer/listById'
            },
            'updateAnswerRating':{
                method:'PUT',
                url:'/answer/updateRating'
            },
            'getAllQuestions':{
                method:'GET',
                isArray:true,
                url:'/question/listQuestions'
            }

        }
    }
}());
