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
            'addQuestions':{
                method:'POST',
                isArray:true,
                url:'/questions/add'
            },
            'getAllQuestions':{
                method:'GET',
                isArray:true,
                url:'/question/listQuestions'
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
            'addAnswers':{
                method:'POST',
                isArray:true,
                url:'/answer/add'
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
            'registerUser':{
                method:'POST',
                isArray:true,
                url:'/user/signup'
            },
            'authonticateUser':{
                method:'POST',
                isArray:true,
                url:'/user/authenticate'
            },
            'forgotPassword': {
                method: 'POST',
                url: '/user/forgotPassword'
            },
            'changePassword':{
                method:'POST',
                url:'/user/changePassword'
            },

            'forgotPasswordMail':{
                method:'POST',
                url:'/user/forgotPasswordMail'
            }

        }
    }
}());
