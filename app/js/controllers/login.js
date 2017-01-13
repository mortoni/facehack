(function(){
  'use strict';

  angular.module('app').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [
      '$scope',
      'user',
      '$state',
      '$window' ,
      'notification',
      'indexedDB',
      'config'
    ];

    function LoginCtrl(
      $scope,
      user,
      $state,
      $window,
      notification,
      indexedDB,
      config
    ){
      var vm = this;

      vm.lamp = false;
      vm.isLamp = isLamp;
      vm.login_desktop = login_desktop;
      vm.login_offline = login_offline;

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

      function login_offline() {
        var configIDB = indexedDB.get_config();
        configIDB.then(function(result) {

          var onSuccess = function(data) {
            if(data[0].config.user.email === vm.email &&
               data[0].config.code == vm.code) {
               user.set(data[0].config.user);
               var configuration = {
                 range: data[0].config.limit,
                 automactly: data[0].config.automactly,
                 code: data[0].config.code
               }
               config.set(configuration);
               notification.show('Yoo HACKER be welcome!');
               $state.go('app.content');
            } else {
              notification.show('GO AWAY! You are not a HACKER, or try again.');
            }
          };

          var onError = function(error) {
            notification.show('Can not login in offline mode');
          };

          result.getAll(onSuccess, onError)
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
