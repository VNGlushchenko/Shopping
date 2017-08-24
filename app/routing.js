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
          component: 'appShoppingList'
        })
        .state('shoppingStatistics', {
          url: '/statistics',
          component: 'appShoppingStatistics'
        });
    }
  ]);
})();
