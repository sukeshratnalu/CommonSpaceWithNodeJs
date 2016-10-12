/**
 * Created by Ashish Lamse on 21/9/16.
 */
(function(){
    angular.module('CommonSpace.forgotPassword')
        .controller('forgotpasswordController',forgotpasswordController);
    forgotpasswordController.$inject=['forgotpasswordService','$location','$rootScope','$rootScope'];

    function forgotpasswordController(forgotpasswordService,$location,$rootScope){
        var fc=this;

        fc.forgotPassword=forgotPassword;

        function forgotPassword(username){

            forgotpasswordService.forgotPassword({username:username}).then(function(res){
                    if(res.status){

                        forgotpasswordService.forgotPasswordMail({username:username}).then(function(res){
                           if(res.status){
                               console.log(res.status);
                               alert('An e-mail sent to reset your password.');
                               $location.path('/');
                           }
                        });

                        $rootScope.username=username;
                        /*$location.path('/changepassword')*/
                    }
                else {
                        fc.error = 'Username is not matched please give correct username';
                    }
            });
        }
    }
})();
