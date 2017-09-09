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
        check_categories_list: '<checkCategoriesList'
      },
      link: function(scope, elem, attrs, ctrl) {
        let isValid = true;

        ctrl.$validators.newCategoryName_error = function(modelValue) {
          while (isValid) {
            for (let i = 0; i < scope.check_categories_list.length; i++) {
              if (modelValue == scope.check_categories_list[i].category_name) {
                isValid = false;
                break;
              }
            }
          }
          return isValid;
        };
      }
    };
  }
})();

//check-categories-list="anpbCtrl.shopping.model.categoriesList"
