(function() {
  'use strict';

  angular.module('shopping').directive('appTypeahead', appTypeahead);

  function appTypeahead() {
    return {
      restrict: 'A',
      controller: 'AppTypeaheadController',
      controllerAs: 'atc',
      link: function(scope, elem, attrs, ctrl) {
        console.log(new Date().getTime());
        console.log('from link ctrl.model');
        console.log(ctrl.model);
        console.log(new Date().getTime());
        console.log('from link ctrl.model.typeaheadOptions');
        console.log(ctrl.model.typeaheadOptions);
        ctrl.menu.initTypeahead(...ctrl.model.typeaheadOptions);
      }
    };
  }
})();
