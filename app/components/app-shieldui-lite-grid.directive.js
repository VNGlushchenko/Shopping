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
        '$timeout',
        function($scope, ShoppingModel, $element, $timeout) {
          let vm = this;
          vm.refreshCounter = 0;
          vm.shopping = ShoppingModel;

          vm.menu = {
            asyncInitShielduiLiteGrid: asyncInitShielduiLiteGrid,
            initShielduiLiteGrid: initShielduiLiteGrid,
            refreshShielduiLiteGrid: refreshShielduiLiteGrid,
            destroyPreviousShoppingListnWatcher: null,
            createNewShoppingListnWatcher: createNewShoppingListnWatcher
          };

          function asyncInitShielduiLiteGrid() {
            $timeout(initShielduiLiteGrid, 0);
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
                          product: {
                            type: 'string'
                          }
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
                        if (vm.menu.destroyPreviousCollectionWatcher) {
                          vm.menu.destroyPreviousCollectionWatcher();
                          vm.menu.destroyPreviousCollectionWatcher = null;
                          vm.menu.destroyPreviousCollectionWatcher = createNewShoppingListnWatcher(
                            e.target
                          );
                        } else {
                          vm.menu.destroyPreviousCollectionWatcher = createNewShoppingListnWatcher(
                            e.target
                          );
                        }
                      }
                    }
                  });

                  unbindCollectionWatcher();
                }
              }
            );
          }

          function createNewShoppingListnWatcher(gridElem) {
            return $scope.$watchCollection(
              function() {
                return vm.shopping.model.shoppingList;
              },
              function(newShoppingList, oldShoppingList) {
                if (newShoppingList.length > oldShoppingList.length) {
                  vm.menu.refreshShielduiLiteGrid(gridElem);
                }
              }
            );
          }

          function refreshShielduiLiteGrid(gridElem) {
            let options = gridElem.initialOptions;
            options.dataSource.data = vm.shopping.model.shoppingList;
            gridElem.refresh(options);
            vm.refreshCounter++;
            console.log('refresh #' + vm.refreshCounter);
            console.log(options);
          }
        }
      ],
      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.asyncInitShielduiLiteGrid();
      }
    };
  }
})();
