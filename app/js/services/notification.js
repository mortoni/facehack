(function () {
    'use strict';

    angular.module('app').factory('notification', function(){

      function show (message){
        $('body').pgNotification({
            style: 'flip',
            message: message,
            position: 'top-right',
            timeout: 5000,
            type: 'success'
        }).show();
      }

      return {
        show : show
      }
    });
})();
