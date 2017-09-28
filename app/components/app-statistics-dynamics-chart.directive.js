(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appStatisticsDynamicsChart', appStatisticsDynamicsChart);

  function appStatisticsDynamicsChart() {
    return {
      restrict: 'E',
      template: '<div id="statistics-dynamics-chart"></div>',
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
              $('#statistics-dynamics-chart').highcharts({
                chart: {
                  type: 'column',
                  borderWidth: 1,
                  borderColor: '#ccc'
                },
                title: {
                  text:
                    'Динамика покупок по категории ' +
                    vm.statistics.model.outputStatisticsData.dynamicsChartData
                      .goodsCategoryName +
                    ', грн',
                  style: {
                    color: 'gray',
                    fontSize: '18px',
                    'font-family': 'Arial'
                  }
                },
                xAxis: {
                  categories:
                    vm.statistics.model.outputStatisticsData.dynamicsChartData
                      .xAxisCategories,
                  crosshair: true
                },
                yAxis: {
                  min: 0,
                  title: {
                    text: 'Сумма, грн'
                  }
                },
                tooltip: {
                  headerFormat:
                    '<span style="font-size:10px">{point.key}</span><table>',
                  pointFormat:
                    '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} грн</b></td></tr>',
                  footerFormat: '</table>',
                  shared: true,
                  useHTML: true
                },
                plotOptions: {
                  column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                  }
                },
                series: [
                  {
                    name:
                      'Категория ' +
                      vm.statistics.model.outputStatisticsData.dynamicsChartData
                        .goodsCategoryName,
                    data:
                      vm.statistics.model.outputStatisticsData.dynamicsChartData
                        .seriesData
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
