(function() {
  'use strict';

  angular
    .module('shopping')
    .controller('AppTypeaheadController', AppTypeaheadController);

  AppTypeaheadController.$inject = ['GoodsCatalogModel', '$element'];

  function AppTypeaheadController(GoodsCatalogModel, $element) {
    let vm = this;

    vm.model = {
      goodsCatalog: [],
      typeaheadOptions: []
    };

    vm.menu = {
      initTypeahead: initTypeahead
    };

    function initTypeahead(params) {
      $($element).typeahead(params);
    }

    activate();

    function activate() {
      GoodsCatalogModel.getAllGoods().then(
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
          console.log(new Date().getTime());
          console.log('from controller.activate');
          console.log(vm.model.goodsCatalog);

          //createTypeaheadOptions
          let typeaheadOptions = [];
          let goodsListLength = vm.model.goodsCatalog.length;
          console.log(new Date().getTime());
          console.log('from controller.createTypeaheadOptions 1');
          console.log(goodsListLength);
          typeaheadOptions.push({ highlight: true });

          for (let i = 0; i < goodsListLength; i++) {
            typeaheadOptions.push({
              name: 'category-' + i + 1,
              display: 'category',
              source: new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace(
                  'category'
                ),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: vm.model.goodsCatalog[i].products[1]
              }),
              templates: {
                header:
                  '<h3 class="category-name">' +
                  vm.model.goodsCatalog[i].category_name +
                  '</h3>'
              }
            });
          }

          vm.model.typeaheadOptions = typeaheadOptions;
          console.log(new Date().getTime());
          console.log('from controller.createTypeaheadOptions 2');
          console.log(vm.model.typeaheadOptions);
        },
        error => console.log(error)
      );
    }
  }
})();
