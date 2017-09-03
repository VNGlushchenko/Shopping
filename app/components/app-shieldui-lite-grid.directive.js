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
            initShielduiLiteGrid: initShielduiLiteGrid
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
                            type: String
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
                      },
                      aggregate: [
                        {
                          field: 'productCost',
                          aggregate: function(data, aggregate) {
                            let sum = 0;
                            if (vm.shopping.model.shoppingList.length == 0) {
                              return 0;
                            } else {
                              for (let x in data) {
                                sum += data[x].productCost;
                              }
                              return +sum.toFixed(2);
                            }
                          }
                        }
                      ]
                    },
                    sorting: {
                      multiple: true
                    },
                    filtering: {
                      enabled: true
                    },
                    paging: true,
                    columns: [
                      {
                        field: 'purchaseDate',
                        title: 'Дата покупки',
                        width: '170px',
                        format: '{0:dd.MM.yyyy}'
                      },
                      {
                        field: 'categoryName',
                        title: 'Категория товара',
                        width: '170px',
                        editable: false
                      },
                      {
                        field: 'productName',
                        title: 'Товар',
                        width: '170px',
                        editable: false
                      },
                      {
                        field: 'productUnit',
                        title: 'Кол-во, шт/кг',
                        width: '130px'
                      },
                      {
                        field: 'productPrice',
                        title: 'Цена, грн',
                        width: '170px'
                      },
                      {
                        field: 'productCost',
                        title: 'Стоимость, грн',
                        width: '170px',
                        editable: false,
                        footerTemplate: 'Итого: {custom}' //'Итого: {sum}'
                      }
                    ],
                    events: {
                      edit: function(e) {
                        if (
                          $(e.cell.localName).parents('div.sui-gridcontent')
                            .length > 0
                        ) {
                          vm.model.indexLastEditedRow =
                            e.cell.parentElement.rowIndex;
                          vm.model.indexLastEditedCell = e.cell.cellIndex;
                        }
                      },
                      save: function(e) {
                        if (
                          vm.model.indexLastEditedCell == 3 ||
                          vm.model.indexLastEditedCell == 4
                        ) {
                          e.target.dataSource.data[
                            vm.model.indexLastEditedRow
                          ].productCost = +(+e.target.dataSource.data[
                            vm.model.indexLastEditedRow
                          ].productUnit *
                            +e.target.dataSource.data[
                              vm.model.indexLastEditedRow
                            ].productPrice).toFixed(2);
                          $($element)
                            .swidget()
                            .saveChanges();
                          console.log('from e.target.dataSource.data');
                          console.log(JSON.stringify(e.target.dataSource.data));
                          console.log(
                            'from $($element).swidget().dataSource.data'
                          );
                          console.log(
                            JSON.stringify(
                              $($element).swidget().dataSource.data
                            )
                          );
                        }
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

                  unbindCollectionWatcher(); //
                }
              } //
            ); //
          } //
        }
      ],
      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.asyncInitShielduiLiteGrid();
      }
    };
  }
})();
