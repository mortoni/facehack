(function(){
  'use strict';

  angular.module('app').controller('WidgetCtrl', WidgetCtrl);

    WidgetCtrl.$inject = ['$scope', '$state'];

    function WidgetCtrl($scope, $state){
      $scope.$state = $state;
    }
})();
