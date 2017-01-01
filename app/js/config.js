(function(){
     'use strict';
     angular.module('app').run(
       ['$state', 'user', '$rootScope', 'pool', 'facebook', 'notification',
     function($state, user, $rootScope, pool, facebook, notification) {
       // Initialize Firebase
        var config = {
          apiKey: "AIzaSyBSzvDKKvxUk-PSCCzl9MwZliSlL5Qxii8",
          authDomain: "facehack-19ecb.firebaseapp.com",
          databaseURL: "https://facehack-19ecb.firebaseio.com",
          storageBucket: "facehack-19ecb.appspot.com",
          messagingSenderId: "446086108038"
        };

        firebase.initializeApp(config);

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
        });

        setInterval(function() {
          var pages = pool.get();

          pages.forEach(function(p) {
            if(p.isPaused) {
              facebook.get_content(p).then(function(data){
                if(data) {
                  Logger.info('An object, but not via Logger.data, expanded: ', data, false, true);
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
