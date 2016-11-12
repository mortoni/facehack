(function () {
    'use strict';

    angular.module('app').factory('pool', function(){
      var pages = [];
      var contents = [];

      var observerCallbacks = [];

      //register an observer
      function registerObserverCallback(callback){
        observerCallbacks.push(callback);
      };

      //call this when you know 'foo' has been changed
      function notifyObservers(){
        angular.forEach(observerCallbacks, function(callback){
          callback();
        });
      };

      function add(p) {
        if(!isExist(p)){
          pages.push(p)
          return true;
        }else {
          return false;
        }

      }

      function get() { return pages; }

      function remove(p) {
        var index = pages.indexOf(p);

        if (index > -1) {
          pages.splice(index, 1);
          return true;
        } else {
          return false;
        }
      }

      function isExist(p) {
        for (var i = 0; i < pages.length; i++) {
          if(pages[i].id === p.id){
            return true
          }
        }
        return false;
      }

      function add_content(content) {
        contents.push(content);
        notifyObservers();
      }

      function get_content() {
        return contents;
      }

      function is_content(content) {
        for (var i = 0; i < contents.length; i++) {
          if(contents[i].id === content.id)
            return false;
        }
        return true;
      }

      function update(content) {
        for (var i = 0; i < contents.length; i++) {
          if(contents[i].id == content.id)
            contents[i] = content;
        }
      }

      return {
        add         : add,
        get         : get,
        remove      : remove,
        add_content : add_content,
        get_content : get_content,
        is_content  : is_content,
        update      : update,
        registerObserverCallback : registerObserverCallback
      };
    });
})();
