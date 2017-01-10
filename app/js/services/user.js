(function () {
    'use strict';

    angular.module('app').factory('user', function(){
      var user;
      var isConnected;

      function set(u) { user =  u; }
      function current() {
        return user;
      }
      function id() {
        if(user)
          return user.uid;
      }
      function logout() {
        user = {};
      }
      function setConnected(is) {isConnected = is;}
      function getConnected() {return isConnected;}

      return {
        set      : set,
        current  : current,
        logout   : logout,
        id       : id,
        setConnected: setConnected,
        getConnected: getConnected
      };
    });
})();
