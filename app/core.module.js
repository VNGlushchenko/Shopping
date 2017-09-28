(function() {
  'use strict';

  angular
    .module('shopping', ['ui.router', 'ngMessages', 'toastr'])
    .constant('apiUrl', 'app/php')
    .run([
      'toastrConfig',
      '$rootScope',
      '$transitions',
      'ShoppingModel',
      function(toastrConfig, $rootScope, $transitions, ShoppingModel) {
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

            ShoppingModel.model.goodsCatalog.length = 0;
            ShoppingModel.model.newProductName = '';
            ShoppingModel.model.newProductErrorText = '';
            ShoppingModel.model.categoriesList.length = 0;
            ShoppingModel.model.previousShoppingList.length = 0;
            ShoppingModel.model.actualShoppingListLength = 0;
            ShoppingModel.model.categoriesTotalCosts.length = 0;
            ShoppingModel.model.shielduiGridRepository.length = 0;
          }
        );
      }
    ]);
})();
