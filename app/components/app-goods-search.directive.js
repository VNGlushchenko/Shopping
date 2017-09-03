(function() {
  'use strict';

  angular.module('shopping').directive('appGoodsSearch', appGoodsSearch);

  function appGoodsSearch() {
    return {
      restrict: 'A',
      controller: 'appGoodsSearchController',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.shopping.menu.createGoodsCatalog().then(() => {
          ctrl.menu.createTypeaheadOptions();
          ctrl.menu.initTypeahead(ctrl.model.typeaheadOptions);
        });

        elem.bind('typeahead:select', function(event, suggestion) {
          scope.$apply(function() {
            if (ctrl.shopping.model.shoppingList.length == 0) {
              ctrl.shopping.model.shoppingList.push(
                ctrl.menu.createNewShoppingListItem(suggestion)
              );
            } else {
              $('#grid')
                .swidget()
                .addRow(ctrl.menu.createNewShoppingListItem(suggestion));

              $('#grid')
                .swidget()
                .saveChanges();
            }
          });
        });
      }
    };
  }
})();
