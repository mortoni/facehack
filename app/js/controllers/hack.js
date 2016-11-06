(function(){
  'use strict';

  angular.module('app').controller('HackCtrl', HackCtrl);

    HackCtrl.$inject = ['$scope', 'pool', 'notification', 'facebook'];

    function HackCtrl($scope, pool, notification, facebook){
      var vm = this;

      vm.resume = resume;
      vm.remove = remove;
      vm.see = see;

      vm.pages = pool.get();
      vm.pause = false;

      activate();

      function activate() {
        vm.posts = pool.get_content();
      }

      function resume(page) {
        page.isPaused = !page.isPaused;
        notification.show('Page ' + page.name + ' ' + (page.isPaused ? 'Resumed!' : 'Paused'));

        setInterval(function() {
          vm.pages.forEach(function(p) {
            if(p.isPaused) {
              facebook.get_content(p).then(function(data){
                if(data) {
                  if(pool.is_content(data)){
                    pool.add_content(data);
                    notification.show('Found a new Content');
                  } else {
                    facebook.updata_content(data).then(function(content) {
                      pool.update(content);
                    });
                  }
                  vm.posts = pool.get_content();
                  $scope.$apply();
                }
              });
            }
          });
        }, 5000);
      }

      function remove(page) {
        if(pool.remove(page))
          notification.show('Page ' + page.name + ' Removed.');
        else
          notification.show('Page ' + page.name + ' Can not be removed.');
      }

      function see(page) {

        // var modalElem = $('#modalSlideUp');
        $('#modalContent').modal('show');
        $('#modalContent').children('.modal-dialog').removeClass('modal-lg');

      }
    }
})();
