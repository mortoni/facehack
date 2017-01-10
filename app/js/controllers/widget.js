(function(){
  'use strict';

  angular.module('app').controller('WidgetCtrl', WidgetCtrl);

    WidgetCtrl.$inject = ['$scope', '$state', 'user', '$rootScope'];

    function WidgetCtrl($scope, $state, user, $rootScope){
      $scope.$state = $state;
      $scope.flag = false;
      // $scope.isConnected = user.getConnected();
      $scope.isConnected= true;

      $scope.logout = function() {
        firebase.auth().signOut();
        user.logout();
        $state.go('core.login');
      };

      $scope.setIndexes = function() {
        $rootScope.quickview_index = false;

        var limit_slider = $document[0].getElementById('limit-slider');
        limit_slider.setAttribute("tabindex", "-1");

        var quickview_close = $document[0].getElementById('quickview-close');
        quickview_close.setAttribute("tabindex", "-1");

        var quickview_automactly = $document[0].getElementById('quickview-automactly');
        quickview_automactly.setAttribute("tabindex", "-1");
      }

      $scope.go = function(local) {
        $state.go(local);
      }
    }
})();
