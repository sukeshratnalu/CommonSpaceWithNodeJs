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
                url:'/addAnswer'
            },
            'addQuestions':{
                method:'POST',
                isArray:true,
                url:'/addQuestion'
            },
            'postTopics':{
                method:'POST',
                isArray:true,
                url:'/addTopic'
            },
            'getTopics':{
                method:'GET',
                isArray:true,
                url:'/getAllTopic'
            },
            'getQuestions':{
                method:'POST',
                isArray:true,
                url:'/getQuestion'
            },
            'updateQuestionRating':{
                method:'PUT',
                url:'/updateQuestionRating'
            },
            'getAnswers':{
                method:'POST',
                isArray:true,
                url:'/getAnswer'
            },
            'updateAnswerRating':{
                method:'PUT',
                url:'/updateAnswerRating'
            },
            'getAllQuestions':{
                method:'GET',
                isArray:true,
                url:'/getAllQuestions'
            }

        }
    }
}());
