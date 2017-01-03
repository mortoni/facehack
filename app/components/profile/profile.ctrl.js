(function () {
  'use strict';

  var fckProfile = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/profile/profile.tpl.html',
    controller: function(user, notification, $state) {
      var vm = this;
      vm.user = user.current();
      vm.logout = logout;

      function logout() {
        firebase.auth().signOut();
        user.logout();
        $state.go('core.login');
      }

    }
  }

  angular
    .module('component.profile', [])
    .component('fckProfile', fckProfile);

})();
