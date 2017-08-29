(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appShielduiLiteGrid', appShielduiLiteGrid);

  function appShielduiLiteGrid() {
    return {
      restrict: 'A',
      controller: [
        '$watchCollection',
        'ShoppingModel',
        '$element',
        function($watchCollection, ShoppingModel, $element) {
          this.shopping = ShoppingModel;

          this.initShielduiLiteGrid = function() {
            let originalShoppingListLength = 0;

            let unbindCollectionWatcher = this.$watchCollection(
              this.shopping.model.shoppingList,
              function(newshoppingList, oldshoppingList) {
                if (newshoppingList.length == originalShoppingListLength) {
                  $($element).shieldGrid({
                    dataSource: {
                      data: this.shopping.model.shoppingList,
                      schema: {
                        fields: {
                          product: { type: 'string' }
                        }
                      }
                    },
                    columns: [
                      {
                        field: 'product',
                        title: 'Producr Name',
                        width: '170px'
                      }
                    ]
                  });

                  unbindCollectionWatcher();
                }
              }
            );
          };
        }
      ],
      link: function(scope, elem, attrs, ctrl) {
        ctrl.initShielduiLiteGrid();
      }
    };
  }
})();
