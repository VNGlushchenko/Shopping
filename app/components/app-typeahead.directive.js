(function() {
  'use strict';

  angular.module('shopping').directive('appTypeahead', appTypeahead);

  function appTypeahead() {
    return {
      restrict: 'E',
      controller: 'AppTypeaheadController',
      controllerAs: 'atc',
      templateUrl: 'app/components/app-typeahead.template.html',
      link: function(scope, elem, attrs, ctrl) {
        let typeaheadOptions = [];
        let goodsListLength = ctrl.goodsCatalog;

        typeaheadOptions.push({ highlight: true });

        for (let i = 0; i < goodsListLength; i++) {
          typeaheadOptions.push({
            name: 'category-' + i + 1,
            display: 'category',
            source: new Bloodhound({
              datumTokenizer: Bloodhound.tokenizers.obj.whitespace('category'),
              queryTokenizer: Bloodhound.tokenizers.whitespace,
              local: ctrl.goodsCatalog[i].products[1]
            }),
            templates: {
              header:
                '<h3 class="category-name">' +
                ctrl.goodsCatalog[i].category_name +
                '</h3>'
            }
          });
        }

        elem.typeahead(...typeaheadOptions);
      }
    };
  }
})();
