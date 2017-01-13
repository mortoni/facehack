(function () {
    'use strict';

    angular.module('app').factory('user', ['config', 'indexedDB',

    function(config, indexedDB){

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
          var configIDB = indexedDB.get_config();
          var new_config = {
            limit: 15,
            automactly: true
          };

          if(!snapshot.val()) {
            // first time
            firebase.database().ref('contents/' + user.uid + '/config')
              .set(new_config).then(function(result) {
                configIDB.then(function(data) {
                  new_config.id = user.uid;
                  data.put({config: new_config});
                });
              });
          } else {
            configIDB.then(function(idb) {
              var config = snapshot.val().config;
              config.user = {};
              config.user.uid = user.uid;
              config.user.email = user.email;
              config.user.displayName = user.displayName;
              idb.clear();
              idb.put({config: config});
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
    }]);
})();
