(function() {
  'use strict';

  angular.module('shopping').factory('StatisticsModel', StatisticsModel);

  StatisticsModel.$inject = ['$http', 'apiUrl', '$rootScope'];

  function StatisticsModel($http, apiUrl, $rootScope) {
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
          dynamicsChartData: {
            xAxisCategories: [],
            seriesData: [],
            goodsCategoryName: ''
          },
          tableDynamicsData: []
        } /* ,
        pagination: {
          currentPage: 1,
          rowCountTable: vm.model.orders.length,
          pagesCount: 1,
          countPerPage: vm.model.orders.length,
          rowCountChange: rowCountChange,
          nextPage: nextPage,
          previousPage: previousPage,
          firstRowNumber: 0,
          rowCountTableChange: rowCountTableChange
        } */
      },
      menu: {
        getStatisticsData: getStatisticsData,
        emitStatisticsDataLoaded: emitStatisticsDataLoaded,
        getMonthName: getMonthName,
        fillOutputStatisticsData: fillOutputStatisticsData
      }
    };

    return vm.statistics;

    /*     function rowCountChange() {
      vm.pagination.pagesCount = Math.ceil(
        vm.pagination.rowCountTable / vm.pagination.countPerPage
      );
      vm.pagination.currentPage = 1;
      vm.pagination.firstRowNumber = 0;
    }

    function nextPage() {
      if (vm.pagination.pagesCount != vm.pagination.currentPage) {
        vm.pagination.currentPage++;
        vm.pagination.firstRowNumber += vm.pagination.countPerPage;
      }
    }

    function previousPage() {
      if (vm.pagination.currentPage != 1) {
        vm.pagination.currentPage--;
        vm.pagination.firstRowNumber -= vm.pagination.countPerPage;
      }
    }

    function rowCountTableChange() {
      vm.model.filteredOrders = $filter('orderStatus')(
        vm.model.orders,
        $scope.ordStatus
      );
      vm.pagination.rowCountTable = vm.model.filteredOrders.length;
      vm.pagination.countPerPage = vm.pagination.rowCountTable;
      rowCountChange();
    } */

    function getStatisticsData(data) {
      return $http.post(`${apiUrl}/getStatisticsData.php`, data);
    }

    function emitStatisticsDataLoaded() {
      $rootScope.$emit('statisticsDataLoaded');
    }

    function getMonthName(monthNumber) {
      let monthName = '';

      switch (monthNumber) {
        case 1:
          monthName = 'Январь';
          break;
        case 2:
          monthName = 'Февраль';
          break;
        case 3:
          monthName = 'Март';
          break;
        case 4:
          monthName = 'Апрель';
          break;
        case 5:
          monthName = 'Май';
          break;
        case 6:
          monthName = 'Июнь';
          break;
        case 7:
          monthName = 'Июль';
          break;
        case 8:
          monthName = 'Август';
          break;
        case 9:
          monthName = 'Сентябрь';
          break;
        case 10:
          monthName = 'Октябрь';
          break;
        case 11:
          monthName = 'Ноябрь';
          break;
        case 12:
          monthName = 'Декабрь';
          break;
        default:
          monthName = 'Ошибка!';
      }

      return monthName;
    }

    function fillOutputStatisticsData(obj, resp) {
      if (resp.data.input_category_id == 0) {
        obj.model.outputStatisticsData.categoriesList =
          resp.data.categories_list;
      }

      obj.model.outputStatisticsData.dynamicsChartData.xAxisCategories.length = 0;
      obj.model.outputStatisticsData.dynamicsChartData.seriesData.length = 0;
      obj.model.outputStatisticsData.pieChartData.length = 0;
      obj.model.outputStatisticsData.tableDynamicsData.length = 0;

      obj.model.outputStatisticsData.pieChartData = resp.data.pie_chart_data;

      for (let i = 0; i < resp.data.dynamics_chart_data[0].length; i++) {
        obj.model.outputStatisticsData.dynamicsChartData.xAxisCategories.push(
          vm.statistics.menu.getMonthName(resp.data.dynamics_chart_data[0][i]) +
            ' ' +
            resp.data.dynamics_chart_data[1][i]
        );

        obj.model.outputStatisticsData.dynamicsChartData.seriesData.push(
          resp.data.dynamics_chart_data[3][i]
        );

        obj.model.outputStatisticsData.tableDynamicsData.push({
          period:
            vm.statistics.menu.getMonthName(
              resp.data.dynamics_chart_data[0][i]
            ) +
            ' ' +
            resp.data.dynamics_chart_data[1][i],
          value: resp.data.dynamics_chart_data[3][i]
        });
      }

      if (resp.data.dynamics_chart_data[2][0]) {
        obj.model.outputStatisticsData.dynamicsChartData.goodsCategoryName =
          resp.data.dynamics_chart_data[2][0];
      } else {
        obj.model.outputStatisticsData.categoriesList.forEach(item => {
          if (item.category_id == resp.data.input_category_id) {
            obj.model.outputStatisticsData.dynamicsChartData.goodsCategoryName =
              item.category_name;
            return;
          }
        });
      }

      obj.menu.emitStatisticsDataLoaded();
    }
  }
})();
