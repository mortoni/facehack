(function () {
  'use strict';

  var fckCards = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/card/card.tpl.html',
    controller: function(pool, notification, facebook, $scope) {
      var vm = this;

      function hack(page) {
        if(pool.add(page))
          notification.show('Page ' + page.name + ' Added to the Pool.');
        else
          notification.show('Page ' + page.name + ' Already Exist!');
      }

      function search(event) {
        if(event.which === 13) {
          facebook.search(vm.word).then(function(data) {
            if(data.length == 0) {
              notification.show('Could not find anything!');
            } else {
              vm.target = data;
              notification.show('Found ' + data.length + ' Pages');
              vm.target.forEach(function(page){
                facebook.update(page).then(function() {
                  $scope.$apply();
                });
              });
            }

            $scope.$apply();
          });
        }
      }

      function spy(page) {
        vm.info = [];
        $('#modalInfo').modal('show');
        $('#modalInfo').on('show.bs.modal', function(e) {
                $('body').addClass('fill-in-modal');
            });

        facebook.info(page).then(function(data) {
          vm.info = data.data;
          $scope.$apply();
        });
      }

      vm.hack = hack;
      vm.search = search;
      vm.spy = spy;
    }
  }

  angular
    .module('component.cards', [])
    .component('fckCards', fckCards);
})();
