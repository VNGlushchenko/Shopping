(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appStatisticsPieChart', appStatisticsPieChart);

  function appStatisticsPieChart() {
    return {
      restrict: 'E',
      template: '<div id="statistics-pie-chart"></div>',
      controller: [
        'StatisticsModel',
        '$rootScope',
        function(StatisticsModel, $rootScope) {
          let vm = this;

          vm.statistics = StatisticsModel;

          vm.menu = {
            initStatisticsPieChart: initStatisticsPieChart
          };

          function initStatisticsPieChart() {
            $rootScope.$on('statisticsDataLoaded', () => {
              $('#statistics-pie-chart').highcharts({
                chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie',
                  borderWidth: 1,
                  borderColor: '#ccc'
                },
                title: {
                  text: 'Расшифровка общей суммы покупок, %',
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
                    showInLegend: false
                  }
                },
                series: [
                  {
                    name: 'Доля',
                    colorByPoint: true,
                    data: vm.statistics.model.outputStatisticsData.pieChartData
                  }
                ]
              });
            });
          }
        }
      ],
      controllerAs: 'statisticsPieCtrl',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.initStatisticsPieChart();
      }
    };
  }
})();
