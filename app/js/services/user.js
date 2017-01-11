(function () {
    'use strict';

    angular.module('app').factory('user', function(){
      var user;
      var isConnected;
      var observerCallbacks = [];

      //register an observer
      function registerObserverCallback(callback){
        observerCallbacks.push(callback);
      };

      //call this when you know 'isConnected' has been changed
      function notifyObservers(){
        angular.forEach(observerCallbacks, function(callback){
          callback();
        });
      };

      function set(u) { user =  u; }
      function current() {
        return user;
      }
      function id() {
        if(user)
          return user.uid;
        return undefined;
      }
      function logout() {
        user = {};
      }
      function setConnected(is) {
        isConnected = is;
        notifyObservers();
      }
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
        createDatabase: createDatabase,
        registerObserverCallback: registerObserverCallback
      };
    });
})();
