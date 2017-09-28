(function() {
  'use strict';

  angular
    .module('shopping', ['ui.router', 'ngResource', 'ngMessages', 'toastr'])
    .constant('apiUrl', 'app/php')
    .run([
      'toastrConfig',
      '$rootScope',
      '$transitions',
      function(toastrConfig, $rootScope, $transitions) {
        angular.extend(toastrConfig, {
          closeButton: true,
          preventOpenDuplicates: true,
          positionClass: 'toast-bottom-right'
        });

        $transitions.onSuccess(
          {
            to: 'shoppingStatistics',
            from: 'shoppingList'
          },
          function() {
            $rootScope.$emit('statisticsDataLoaded');
          }
        );
      }
    ]);
})();
