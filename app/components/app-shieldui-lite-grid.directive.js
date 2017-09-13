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
        'toastr',
        '$rootScope',
        function(ShoppingModel, $element, $timeout, toastr, $rootScope) {
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
                data: [],
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
                      type: String,
                      validator: function(value) {
                        value = +value.replace(',', '.');
                        return (typeof value === 'number' && isNaN(value)) ||
                        value <= 0
                          ? undefined
                          : +value.toFixed(3);
                      }
                    },
                    productPrice: {
                      path: 'productPrice',
                      type: String,
                      validator: function(value) {
                        value = +value.replace(',', '.');
                        return (typeof value === 'number' && isNaN(value)) ||
                        value <= 0
                          ? undefined
                          : +value.toFixed(3);
                      }
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
              paging: false,
              scrolling: true,
              height: 528,
              toolbar: [
                {
                  buttons: [
                    {
                      cls: 'save',
                      commandName: 'details',
                      caption: 'Сохранить покупки в архив',
                      click: function(e) {
                        vm.shopping.menu
                          .saveSalesReceipt({
                            salesReceipt: $($element).swidget().dataSource.data,
                            salesReceiptId: Date.now()
                          })
                          .then(
                            response => {
                              vm.shopping.model.actualShoppingListLength = 0;
                              $($element).swidget().dataSource.data.length = 0;
                              toastr.success(response.data);
                            },
                            error => {
                              toastr.error(error.data, 'Ошибка!');
                              console.log(error);
                            }
                          );
                      }
                    }
                  ]
                }
              ],
              columns: [
                {
                  field: 'purchaseDate',
                  title: 'Дата покупки',
                  width: '120px',
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
                  width: '150px',
                  editable: false,
                  headerAttributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  }
                },
                {
                  field: 'productName',
                  title: 'Товар',
                  width: '140px',
                  editable: false,
                  headerAttributes: {
                    class: 'table-cell',
                    style: 'text-align: center;'
                  }
                },
                {
                  field: 'productUnit',
                  title: 'Кол-во, шт/кг',
                  width: '120px',
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
                  width: '80px',
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
                  width: '100px',
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
                },
                {
                  title: ' ',
                  buttons: [
                    {
                      cls: 'deleteButton',
                      commandName: 'delete',
                      caption:
                        '<span class="glyphicon glyphicon-remove" aria-hidden="true" style="color: red; border-color: red;"></span>'
                    }
                  ],
                  width: '50px'
                }
              ],
              events: {
                error: function(e) {
                  switch (e.path) {
                    case 'productUnit':
                      e.editor.element.addClass('invalid-back invalid-border');
                      toastr.error('Введите число больше нуля.', 'Ошибка');
                      break;
                    case 'productPrice':
                      e.editor.element.addClass('invalid-back invalid-border');
                      toastr.error('Введите число больше нуля.', 'Ошибка');
                      break;
                    default:
                      break;
                  }
                },
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

                    // categoriesTotalCosts filling

                    vm.shopping.menu.calcCategoriesTotalCosts(
                      $($element).swidget().dataSource.data
                    );
                    vm.shopping.menu.emitShielduiGridInit();
                  }
                },
                delete: function(e) {
                  vm.shopping.menu.calcCategoriesTotalCosts(
                    $($element).swidget().dataSource.data
                  );
                  vm.shopping.menu.emitShielduiGridInit();
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
                      return 'Вы действительно хотите удалить товар?';
                    }
                  }
                }
              }
            });

            $($element)[0].nextSibling.nodeValue = '';
            $($element)
              .next()
              .remove();

            vm.shopping.model.shielduiGridRepository.push(
              $($element).swidget()
            );
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
