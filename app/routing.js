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
          templateUrl: 'app/components/app-shopping-list.template.html'
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
                      StatisticsModel.menu.fillOutputStatisticsData(
                        StatisticsModel,
                        response
                      );
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

                for (
                  let i = 0;
                  i <
                  vm.statistics.model.outputStatisticsData.categoriesList
                    .length;
                  i++
                ) {
                  if (
                    vm.statistics.model.outputStatisticsData.categoriesList[i]
                      .category_id ==
                    vm.statistics.model.inputStatisticsData.goodsCategory
                  ) {
                    isCategoryIdValid = true;
                    break;
                  }
                }

                if (
                  isCategoryIdValid ||
                  vm.statistics.model.inputStatisticsData.goodsCategory == 0
                ) {
                  vm.statistics.menu
                    .getStatisticsData(vm.statistics.model.inputStatisticsData)
                    .then(
                      response => {
                        vm.statistics.menu.fillOutputStatisticsData(
                          vm.statistics,
                          response
                        );
                      },
                      error => {
                        console.log(error);
                        $scope.statisticsForm.categoriesList.$setValidity(
                          'check_categories_list',
                          false
                        );
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
