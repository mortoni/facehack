(function(){
  'use strict';

  angular.module('app').controller('HackCtrl', HackCtrl);

    HackCtrl.$inject = ['$scope', 'pool', 'notification', 'facebook', '$sce'];

    function HackCtrl($scope, pool, notification, facebook, $sce){
      var vm = this;

      vm.resume = resume;
      vm.remove = remove;
      vm.see = see;
      vm.trustSrc = trustSrc;
      vm.help_content = help_content;
      vm.help_pool = help_pool;
      vm.graph = graph;
      vm.addDatabase = addDatabase;

      vm.pages = pool.get();
      vm.pause = false;

      activate();

      function activate() {
        vm.posts = pool.get_content();
        run();
      }

      function resume(page) {
        page.isPaused = !page.isPaused;
        notification.show('Page ' + page.name + ' ' + (page.isPaused ? 'Resumed!' : 'Paused'));
      }

      function remove(page) {
        if(pool.remove(page))
          notification.show('Page ' + page.name + ' Removed.');
        else
          notification.show('Page ' + page.name + ' Can not be removed.');
      }

      function trustSrc() {
        if(typeof vm.selected !== 'undefined')
          return $sce.trustAsResourceUrl(vm.selected.source+"?:embed=yes");
      }

      function see(content) {
        vm.selected = content;
        $('#modalContent').modal('show');
        $('#modalContent').children('.modal-dialog').removeClass('modal-lg');
      }

      function help_content() {
        $('#modalContentHelp').modal('show');
        $('#modalContentHelp').children('.modal-dialog').removeClass('modal-lg');
      }

      function help_pool() {
        $('#modalPoolHelp').modal('show');
        $('#modalPoolHelp').children('.modal-dialog').removeClass('modal-lg');
      }

      function run() {
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

      function graph(content) {

      }

      function addDatabase(content) {
        
      }
    }
})();
