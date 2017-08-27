(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appAddNewProductButton', appAddNewProductButton);

  function appAddNewProductButton() {
    return {
      restrict: 'A',
      controller: [
        'ShoppingModel',
        '$element',
        function(ShoppingModel, $element) {
          let vm = this;

          vm.shopping = ShoppingModel;

          vm.model = {
            newCategory: ''
          };
          vm.menu = {
            initTooltip: initTooltip
          };

          function initTooltip() {
            $('.tooltip').tooltip();
          }
        }
      ],
      controllerAs: 'anpbCtrl',

      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.initTooltip();
      }
    };
  }
})();
