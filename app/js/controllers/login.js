(function(){
  'use strict';

  angular.module('app').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'user', '$state', '$window'];

    function LoginCtrl($scope, user, $state, $window){
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
          user.set(result.user);
          $window.fbAsyncInit();
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
          user.set(result.user);
          $window.fbAsyncInit();
          $state.go('app.dashboard');
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
      }

      $window.fbAsyncInit = function() {
          FB.init({
            appId: '1604104083228708',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.4'
          });
      };
    }
})();
