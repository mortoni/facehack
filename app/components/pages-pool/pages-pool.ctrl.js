(function () {
  'use strict';

  var fckPagesPool = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/pages-pool/pages-pool.tpl.html',
    controller: function(pool, notification) {
      var vm = this;
      vm.pages = pool.get();

      vm.help = help;
      vm.resume = resume;
      vm.remove = remove;

      function resume(page) {
        page.isPaused = !page.isPaused;
        notification.show('Page ' + page.name + ' ' +
          (page.isPaused ? 'Resumed!' : 'Paused')
        );
      }

      function remove(page) {
        if(pool.remove(page))
          notification.show('Page ' + page.name + ' Removed.');
        else
          notification.show('Page ' + page.name + ' Can not be removed.');
      }

      function help() {
        $('#modalPoolHelp').modal('show');
        $('#modalPoolHelp').children('.modal-dialog').removeClass('modal-lg');
      }


    }
  }

  angular
    .module('component.pages-pool', [])
    .component('fckPagesPool', fckPagesPool);

})();
