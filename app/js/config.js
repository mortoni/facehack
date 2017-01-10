(function(){
     'use strict';
     angular.module('app').run(
       ['$state', 'user', '$rootScope', 'pool', 'facebook', 'notification', 'Logger',
     function($state, user, $rootScope, pool, facebook, notification, Logger) {
       // Initialize Firebase
        var config = {
          apiKey: "AIzaSyBSzvDKKvxUk-PSCCzl9MwZliSlL5Qxii8",
          authDomain: "facehack-19ecb.firebaseapp.com",
          databaseURL: "https://facehack-19ecb.firebaseio.com",
          storageBucket: "facehack-19ecb.appspot.com",
          messagingSenderId: "446086108038"
        };

        firebase.initializeApp(config);

        var connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", function(snap) {
          if (snap.val() === true) {
            user.setConnected(true);
            notification.show('You are connected with Internet');
          } else {
            user.setConnected(false);
            $rootScope.connected = false;
            notification.show('You are NOT connected with Internet');
          }
        });

        window.onbeforeunload = function () {
          firebase.auth().signOut()
          user.logout();
        };

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
          var requireLogin = toState.data.requireLogin;

          if (requireLogin && _.isUndefined(user.current())) {
            event.preventDefault();
            $state.go('core.login');
          }

          // if(!user.getConnected()) {
          //   event.preventDefault();
          //   $state.go('app.content');
          // }
        });

        setInterval(function() {
          var pages = pool.get();

          pages.forEach(function(p) {
            if(p.isPaused) {
              facebook.get_content(p).then(function(data){
                if(data) {
                  Logger.info('A post found, expanded: ', data, false, true);
                  if(pool.is_content(data)){
                    pool.add_content(data);
                    notification.show('Found a new Content');
                  } else {
                    facebook.updata_content(data).then(function(content) {
                      pool.update(content);
                    });
                  }
                }
              });
            }
          });
        }, 5000);

     }]);
})();
