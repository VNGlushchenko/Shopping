(function() {
  'use strict';

  angular
    .module('shopping')
    .controller('AppTypeaheadController', AppTypeaheadController);

  AppTypeaheadController.$inject = ['GoodsCatalogModel', '$element', '$q'];

  function AppTypeaheadController(GoodsCatalogModel, $element, $q) {
    let vm = this;

    vm.model = {
      goodsCatalog: [],
      typeaheadOptions: [],
      shoppingList: []
    };

    vm.menu = {
      searchGoodsCategory: searchGoodsCategory,
      initTypeahead: initTypeahead,
      activate: activate
    };

    function searchGoodsCategory(productName) {}

    function initTypeahead(params) {
      $($element).typeahead(...params);
    }

    function activate() {
      return GoodsCatalogModel.getAllGoods().then(
        response => {
          let receivedData = response.data;
          let categoryId = receivedData[0];
          let categoryName = receivedData[1];
          let productId = receivedData[2];
          let productName = receivedData[3];

          // distinct categoryIds elicitation
          let elemForCheck = categoryId[0];
          let posUniqueElemsArr = [0];

          for (let i = 1; i < categoryId.length; i++) {
            if (categoryId[i] == elemForCheck) {
              continue;
            } else {
              posUniqueElemsArr.push(i);
              elemForCheck = categoryId[i];
            }
          }
          // goodsCatalog creation
          let goodsCatalog = [];
          for (let i = 0; i < posUniqueElemsArr.length; i++) {
            goodsCatalog[i] = {};
            goodsCatalog[i].category_id = categoryId[posUniqueElemsArr[i]];
            goodsCatalog[i].category_name = categoryName[posUniqueElemsArr[i]];
            goodsCatalog[i].products = [[], []];
          }
          // products distribution among categories
          for (let i = 0; i < goodsCatalog.length; i++) {
            for (let j = 0; j < productId.length; j++) {
              if (
                (j >= posUniqueElemsArr[i] && j < posUniqueElemsArr[i + 1]) ||
                (i == posUniqueElemsArr.length - 1 &&
                  (j >= posUniqueElemsArr[i] && j < productId.length))
              ) {
                goodsCatalog[i].products[0].push(productId[j]);
                goodsCatalog[i].products[1].push(productName[j]);
              }
            }
          }
          vm.model.goodsCatalog = goodsCatalog;

          //createTypeaheadOptions
          let typeaheadOptions = [];
          let goodsListLength = vm.model.goodsCatalog.length;
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
                local: vm.model.goodsCatalog[i].products[1]
              }),
              templates: {
                header:
                  '<h3 class="category-name">' +
                  vm.model.goodsCatalog[i].category_name +
                  '</h3>',
                suggestion: function(q) {
                  return '<div>' + q + '</div>';
                }
              }
            });
          }

          vm.model.typeaheadOptions = typeaheadOptions;
          return $q(function(resolve, reject) {
            resolve('OK');
          });
        },
        error => console.log(error)
      );
    }
  }
})();
