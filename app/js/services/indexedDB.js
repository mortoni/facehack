(function () {
    'use strict';
    angular.module('app').factory('indexedDB', [ 'notification',

      function(notification, config){
        var config;
        var database;
        var user;

        function get_config() {
          return new Promise(function(resolve, reject) {
            config = new IDBStore({
              dbVersion: 1,
              storeName: 'config',
              keyPath: 'config_id',
              autoIncrement: false,
              onStoreReady: function(){
                resolve(config);
              }
            });
          });
        }

        function get_database() {
          return new Promise(function(resolve, reject) {
            database = new IDBStore({
              dbVersion: 1,
              storeName: 'database',
              keyPath: 'database_id',
              autoIncrement: false,
              onStoreReady: function(){
                resolve(database);
              }
            });
          });
        }


        return {
          get_config  : get_config,
          get_database: get_database
        };
      }
    ]);
})();
