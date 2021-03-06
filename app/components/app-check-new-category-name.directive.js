(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appCheckNewCategoryName', appCheckNewCategoryName);

  function appCheckNewCategoryName() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        check_categories_list: '<checkCategoriesList',
        errorMessage: '='
      },
      link: function(scope, elem, attrs, ctrl) {
        ctrl.$validators.newCategoryName_error = function(modelValue) {
          for (let i = 0; i < scope.check_categories_list.length; i++) {
            if (
              modelValue.trim() == scope.check_categories_list[i].category_name
            ) {
              scope.errorMessage =
                'Такая категория уже есть в каталоге. Измените название категории.';
              return false;
            }
          }

          return true;
        };
      }
    };
  }
})();
