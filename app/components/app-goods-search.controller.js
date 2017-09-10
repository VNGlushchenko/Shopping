(function() {
  'use strict';

  angular
    .module('shopping')
    .controller('appGoodsSearchController', appGoodsSearchController);

  appGoodsSearchController.$inject = [
    'ShoppingModel',
    '$element',
    '$rootScope'
  ];

  function appGoodsSearchController(ShoppingModel, $element, $rootScope) {
    let vm = this;

    vm.shopping = ShoppingModel;

    vm.model = {
      typeaheadOptions: []
    };

    vm.menu = {
      createTypeaheadOptions: createTypeaheadOptions,
      initTypeahead: initTypeahead,
      reinitTypeahead: reinitTypeahead,
      createNewShoppingListItem: createNewShoppingListItem
    };

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

    function initTypeahead(element, params) {
      element.typeahead(...params);
    }

    function reinitTypeahead(element, params) {
      $rootScope.$on('refreshTypeahead', () => {
        vm.shopping.menu.createGoodsCatalog().then(() => {
          vm.menu.createTypeaheadOptions();
          vm.menu.initTypeahead(element, params);
        });
      });
    }

    function createNewShoppingListItem(productName) {
      let productNameIndex;
      let categoryIndex;
      let goodsCatalog = vm.shopping.model.goodsCatalog;

      for (let i = 0; i < goodsCatalog.length; i++) {
        if (goodsCatalog[i].products[1].indexOf(productName) != -1) {
          productNameIndex = goodsCatalog[i].products[1].indexOf(productName);
          categoryIndex = i;
          break;
        }
      }

      return {
        categoryId: goodsCatalog[categoryIndex].category_id,
        categoryName: goodsCatalog[categoryIndex].category_name,
        productId: goodsCatalog[categoryIndex].products[0][productNameIndex],
        productName: productName,
        productUnit: 1,
        productPrice: goodsCatalog[categoryIndex].products[2][productNameIndex],
        productCost: goodsCatalog[categoryIndex].products[2][productNameIndex],
        purchaseDate: new Date()
      };
    }
  }
})();
