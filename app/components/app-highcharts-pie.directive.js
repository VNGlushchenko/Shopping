(function() {
  'use strict';

  angular.module('shopping').directive('appHighchartsPie', function() {
    return {
      restrict: 'E',
      template: '<div id="pie-new-shopping-list"></div>',
      controller: [
        'ShoppingModel',
        '$rootScope',
        function(ShoppingModel, $rootScope) {
          let vm = this;

          vm.shopping = ShoppingModel;

          vm.pieSeries = [
            {
              name: 'Доля',
              colorByPoint: true,
              data: vm.shopping.model.categoriesTotalCosts
            }
          ];
          vm.menu = {
            initHighchartsPieChart: initHighchartsPieChart
          };

          function initHighchartsPieChart() {
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
                  }
                },
                series: vm.pieSeries
              });
            });
          }
        }
      ],
      controllerAs: 'pieShoppingListCtrl',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.initHighchartsPieChart();
      }
    };
  });
})();
