(function() {
  'use strict';

  angular.module('shopping').factory('StatisticsModel', StatisticsModel);

  StatisticsModel.$inject = ['$http', 'apiUrl', '$q'];

  function StatisticsModel($http, apiUrl) {
    let vm = this;

    vm.statistics = {
      model: {
        inputStatisticsData: {
          dateFrom: '',
          dateTo: '',
          goodsCategory: 0
        },
        outputStatisticsData: {
          categoriesList: [],
          pieChartData: [],
          dynamicsChartData: []
        }
      },
      menu: {
        getStatisticsData: getStatisticsData
      }
    };

    return vm.statistics;

    function getStatisticsData(data) {
      return $http.post(`${apiUrl}/getStatisticsData.php`, data);
    }
  }
})();
