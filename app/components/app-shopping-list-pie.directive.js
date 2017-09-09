(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appShoppingListPie', appShoppingListPie);

  function appShoppingListPie() {
    return {
      restrict: 'E',
      template: '<div id="pie-new-shopping-list"></div>',
      controller: [
        'ShoppingModel',
        '$rootScope',
        '$element',
        function(ShoppingModel, $rootScope, $element) {
          let vm = this;

          vm.shopping = ShoppingModel;

          vm.menu = {
            initShoppingListPieChart: initShoppingListPieChart
          };

          function initShoppingListPieChart() {
            $rootScope.$on('shielduiGridInitialized', () => {
              $('#pie-new-shopping-list').highcharts({
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie',
                  borderWidth: 1,
                  borderColor: '#ccc'
                },
                title: {
                  text: 'Сумма чека в разрезе категорий',
                  style: {
                    color: 'gray',
                    fontSize: '18px',
                    'font-family': 'Arial'
                  }
                },
                tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                  pie: {
                    allowPointSelect: true,
                    slicedOffset: 0,
                    cursor: 'pointer',
                    dataLabels: {
                      enabled: false
                    },
                    showInLegend: true
                  },
                  series: {
                    animation: vm.shopping.menu.approveShoppingListPieAnimation(
                      vm.shopping.model.previousShoppingList,
                      vm.shopping.model.shielduiGridRepository[0].dataSource
                        .data
                    )
                      ? true
                      : false
                  }
                },
                series: [
                  {
                    name: 'Доля',
                    colorByPoint: true,
                    data: vm.shopping.model.categoriesTotalCosts
                  }
                ]
              });

              vm.shopping.menu.createActualShoppingListBackup(
                vm.shopping.model.shielduiGridRepository[0].dataSource.data,
                vm.shopping.model.previousShoppingList
              );
            });
          }
        }
      ],
      controllerAs: 'shoppingListPieCtrl',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.initShoppingListPieChart();
      }
    };
  }
})();
