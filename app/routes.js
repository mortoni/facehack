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
                    templateUrl: "views/app/app.html"
                })
                .state('app.dashboard', {
                    url: "/dashboard",
                    templateUrl: "views/dashboard.html",
                    controller: 'DashboardCtrl',
                    controllerAs: 'vm'
                })
                .state('core', {
                    abstract: true,
                    url: "/core",
                    template: '<div ui-view></div>'
                });
        }
    ]);
})();
