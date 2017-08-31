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
            destroyPreviousShoppingListWatcher: null,
            createNewShoppingListWatcher: createNewShoppingListWatcher
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
                          categoryId: { path: 'categoryId', type: Number },
                          categoryName: { path: 'categoryName', type: String },
                          productId: { path: 'productId', type: Number },
                          productName: { path: 'productName', type: String },
                          productPrice: { path: 'productPrice', type: Number },
                          purchaseDate: {
                            function() {
                              return new Date().toJSON();
                            },
                            type: Date
                          }
                        }
                      }
                    },
                    columns: [
                      {
                        field: 'categoryName',
                        title: 'Категория товара',
                        width: '150px'
                      },
                      {
                        field: 'productName',
                        title: 'Товар',
                        width: '150px'
                      },
                      {
                        field: 'productPrice',
                        title: 'Цена, грн',
                        width: '150px'
                      },
                      {
                        field: 'purchaseDate',
                        title: 'Дата покупки',
                        width: '150px',
                        format: '{0:MM/dd/yyyy}'
                      }
                    ],
                    events: {
                      dataBound: function(e) {
                        if (vm.menu.destroyPreviousShoppingListWatcher) {
                          vm.menu.destroyPreviousShoppingListWatcher();
                          vm.menu.destroyPreviousShoppingListWatcher = null;
                          vm.menu.destroyPreviousShoppingListWatcher = createNewShoppingListWatcher(
                            e.target
                          );
                        } else {
                          vm.menu.destroyPreviousShoppingListWatcher = createNewShoppingListWatcher(
                            e.target
                          );
                        }
                      }
                    },
                    editing: {
                      enabled: true,
                      event: 'click',
                      type: 'cell',
                      batch: true,
                      confirmation: {
                        delete: {
                          enabled: true,
                          template: function(item) {
                            return 'Delete row with ID = ' + item.ID;
                          }
                        }
                      }
                    }
                  });

                  unbindCollectionWatcher();
                }
              }
            );
          }

          function createNewShoppingListWatcher(gridElem) {
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
            console.log(JSON.stringify(options));
          }
        }
      ],
      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.asyncInitShielduiLiteGrid();
      }
    };
  }
})();
