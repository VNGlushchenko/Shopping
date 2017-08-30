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

          vm.menu = {
            apply: apply,
            initShielduiLiteGrid: initShielduiLiteGrid,
            refreshShielduiLiteGrid: refreshShielduiLiteGrid
          };

          function apply() {
            return $scope.$apply();
          }

          function initShielduiLiteGrid() {
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
                    ],
                    events: {
                      dataBound: function(e) {
                        console.log(e);
                        $scope.$watchCollection(
                          function() {
                            return vm.shopping.model.shoppingList;
                          },
                          function(newShoppingList, oldShoppingList) {
                            if (
                              newShoppingList.length > oldShoppingList.length
                            ) {
                              vm.menu.refreshShielduiLiteGrid(e.target);
                            }
                          }
                        );
                      }
                    }
                  });
                  /*                   let grid = $($element).swidget();
                  console.log(grid); */
                  unbindCollectionWatcher();
                  //vm.menu.apply();
                }
              }
            );
          }

          function refreshShielduiLiteGrid(elem) {
            let options = elem.initialOptions;
            options.dataSource.data = vm.shopping.model.shoppingList;
            console.log(options);
            elem.refresh(options);
          }
        }
      ],
      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.initShielduiLiteGrid();
      }
    };
  }
})();
