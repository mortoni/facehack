(function () {
    'use strict';

    angular.module('app').factory('user', function(){
      var user;

      function set(u) { user =  u; }
      function current() {
        return user;
      }
      function id() {
        return user.uid;
      }
      function logout() {
        user = {};
      }

      return {
        set      : set,
        current  : current,
        logout   : logout,
        id       : id
      };
    });
})();
