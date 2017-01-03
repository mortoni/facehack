(function () {
  'use strict';

  var fckDatabase = {
    controllerAs: 'vm',
    restrict: 'E',
    bindings: {},
    templateUrl : 'components/database/database.tpl.html',
    controller: function(notification, user, $scope) {
      var db;
      var vm = this;
      vm.database = [];

      vm.see = see;
      vm.remove = remove;

      var ref = firebase.database().ref('contents/' + user.id() + '/database');
      ref.on('value', function(snapshot) {
        db = snapshot.val();

        _(db).each(function(elem, key){
          vm.database.push({
            uid: key,
            data: elem
          });
          $scope.$apply();
          db[key] = _(elem).values();
        });
      });

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
            console.log("Remove succeeded.");
            //TODO here
            //notification.show('Content added to your database');
          }).catch(function(error) {
            console.log("Remove failed: " + error.message);
          });
      }
    }
  }

  angular
    .module('component.database', [])
    .component('fckDatabase', fckDatabase);

})();
