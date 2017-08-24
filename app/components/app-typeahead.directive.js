(function() {
  'use strict';

  angular.module('shopping').directive('appTypeahead', appTypeahead);

  function appTypeahead() {
    return {
      restrict: 'A',
      controller: 'AppTypeaheadController',
      controllerAs: 'atc',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu
          .activate()
          .then(() => ctrl.menu.initTypeahead(ctrl.model.typeaheadOptions));

        elem.bind('typeahead:select', function(event, suggestion) {
          ctrl.model.shoppingList.push(suggestion);
          console.log(ctrl.model.shoppingList);
        });
      }
    };
  }
})();
