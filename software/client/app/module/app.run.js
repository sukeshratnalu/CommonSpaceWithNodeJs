/**
 * Created by semanticbits on 22/9/16.
 */
(function(){
    angular.module('CommonSpace')
        /*.run(['$rootScope',function($rootScope){
            $rootScope.$on('$stateChangeSuccess', function() {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            });
        }])*/
        .run(appRun);
    appRun.$inject = ['$rootScope', '$state', '$stateParams', '$cookies','AclService'];
    function appRun($rootScope, $state, $stateParams, $cookies,AclService) {
        $rootScope.checkAclService=function(a){

            if(a===1){
                var aclData = {
                    user: ['topics', 'signin', 'question', 'answer'],
                    admin: ['signup', 'topics', 'signin','question','answer']
                };
                AclService.setAbilities(aclData);
                // Attach the member role to the current registerUser
                AclService.attachRole('admin');
            }

            else {
                var aclData = {
                    user: ['topics', 'signin', 'question', 'answer'],
                    admin: ['signup', 'topics', 'signin','question','answer']
                };
                AclService.setAbilities(aclData);
                // Attach the member role to the current registerUser
                AclService.attachRole($rootScope.currentUser.role);
            }
        };

        $rootScope.logout = function() {
            $cookies.remove('user');
            $rootScope.isAuthenticated=false;
            console.log('########');
            $state.go('signin');
        };

        $rootScope.checkAclService(1);
    }
}());
