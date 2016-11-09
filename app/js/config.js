(function(){
     'use strict';
     angular.module('app').run(['$state', 'user', '$rootScope', function($state, user, $rootScope) {
       // Initialize Firebase
       // Initialize Firebase
        var config = {
          apiKey: "AIzaSyBSzvDKKvxUk-PSCCzl9MwZliSlL5Qxii8",
          authDomain: "facehack-19ecb.firebaseapp.com",
          databaseURL: "https://facehack-19ecb.firebaseio.com",
          storageBucket: "facehack-19ecb.appspot.com",
          messagingSenderId: "446086108038"
        };

        firebase.initializeApp(config);

        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
          var requireLogin = toState.data.requireLogin;

          if (requireLogin && typeof user.current() === 'undefined') {
            event.preventDefault();
            $state.go('core.login');
          }
        });

     }]);
})();
