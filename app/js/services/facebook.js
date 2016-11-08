(function () {
    'use strict';
    angular.module('app').factory('facebook', [ 'notification', 'config',

    function(notification, config){

      var expression;
      var target;
      var limit = 15;
      var pages = [];

      function set_exp(e) {expression = e;}
      function get_exp() {return expression;}
      function set_target(t) {target = t;}
      function get_target() {return target;}
      function set_limit(l) {limit = l;}
      function get_limit() {return limit;}
      function get_pages() {return pages;}


      function search() {
        return new Promise(function(resolve, reject) {
          FB.api("/search?q=" + expression + "&type=page&limit=" + limit,
          function (response) {
            if (response && !response.error) {
                pages = response.data;
                resolve(pages);
            } else {
                notification.show('Something went wrong!');
                reject();
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
              if(typeof response.cover !== 'undefined')
                page.cover = response.cover.source;
              page.fan_count = response.fan_count;
              page.picture = response.picture.data.url;
              page.isPaused = config.get_auto();
              resolve(page);
            } else {
              notification.show('Something went wrong!');
              reject();
            }
          });
        });
      }

      function content(data, page) {
        var content = {
          page          : page,
          comments      : data.comments     ? data.comments.summary.total_count : 0 ,
          created_time  : data.created_time ? data.created_time : '',
          full_picture  : data.full_picture ? data.full_picture : '',
          id            : data.id           ? data.id : 0,
          likes         : data.likes        ? data.likes.summary.total_count : 0,
          link          : data.link         ? data.link : '',
          message       : data.message      ? data.message : '',
          shares        : data.shares       ? data.shares.count : 0,
          type          : data.type         ? data.type : '',
          source        : data.source       ? data.source : ''
        }
        // content.shares

        return content;
      }

      function get_content(page) {
        return new Promise(function(resolve, reject){
            FB.api(
            "/" + page.id + "/feed?fields=message,full_picture,link,source,type,created_time,shares,comments.summary(true),likes.summary(true)&limit=1",
            function (response) {
                if (response && !response.error) {
                  var post = content(response.data[0], page);
                  if(isHourAgo(post))
                    resolve(post);
                  resolve();
                } else {
                  notification.show(''+response.error)
                }
            });
        });
      }

      function isHourAgo(post) {
        var hourPost = new Date(post.created_time).getHours();
        var hourNow = new Date().getHours();
        var minutesPost = new Date(post.created_time).getMinutes();
        var minutesNow = new Date().getMinutes();

        if((hourNow - hourPost <= 1) && (hourNow - hourPost >= 0)){
          if(minutesPost <= minutesNow)
            return true;
        }
        return false;
      }

      function updata_content(content){
        return new Promise(function(resolve, reject) {
          FB.api(
          "/" + content.id + "?fields=source,comments.limit(0).summary(true),likes.limit(0).summary(true),shares.limit(0).summary(true),full_picture,link",
          function (response) {
              if (response && !response.error) {
                content.full_picture  = response.full_picture || content.full_picture;
                content.likes         = response.likes.summary.total_count || content.likes;
                content.link          = response.link || content.link;
                content.comments      = response.comments.summary.total_count || content.comments;
                content.shares        = response.shares ? response.shares.count : content.shares;
                content.source        = response.source ? response.source : content.source;
                resolve(content);
              } else {
                notification.show(''+response.error)
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
        update      : update,
        get_limit   : get_limit,
        get_content : get_content,
        updata_content : updata_content
      };
    }]);
})();
