(function () {
  'use strict';

  var fckProfile = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/profile/profile.tpl.html',
    controller: function($scope, user, notification, $state) {
      var vm = this;
      vm.user = user.current();
      vm.logout = logout;
      vm.isConnected = user.getConnected();

      function logout() {
        firebase.auth().signOut();
        user.logout();
        $state.go('core.login');
      }

      function updateConnected() {
        vm.isConnected = user.getConnected();
        $scope.$apply();
      }

      user.registerObserverCallback(updateConnected);

    }
  }

  angular
    .module('component.profile', [])
    .component('fckProfile', fckProfile);
})();
