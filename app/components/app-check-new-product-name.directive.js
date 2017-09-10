(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appCheckNewProductName', appCheckNewProductName);

  function appCheckNewProductName() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        check_product_list: '<checkProductList'
      },
      link: function(scope, elem, attrs, ctrl) {
        ctrl.$validators.newProductName_error = function(modelValue) {
          for (let i = 0; i < scope.check_product_list.length; i++) {
            if (
              scope.check_product_list[i].products[1].indexOf(
                modelValue.trim()
              ) != -1
            ) {
              return false;
            }
          }

          return true;
        };
      }
    };
  }
})();
