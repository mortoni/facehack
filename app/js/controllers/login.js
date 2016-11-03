(function(){
  'use strict';

  angular.module('app').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'user', '$state'];

    function LoginCtrl($scope, user, $state){
      var vm = this;

      vm.lamp = false;
      vm.isLamp = isLamp;
      vm.login_desktop = login_desktop;
      vm.login_mobile = login_mobile;

      var provider = new firebase.auth.FacebookAuthProvider();

      function isLamp() {
        return vm.lamp ? 'on' : 'off';
      }

      function login_desktop() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          user.set(result.user);
          $state.go('app.dashboard');
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
      }

      function login_mobile() {
        firebase.auth().getRedirectResult().then(function(result) {
          if (result.credential) {
            var token = result.credential.accessToken;
          }
          user.set(result.user);
          $state.go('app.dashboard');
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
      }
    }
})();
