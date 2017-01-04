(function () {
  'use strict';

  var fckDatabase = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/database/database.tpl.html',
    controller: function(notification, user, $scope, facebook) {
      var db;
      var vm = this;

      vm.see = see;
      vm.remove = remove;
      vm.refresh = refresh;

      if(user.id())
        var ref = firebase.database().ref('contents/' + user.id() + '/database');

      var promise = new Promise(function(resolve, reject) {
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
          resolve('yeah');
        });
      });

      promise.then(function(data) {
        $scope.$apply();
      });


      function refresh(content) {
        facebook.refresh(content.data).then(function(data) {
          notification.show('Content updated(table only) succeeded.');
          $scope.$apply();
        })
      }

      function see(content) {
        vm.selected = content.data;
        $('#modalContent').modal('show');
        $('#modalContent').children('.modal-dialog')
          .removeClass('modal-lg');
      }

      function remove(content) {
        var test = content;
        firebase.database()
          .ref('contents/' + user.id() + '/database/' + content.uid)
          .remove().then(function() {
            notification.show('Content removed succeeded.');
          }).catch(function(error) {
            notification.show('Remove failed.');
          });
      }
    }
  }

  angular
    .module('component.database', [])
    .component('fckDatabase', fckDatabase);
})();
