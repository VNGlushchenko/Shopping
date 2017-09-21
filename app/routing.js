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
          templateUrl: 'app/components/app-shopping-list.template.html',
          onExit: [
            'ShoppingModel',
            function(ShoppingModel) {
              ShoppingModel.model.goodsCatalog.length = 0;
              ShoppingModel.model.newProductName = '';
              ShoppingModel.model.newProductErrorText = '';
              //ShoppingModel.model.categoriesList.length = 0;
              ShoppingModel.model.previousShoppingList.length = 0;
              ShoppingModel.model.actualShoppingListLength = 0;
              ShoppingModel.model.categoriesTotalCosts.length = 0;
              ShoppingModel.model.shielduiGridRepository.length = 0;
            }
          ]
        })
        .state('shoppingStatistics', {
          url: '/statistics',
          templateUrl: 'app/components/app-shopping-statistics.template.html'
        });
    }
  ]);
})();
