(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appShielduiLiteGrid', appShielduiLiteGrid);

  function appShielduiLiteGrid() {
    return {
      restrict: 'A',
      controller: [
        '$scope',
        'ShoppingModel',
        '$element',
        function($scope, ShoppingModel, $element) {
          let vm = this;

          vm.shopping = ShoppingModel;

          vm.initShielduiLiteGrid = function() {
            let unbindCollectionWatcher = $scope.$watchCollection(
              function() {
                return vm.shopping.model.shoppingList;
              },
              function(newShoppingList, oldShoppingList) {
                if (newShoppingList.length > oldShoppingList.length) {
                  $($element).shieldGrid({
                    dataSource: {
                      data: vm.shopping.model.shoppingList,
                      schema: {
                        fields: {
                          product: { type: 'string' }
                        }
                      }
                    },
                    columns: [
                      {
                        field: 'product',
                        title: 'Товар',
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
