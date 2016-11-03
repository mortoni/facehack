(function () {
    'use strict';

    angular.module('app').factory('user', function(){
      var user;

      function set(u) { user =  u; }
      function current() { return user; }

      return {
        set      : set,
        current  : current
      };
    });
})();
