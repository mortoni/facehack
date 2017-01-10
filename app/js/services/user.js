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

      function createDatabase() {
        return firebase.database().ref('contents/' + user.uid).once('value')
        .then(function(snapshot) {
          if(!snapshot.val()) {
            firebase.database().ref('contents/' + user.uid + '/config')
              .set({
                limit: 15,
                automactly: true
              });
            // firebase.database().ref('contents/' + user.uid + '/database').set({});
          }
        });
      }

      return {
        set      : set,
        current  : current,
        logout   : logout,
        id       : id,
        setConnected: setConnected,
        getConnected: getConnected,
        createDatabase: createDatabase
      };
    });
})();
