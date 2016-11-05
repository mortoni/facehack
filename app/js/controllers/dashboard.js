(function(){
  'use strict';

  angular.module('app').controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope', 'user', 'facebook'];

    function DashboardCtrl($scope, user, facebook){
      var vm = this;

      vm.searchBox = searchBox;

      vm.user = user.current();

      function activate() {

      }

      function searchBox(event) {
        if(event.which === 13){
          facebook.set_exp(vm.searchInput);
          facebook.search().then(function(data){
            vm.pages = data;
            vm.pages.forEach(function(page){
              facebook.update(page).then(function(){
                $scope.$apply();
              });
            });
            $scope.$apply();
          });
        }
      }


    }
})();
