(function () {
    'use strict';

    angular.module('app').factory('facebook', function(){
      var expression;
      var target;
      var limit = 30;
      var pages = [];

      function set_exp(e) {expression = e;}
      function get_exp() {return expression;}
      function set_target(t) {target = t;}
      function get_target() {return target;}
      function set_limit(l) {limit = l;}
      function get_pages() {return pages;}


      function search() {
        return new Promise(function(resolve, reject) {
          FB.api("/search?q=" + expression + "&type=page&limit=" + limit,
          function (response) {
            if (response && !response.error) {
                pages = response.data;
                resolve(pages);
            } else {
                reject();
              //TODO error handle
            }
          });
        });
      }

      function update(page) {
        return new Promise(function(resolve, reject){
          FB.api("/"+page.id+"/?fields=category,about,picture,cover,fan_count",
          function (response) {
            if (response && !response.error) {
              page.about = response.about;
              page.category = response.category;
              page.cover = response.cover.source;
              page.fan_count = response.fan_count;
              page.picture = response.picture.data.url;
              resolve(page);
            } else {
              reject();
              //TODO error handle
            }
          });
        });
      }

      return {
        set_target  : set_target,
        get_target  : get_target,
        set_limit   : set_limit,
        search      : search,
        set_exp     : set_exp,
        get_exp     : get_exp,
        get_pages   : get_pages,
        update      : update
      };
    });
})();
