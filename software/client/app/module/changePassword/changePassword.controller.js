/**
 * Created by semanticbits on 7/10/16.
 */
(function(){
    angular.module('CommonSpace.changePassword')
        .controller('changePasswordController',changePasswordController);
    changePasswordController.$inject=['$stateParams','changePasswordService','$location'];
    function changePasswordController($stateParams,changePasswordService,$location){

        var cp=this;
        console.log($stateParams.userName);
        cp.email=$stateParams.userName;
        cp.changePassword=changePassword;

        function changePassword(){
            if(cp.password===cp.rePassword){
                var data={
                    userName:cp.email,
                    password:cp.password
                };
                changePasswordService.changePassword(data).then(function(response){

                            alert('Your password is successfully changed.');
                            $location.path('/');



                });

            }
            else{
                alert('password not matching');
                cp.password=null;
                cp.rePassword=null;
            }
        }


    }
}());
