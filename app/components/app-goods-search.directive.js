(function() {
  'use strict';

  angular.module('shopping').directive('appGoodsSearch', appGoodsSearch);

  function appGoodsSearch() {
    return {
      restrict: 'A',
      controller: 'appGoodsSearchController',
      controllerAs: 'agsCtrl',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.shopping.menu.createGoodsCatalog().then(() => {
          ctrl.menu.createTypeaheadOptions();
          ctrl.menu.initTypeahead(elem, ctrl.model.typeaheadOptions);
        });

        ctrl.menu.reinitTypeahead(elem, ctrl.model.typeaheadOptions);

        elem.bind('typeahead:select', function(event, suggestion) {
          scope.$apply(function() {
            ctrl.shopping.model.shielduiGridRepository[0].addRow(
              ctrl.menu.createNewShoppingListItem(suggestion)
            );

            ctrl.shopping.model.shielduiGridRepository[0].saveChanges();

            ctrl.shopping.model.actualShoppingListLength =
              ctrl.shopping.model.shielduiGridRepository[0].dataSource.data.length;

            ctrl.shopping.menu.calcCategoriesTotalCosts(
              ctrl.shopping.model.shielduiGridRepository[0].dataSource.data
            );

            ctrl.shopping.menu.emitShielduiGridInit();
            ctrl.shopping.model.newProductName = '';
          });
        });
      }
    };
  }
})();
