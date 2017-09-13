(function() {
  'use strict';

  angular
    .module('shopping')
    .controller('appGoodsSearchController', appGoodsSearchController);

  appGoodsSearchController.$inject = [
    'ShoppingModel',
    '$element',
    '$rootScope',
    '$scope',
    '$timeout'
  ];

  function appGoodsSearchController(
    ShoppingModel,
    $element,
    $rootScope,
    $scope,
    $timeout
  ) {
    let vm = this;

    vm.shopping = ShoppingModel;

    vm.model = {
      typeaheadOptions: [
        {
          highlight: true
        }
      ]
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
      // for reinitTypeahead
      vm.model.typeaheadOptions.length = 1;

      typeaheadOptions.forEach(option =>
        vm.model.typeaheadOptions.push(option)
      );
    }

    function initTypeahead(element, params) {
      element.typeahead(...params);
    }

    function reinitTypeahead(element, params) {
      $rootScope.$on('refreshTypeahead', () => {
        vm.shopping.menu.createGoodsCatalog().then(() => {
          element.typeahead('destroy');
          vm.menu.createTypeaheadOptions();
          vm.menu.initTypeahead(element, params);
          $timeout(function() {
            $($element).trigger('typeahead:select', [
              vm.shopping.model.newProductName
            ]);
          }, 0);
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
