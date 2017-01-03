(function () {
  'use strict';

  var fckContentsPool = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/contents-pool/contents-pool.tpl.html',
    controller: function(pool, $scope, $sce, user, notification) {
      var db;
      var vm = this;

      vm.posts = pool.get_content();

      setInterval(function() {
        vm.posts = pool.get_content();
        $scope.$apply();
      }, 5000);

      vm.help = help;
      vm.see = see;
      vm.graph = graph;
      vm.addDatabase = addDatabase;
      vm.trustSrc = trustSrc;

      var ref = firebase.database().ref('contents/' + user.id() + '/database');

      ref.on('value', function(snapshot) {
        db = snapshot.val();
        vm.database = [];

        _(db).each(function(elem, key){
          vm.database.push({
            uid: key,
            data: elem
          });
          db[key] = _(elem).values();
        });
      });

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
        var flag = true;
        vm.database.forEach(function(post) {
          if(post.data.id === content.id) {
            notification.show('Content already exist into your database');
            flag = false;
          }
        });

        if(flag) {
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
