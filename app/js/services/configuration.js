(function () {
    'use strict';

    angular.module('app').factory('config', function(){
      var range;
      var automactly = true;

      function get_range() {return range;}
      function set_range(r) {range = r;}
      function get_auto() {return automactly;}
      function set_auto(a) {automactly = a;}

      return {
        get_range  : get_range,
        set_range  : set_range,
        get_auto   : get_auto,
        set_auto   : set_auto
      };
    });
})();
