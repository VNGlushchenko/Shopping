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
        .then(
            () => ctrl.menu.initTypeahead(ctrl.model.typeaheadOptions)
        );
      console.log(new Date().getTime());
      console.log('from link ctrl.model');
      console.log(JSON.stringify(ctrl.model));
      console.log(new Date().getTime());
      console.log('from link ctrl.model.typeaheadOptions');
      console.log(JSON.stringify(ctrl.model.typeaheadOptions));
      }
    };
  }
})();
