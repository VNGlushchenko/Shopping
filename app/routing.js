(function() {
  'use strict';

  angular.module('shopping').config([
    '$stateProvider',
    '$locationProvider',
    function($stateProvider, $locationProvider) {
      $locationProvider.html5Mode(true);

      $stateProvider
        .state('shoppingList', {
          url: '/',
          templateUrl: 'app/components/app-shopping-list.template.html',
          onExit: [
            'ShoppingModel',
            function(ShoppingModel) {
              ShoppingModel.model.goodsCatalog.length = 0;
              ShoppingModel.model.newProductName = '';
              ShoppingModel.model.newProductErrorText = '';
              ShoppingModel.model.categoriesList.length = 0;
              ShoppingModel.model.previousShoppingList.length = 0;
              ShoppingModel.model.actualShoppingListLength = 0;
              ShoppingModel.model.categoriesTotalCosts.length = 0;
              ShoppingModel.model.shielduiGridRepository.length = 0;
            }
          ]
        })
        .state('shoppingStatistics', {
          url: '/statistics',
          templateUrl: 'app/components/app-shopping-statistics.template.html',
          resolve: {
            getStatisticsData: [
              'StatisticsModel',
              function(StatisticsModel) {
                StatisticsModel.model.inputStatisticsData.dateFrom = new Date(
                  new Date(
                    new Date().setMonth(new Date().getMonth() - 5)
                  ).setDate(1)
                ).toJSON(); // first day of conforming month half year ago from now

                StatisticsModel.model.inputStatisticsData.dateTo = new Date().toJSON();

                return StatisticsModel.menu
                  .getStatisticsData(StatisticsModel.model.inputStatisticsData)
                  .then(
                    response => {
                      console.log(response);

                      StatisticsModel.model.outputStatisticsData.categoriesList =
                        response.data.categories_list;

                      StatisticsModel.model.outputStatisticsData.pieChartData =
                        response.data.pie_chart_data;

                      /* StatisticsModel.model.outputStatisticsData.dynamicsChartData =
                        response.data.dynamics_chart_data; */
                    },
                    error => console.log(error)
                  );
              }
            ]
          },
          controller: [
            'StatisticsModel',
            '$scope',
            function(StatisticsModel, $scope) {
              let vm = this;

              vm.statistics = StatisticsModel;

              vm.menu = {
                submitStatisticsForm: submitStatisticsForm
              };

              function submitStatisticsForm() {
                let isCategoryIdValid = false;

                vm.statistics.model.outputStatisticsData.categoriesList.forEach(
                  option => {
                    if (
                      option.category_id ==
                      vm.statistics.model.inputStatisticsData.goodsCategory
                    ) {
                      isCategoryIdValid = true;
                      return;
                    }
                  }
                );

                if (
                  isCategoryIdValid ||
                  vm.statistics.model.inputStatisticsData.goodsCategory == 0
                ) {
                  vm.statistics.menu
                    .getStatisticsData(vm.statistics.model.inputStatisticsData)
                    .then(
                      response => {
                        console.log(response);
                      },
                      error => {
                        console.log(error);
                      }
                    );
                } else {
                  $scope.statisticsForm.categoriesList.$setValidity(
                    'check_categories_list',
                    false
                  );
                }
              }
            }
          ],
          controllerAs: 'statisticsCtrl'
        });
    }
  ]);
})();
