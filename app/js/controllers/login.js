(function(){
  'use strict';

  angular.module('app').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope'];

    function LoginCtrl($scope){
      var vm = this;

      vm.lamp = false;
      vm.isLamp = isLamp;

      function isLamp() {
        return vm.lamp ? 'on' : 'off';
      }

      function login() {
        
      }
    }
})();
