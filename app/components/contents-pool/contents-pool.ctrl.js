(function () {
  'use strict';

  var fckContentsPool = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/contents-pool/contents-pool.tpl.html',
    controller: function(pool, $scope, $sce, user, notification) {
      var vm = this;

      vm.posts = pool.get_content();

      var update = function(){
        vm.posts = pool.get_content();
        $scope.$apply();
      }

      pool.registerObserverCallback(update);

      vm.help = help;
      vm.see = see;
      vm.graph = graph;
      vm.addDatabase = addDatabase;
      vm.trustSrc = trustSrc;

      function help() {
        $('#modalContentHelp').modal('show');
        $('#modalContentHelp').children('.modal-dialog').removeClass('modal-lg');
      }

      function see(content) {
        vm.selected = content;
        $('#modalContent').modal('show');
        $('#modalContent').children('.modal-dialog')
          .removeClass('modal-lg');
      }

      function graph(content) {

      }

      function addDatabase(content) {

        if(_.isUndefined(content.isAdded))
          content.isAdded = true;
        else
          return;

        firebase.database().ref('contents/' + user.id() + '/database').push({
          comments    : content.comments,
          created_time: content.created_time,
          full_picture: content.full_picture,
          id          : content.id,
          likes       : content.likes,
          link        : content.link,
          message     : content.message,
          page: {
            about     : content.page.about,
            id        : content.page.id,
            category  : content.page.category,
            cover     : content.page.cover,
            fan_count : content.page.fan_count,
            name      : content.page.name,
            picture   : content.page.picture
          },
          shares      : content.shares,
          source      : content.source,
          type        : content.type
        });

        notification.show('Content added to your database');
      }



      function trustSrc() {
        if(!_.isUndefined(vm.selected))
          return $sce.trustAsResourceUrl(vm.selected.source);
      }

    }
  }

  angular
    .module('component.contents-pool', [])
    .component('fckContentsPool', fckContentsPool);

})();
