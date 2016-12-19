(function () {
  'use strict';

  var fckDatabase = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/database/database.tpl.html',
    controller: function(notification) {
      var vm = this;

    }
  }

  angular
    .module('component.database', [])
    .component('fckDatabase', fckDatabase);

})();
