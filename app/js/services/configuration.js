(function () {
    'use strict';

    angular.module('app').factory('config', function(){
      var range;
      var automactly = true;
      var code;

      function get_range() {return range;}
      function set_range(r) {range = r;}
      function get_auto() {return automactly;}
      function set_auto(a) {automactly = a;}
      function set_code(c) {code = c;}
      function get_code() {return code;}
      function set(config) {
        range = config.limit;
        automactly = config.automactly;
        code = config.code;
      }

      function get() {
        return {
          range     : range,
          automactly: automactly,
          code      : code
        }
      }

      return {
        get_range  : get_range,
        set_range  : set_range,
        get_auto   : get_auto,
        set_auto   : set_auto,
        set_code   : set_code,
        get_code   : get_code,
        set        : set,
        get        : get
      };
    });
})();
