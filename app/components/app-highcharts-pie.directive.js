(function() {
  'use strict';

  angular.module('shopping').directive('appHighchartsPie', function() {
    return {
      restrict: 'E',
      template: '<div id="pie-new-shopping-list"></div>',
      controller: [
        'ShoppingModel',
        function(ShoppingModel) {
          let vm = this;
          vm.shopping = ShoppingModel;

          vm.pieSeries = [
            {
              name: 'Brands',
              colorByPoint: true,
              data: [
                {
                  name: 'Microsoft Internet Explorer',
                  y: 56.33
                },
                {
                  name: 'Chrome',
                  y: 24.03
                },
                {
                  name: 'Firefox',
                  y: 10.38
                },
                {
                  name: 'Safari',
                  y: 4.77
                },
                {
                  name: 'Opera',
                  y: 0.91
                },
                {
                  name: 'Proprietary or Undetectable',
                  y: 0.2
                }
              ]
            }
          ];
        }
      ],

      link: function(scope, elem, attrs, ctrl) {
        $('#pie-new-shopping-list').highcharts({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            borderWidth: 1,
            borderColor: 'gray'
          },
          title: {
            text: 'Сумма чека в разрезе категорий',
            style: { color: 'gray', fontSize: '18px', 'font-family': 'Arial' }
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
          series: ctrl.pieSeries
        });
      }
    };
  });
})();
