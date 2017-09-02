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
          vm.shopping = ShoppingModel;

          vm.model = {
            indexLastEditedRow: null,
            indexLastEditedCell: null
          };
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
                          categoryId: {
                            path: 'categoryId',
                            type: Number
                          },
                          categoryName: {
                            path: 'categoryName',
                            type: String
                          },
                          productId: {
                            path: 'productId',
                            type: Number
                          },
                          productName: {
                            path: 'productName',
                            type: String
                          },
                          productUnit: {
                            path: 'productUnit',
                            type: String
                          },
                          productPrice: {
                            path: 'productPrice',
                            type: Number
                          },
                          productCost: {
                            path: 'productCost',
                            type: Number
                          },
                          purchaseDate: {
                            path: 'purchaseDate',
                            type: Date
                          }
                        }
                      }
                    },
                    columns: [
                      {
                        field: 'categoryName',
                        title: 'Категория товара',
                        width: '150px',
                        editable: false
                      },
                      {
                        field: 'productName',
                        title: 'Товар',
                        width: '150px',
                        editable: false
                      },
                      {
                        field: 'productUnit',
                        title: 'Кол-во, шт/кг',
                        width: '150px'
                      },
                      {
                        field: 'productPrice',
                        title: 'Цена, грн',
                        width: '150px'
                      },
                      {
                        field: 'productCost',
                        title: 'Стоимость, грн',
                        width: '150px',
                        editable: false
                      },
                      {
                        field: 'purchaseDate',
                        title: 'Дата покупки',
                        width: '150px',
                        format: '{0:dd.MM.yyyy}'
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
                      },
                      edit: function(e) {
                        vm.model.indexLastEditedRow = e.row[0].rowIndex; //e.index результат такой же дает
                        vm.model.indexLastEditedCell = e.cell.cellIndex;
                        console.log('from event edit');
                        console.log(
                          'indexLastEditedRow = ' +
                            vm.model.indexLastEditedRow +
                            ', indexLastEditedCell = ' +
                            vm.model.indexLastEditedCell
                        );
                        console.log(e);
                        console.log(
                          JSON.stringify(
                            $($element)
                              .swidget()
                              .dataItem(e.index)
                          )
                        );
                      },
                      save: function(e) {
                        console.log('from event save');
                        console.log(e);
                      }
                    },
                    editing: {
                      enabled: true,
                      event: 'click',
                      type: 'cell',
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

                  $($element)[0].nextSibling.nodeValue = '';
                  $($element)
                    .next()
                    .remove();

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
          }
        }
      ],
      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.asyncInitShielduiLiteGrid();

        elem.bind('click', function(e) {
          console.log('from click rowIndex');
          console.log(
            $(e.target)
              .parent('tr')
              .index()
          );
          console.log('from click cellIndex');
          console.log($(e.target).index());
        });
      }
    };
  }
})();
