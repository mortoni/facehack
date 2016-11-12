(function () {
  'use strict';

  var fckSidebar = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/sidebar/sidebar.tpl.html',
    controller: function($state) {
      var vm = this;

      vm.$state = $state;

    }
  }

  angular
    .module('component.sidebar', [])
    .component('fckSidebar', fckSidebar);

})();
