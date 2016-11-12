(function () {
  'use strict';

  var fckContentsPool = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/contents-pool/contents-pool.tpl.html',
    controller: function(pool, $scope) {
      var vm = this;

      var update = function(){
        vm.posts = pool.get_content();
        $scope.$apply();
      }

      pool.registerObserverCallback(update);

      vm.help = help;
      vm.see = see;
      vm.graph = graph;
      vm.addDatabase = addDatabase;

      function help() {
        $('#modalContentHelp').modal('show');
        $('#modalContentHelp').children('.modal-dialog').removeClass('modal-lg');
      }

      function see(content) {
        vm.selected = content;
        $('#modalContent').modal('show');
        $('#modalContent').children('.modal-dialog').removeClass('modal-lg');
      }

      function graph(content) {

      }

      function addDatabase(content) {

      }

    }
  }

  angular
    .module('component.contents-pool', [])
    .component('fckContentsPool', fckContentsPool);

})();
