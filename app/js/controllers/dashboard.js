(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', 'user', 'config', 'notification'];

    function DashboardCtrl($scope, user, config, notification){
      var vm = this;
      vm.auto = auto;
      vm.user = user.current();
      vm.saveCode = saveCode;

      activate();

      function activate() {
        if(navigator.onLine) {
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

        $scope.$watch("vm.limit",
          function handleChange( newValue, oldValue ) {
             config.set_range(newValue);
        });
      }

      function saveCode() {
        firebase.database().ref('contents/' + user.id())
          .update({
            code: vm.code,
            limit: vm.limit,
            automactly: vm.automactly
          })
          .then(function() {
            notification.show('Configurations saved!');
          });
      }

      function auto(){
        config.set_auto(vm.automactly);
      }

    }
})();
