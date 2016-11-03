(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', 'user'];

    function DashboardCtrl($scope, user){
      var vm = this;

      vm.user = user.current();

      vm.test = "oi ";

    }
})();
