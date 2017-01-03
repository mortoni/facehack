(function(){
  'use strict';

  angular.module('app').controller('WidgetCtrl', WidgetCtrl);

    WidgetCtrl.$inject = ['$scope', '$state', 'user'];

    function WidgetCtrl($scope, $state, user){
      $scope.$state = $state;
      $scope.flag = false;

      $scope.logout = function() {
        firebase.auth().signOut();
        user.logout();
        $state.go('core.login');
      };

      $scope.go = function(local) {
        $state.go(local);
      }
    }
})();
