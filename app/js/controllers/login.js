(function(){
  'use strict';

  angular.module('app').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', 'user', '$state', '$window' , 'notification'];

    function LoginCtrl($scope, user, $state, $window, notification){
      var vm = this;

      vm.lamp = false;
      vm.isLamp = isLamp;
      vm.login_desktop = login_desktop;

      var provider = new firebase.auth.FacebookAuthProvider();

      function isLamp() {
        if(!vm.isConnected)
          return 'on';
        return vm.lamp ? 'on' : 'off';
      }

      function login_desktop() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
          user.set(result.user);
          user.createDatabase();
          $window.fbAsyncInit();
          notification.show('Yoo HACKER be welcome!');
          $state.go('app.dashboard');
        }).catch(function(error) {
          notification.show('GO AWAY! You are not a HACKER, or try again.');
        });
      }

      function updateConnected() {
        vm.isConnected = user.getConnected();
        $scope.$apply();
      }

      user.registerObserverCallback(updateConnected);

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
