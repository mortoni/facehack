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



    }
  }

  angular
    .module('component.database', [])
    .component('fckDatabase', fckDatabase);

})();
