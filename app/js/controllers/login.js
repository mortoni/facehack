(function(){
  'use strict';

  angular.module('app').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'user', '$state', '$window' , 'notification'];

    function LoginCtrl($scope, user, $state, $window, notification){
      var vm = this;

      vm.lamp = false;
      vm.isLamp = isLamp;
      vm.login_desktop = login_desktop;
      // vm.login_mobile = login_mobile;

      // function activate() {
      //   firebase.auth().getRedirectResult().then(function(result) {
      //     if (result.credential) {
      //       var token = result.credential.accessToken;
      //     }
      //     user.set(result.user);
      //     // window.fbAsyncInit();
      //     notification.show('Yoo HACKER be welcome!');
      //     // $state.go('app.dashboard');
      //   }).catch(function(error) {
      //     notification.show('GO AWAY! You are not a HACKER, or try again.');
      //   });
      // }

      var provider = new firebase.auth.FacebookAuthProvider();

      function isLamp() {
        return vm.lamp ? 'on' : 'off';
      }

      function login_desktop() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
          user.set(result.user);
          $window.fbAsyncInit();
          notification.show('Yoo HACKER be welcome!');
          $state.go('app.dashboard');
        }).catch(function(error) {
          notification.show('GO AWAY! You are not a HACKER, or try again.');
        });
      }

      // function login_mobile() {
      //   firebase.auth().signInWithRedirect(provider);
      //
      //   activate();
      // }

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
