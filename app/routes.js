(function(){
    'use strict';
    angular.module('app').config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('/app/dashboard');
            $stateProvider
                .state('app', {
                    abstract: true,
                    url: "/app",
                    templateUrl: "views/app/app.html",
                    data: {
                      requireLogin: true
                    }
                })
                .state('app.dashboard', {
                    url: "/dashboard",
                    templateUrl: "views/app/dashboard.html",
                    controller: 'DashboardCtrl',
                    controllerAs: 'vm'
                })
                .state('core', {
                    abstract: true,
                    url: "/core",
                    template: '<div ui-view></div>',
                    data: {
                      requireLogin: false
                    }
                })
                .state('core.login', {
                    url: "/login",
                    templateUrl: "views/core/login.html",
                    controller: 'LoginCtrl',
                    controllerAs: 'vm'
                })

                ;
        }
    ]);
})();
