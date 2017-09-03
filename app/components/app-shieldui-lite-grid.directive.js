(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appShielduiLiteGrid', appShielduiLiteGrid);

  function appShielduiLiteGrid() {
    return {
      restrict: 'A',
      controller: [
        'ShoppingModel',
        '$element',
        '$timeout',
        function(ShoppingModel, $element, $timeout) {
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

                      for (let x in data) {
                        sum += data[x].productCost;
                      }

                      return +sum.toFixed(2);
                    }
                  }
                ]
              },
              sorting: {
                multiple: true
              },
              paging: {
                pageSize: 10,
                pageLinksCount: 3,
                messages: {
                  infoBarTemplate: '{3} страница из {4}',
                  firstTooltip: 'Первая страница',
                  previousTooltip: 'Предыдущая страница',
                  nextTooltip: 'Следующая страница',
                  lastTooltip: 'Последняя страница'
                }
              },
              columns: [
                {
                  field: 'purchaseDate',
                  title: 'Дата покупки',
                  width: '170px',
                  format: '{0:dd.MM.yyyy}',
                  attributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  },
                  headerAttributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  }
                },
                {
                  field: 'categoryName',
                  title: 'Категория товара',
                  width: '170px',
                  editable: false,
                  headerAttributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  }
                },
                {
                  field: 'productName',
                  title: 'Товар',
                  width: '170px',
                  editable: false,
                  headerAttributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  }
                },
                {
                  field: 'productUnit',
                  title: 'Кол-во, шт/кг',
                  width: '130px',
                  attributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  },
                  headerAttributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  }
                },
                {
                  field: 'productPrice',
                  title: 'Цена, грн',
                  width: '170px',
                  attributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  },
                  headerAttributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  }
                },
                {
                  field: 'productCost',
                  title: 'Стоимость, грн',
                  width: '170px',
                  editable: false,
                  footerTemplate: 'Итого: {custom}',
                  attributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  },
                  headerAttributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  }
                }
              ],
              events: {
                edit: function(e) {
                  if (
                    $(e.cell.localName).parents('div.sui-gridcontent').length >
                    0
                  ) {
                    vm.model.indexLastEditedRow = e.cell.parentElement.rowIndex;
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
                      +e.target.dataSource.data[vm.model.indexLastEditedRow]
                        .productPrice).toFixed(2);
                    $($element)
                      .swidget()
                      .saveChanges();
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
          }
        }
      ],
      controllerAs: 'shielduiGridCtrl',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.asyncInitShielduiLiteGrid();
      }
    };
  }
})();
