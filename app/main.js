/* ============================================================
 * File: main.js
 * Main Controller to set global scope variables.
 * ============================================================ */
 (function(){
     'use strict';

angular.module('app')
    .controller('AppCtrl', ['$scope', '$rootScope', '$state', 'user', function($scope, $rootScope, $state, user) {

        // App globals
        $scope.app = {
            name: 'Pages',
            description: 'Admin Dashboard UI kit',
            layout: {
                menuPin: false,
                menuBehind: false,
                theme: 'pages/css/pages.css'
            },
            author: 'Revox'
        }
        // Checks if the given state is the current state
        $scope.is = function(name) {
            return $state.is(name);
        }

        // Checks if the given state/child states are present
        $scope.includes = function(name) {
            return $state.includes(name);
        }

        // Broadcasts a message to pgSearch directive to toggle search overlay
        $scope.showSearchOverlay = function() {
            $scope.$broadcast('toggleSearchOverlay', {
                show: true
            })
        }

        $scope.user = user.current();

    }]);
})();

(function(){
    'use strict';
angular.module('app')
    /*
        Use this directive together with ng-include to include a
        template file by replacing the placeholder element
    */

    .directive('includeReplace', function() {
        return {
            require: 'ngInclude',
            restrict: 'A',
            link: function(scope, el, attrs) {
                el.replaceWith(el.children());
            }
        };
    });
})();
