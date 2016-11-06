(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', 'user', 'facebook', 'notification', 'pool', '$state'];

    function DashboardCtrl($scope, user, facebook, notification, pool, $state){
      var vm = this;

      vm.searchBox = searchBox;
      vm.hack = hack;

      activate();

      function activate() {
        vm.limit = facebook.get_limit();
        vm.user = user.current();
      }

      $scope.$watch(
          "vm.limit",
          function handleChange( newValue, oldValue ) {
             facebook.set_limit(newValue);
          }
      );

      function searchBox(event) {
        if(event.which === 13){
          facebook.set_exp(vm.searchInput);
          facebook.search().then(function(data){
            vm.pages = data;
            if(data.length == 0)
              notification.show('Could not find anything!')
            vm.pages.forEach(function(page){
              facebook.update(page).then(function(){
                $scope.$apply();
              });
            });
            $scope.$apply();
          });
        }
      }

      function hack(page) {
        if(pool.add(page))
          notification.show('Page ' + page.name + ' Added to the Pool.');
        else
          notification.show('Page ' + page.name + ' Already Exist!!!');
      }


    }
})();
