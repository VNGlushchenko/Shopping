(function() {
  'use strict';

  angular.module('shopping').factory('ShoppingModel', ShoppingModel);

  ShoppingModel.$inject = ['$http', 'apiUrl', '$q'];

  function ShoppingModel($http, apiUrl, $q) {
    let vm = this;

    vm.shopping = {
      model: {
        goodsCatalog: [],
        shoppingList: [],
        categoriesList: [],
        shoppingListLength: 0
      },
      menu: {
        getAllGoods: getAllGoods,
        createNewCategory: createNewCategory,
        createGoodsCatalog: createGoodsCatalog
      }
    };

    return vm.shopping;

    function getAllGoods() {
      return $http.get(`${apiUrl}/goodsCatalog.json`); //$http.get(`${apiUrl}/getGoodsCatalog.php`);
    }

    function createNewCategory(data) {
      return $http.post(`${apiUrl}/createNewGoodsCategory.php`, data);
    }

    function createGoodsCatalog() {
      return vm.shopping.menu.getAllGoods().then(
        response => {
          let receivedData = response.data;
          let categoryId = receivedData[0];
          let categoryName = receivedData[1];
          let productId = receivedData[2];
          let productName = receivedData[3];
          let lastPrice = receivedData[4];

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
            goodsCatalog[i].products = [[], [], []];
            // categoriesList filling
            vm.shopping.model.categoriesList[i] = {};
            vm.shopping.model.categoriesList[i].category_id =
              goodsCatalog[i].category_id;
            vm.shopping.model.categoriesList[i].category_name =
              goodsCatalog[i].category_name;
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
                goodsCatalog[i].products[2].push(lastPrice[j]);
              }
            }
          }

          vm.shopping.model.goodsCatalog = goodsCatalog;

          return $q(function(resolve, reject) {
            resolve('OK');
          });
        },
        error => console.log(error)
      );
    }
  }
})();
