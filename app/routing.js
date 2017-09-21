(function() {
  'use strict';

  angular.module('shopping').config([
    '$stateProvider',
    '$locationProvider',
    function($stateProvider, $locationProvider) {
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('shoppingList', {
          url: '/',
          templateUrl: 'app/components/app-shopping-list.template.html'
        })
        .state('shoppingStatistics', {
          url: '/statistics',
          templateUrl: 'app/components/app-shopping-statistics.template.html'
        });
    }
  ]);
})();
