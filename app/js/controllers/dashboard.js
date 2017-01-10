(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', 'user', 'facebook', 'config', 'notification'];

    function DashboardCtrl($scope, user, facebook, config, notification){
      var vm = this;
      vm.auto = auto;

      activate();

      function activate() {
        vm.user = user.current();
        vm.saveCode = saveCode;

        var user_config = firebase.database().ref('contents/' + user.id() + '/config');
        user_config.on("value", function(snap) {
          if (snap.val()) {
            config.set(snap.val());
            vm.code = config.get_code();
            vm.limit = config.get_range();
            vm.automactly = config.get_auto();
            vm.offline = vm.code ? true : false;
          }
        });
      }

      $scope.$watch(
          "vm.limit",
          function handleChange( newValue, oldValue ) {
             config.set_range(newValue);
          }
      );

      function saveCode() {
        var config = {
          code: vm.code,
          limit: vm.limit,
          automactly: vm.automactly
        };

        firebase.database().ref('contents/' + user.id()).set({config})
          .then(function() {
            notification.show('Configurations saved!');
          });
      }

      function auto(){
        config.set_auto(vm.automactly);
      }
    }
})();
