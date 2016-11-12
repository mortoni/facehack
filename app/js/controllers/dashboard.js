(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', 'user', 'facebook', 'config'];

    function DashboardCtrl($scope, user, facebook, config){
      var vm = this;
      vm.auto = auto;

      activate();

      function activate() {
        vm.automactly = config.get_auto();
        vm.limit = facebook.get_limit();
        vm.user = user.current();
      }

      $scope.$watch(
          "vm.limit",
          function handleChange( newValue, oldValue ) {
             facebook.set_limit(newValue);
          }
      );


      function auto(){
        config.set_auto(vm.automactly);
      }
    }
})();
