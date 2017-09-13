(function() {
  'use strict';

  angular
    .module('shopping', ['ui.router', 'ngResource', 'ngMessages', 'toastr'])
    .constant('apiUrl', 'app/php')
    .config([
      'toastrConfig',
      function(toastrConfig) {
        angular.extend(toastrConfig, {
          closeButton: true,
          preventOpenDuplicates: true,
          positionClass: 'toast-bottom-right'
        });
      }
    ]);
})();
