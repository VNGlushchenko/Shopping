(function() {
  'use strict';

  angular
    .module('shopping')
    .controller('appGoodsSearchController', appGoodsSearchController);

  appGoodsSearchController.$inject = ['ShoppingModel', '$element'];

  function appGoodsSearchController(ShoppingModel, $element) {
    let vm = this;

    vm.shopping = ShoppingModel;

    vm.model = {
      typeaheadOptions: []
    };

    vm.menu = {
      createTypeaheadOptions: createTypeaheadOptions,
      initTypeahead: initTypeahead
    };

    function initTypeahead(params) {
      $($element).typeahead(...params);
    }

    function createTypeaheadOptions() {
      let typeaheadOptions = [];
      let goodsListLength = vm.shopping.model.goodsCatalog.length;
      typeaheadOptions.push({
        highlight: true
      });

      for (let i = 0; i < goodsListLength; i++) {
        typeaheadOptions.push({
          name: 'category-' + i + 1,
          display: 'category',
          source: new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: vm.shopping.model.goodsCatalog[i].products[1]
          }),
          templates: {
            header:
              '<h3 class="category-name">' +
              vm.shopping.model.goodsCatalog[i].category_name +
              '</h3>',
            suggestion: function(q) {
              return '<div>' + q + '</div>';
            }
          }
        });
      }

      vm.model.typeaheadOptions = typeaheadOptions;
    }
  }
})();
