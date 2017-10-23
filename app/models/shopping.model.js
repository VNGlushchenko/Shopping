(function() {
  'use strict';

  angular.module('shopping').factory('ShoppingModel', ShoppingModel);

  ShoppingModel.$inject = ['$http', 'apiUrl', '$q', '$rootScope'];

  function ShoppingModel($http, apiUrl, $q, $rootScope) {
    let vm = this;

    vm.shopping = {
      model: {
        goodsCatalog: [],
        newProductName: '',
        newProductErrorText: '',
        categoriesList: [],
        previousShoppingList: [],
        actualShoppingListLength: 0,
        categoriesTotalCosts: [],
        shielduiGridRepository: [],
        areShielduiGridDataValid: true
      },
      menu: {
        getAllGoods: getAllGoods,
        createNewProduct: createNewProduct,
        createNewCategory: createNewCategory,
        saveSalesReceipt: saveSalesReceipt,
        createGoodsCatalog: createGoodsCatalog,
        calcCategoriesTotalCosts: calcCategoriesTotalCosts,
        emitShielduiGridInit: emitShielduiGridInit,
        emitRefreshTypeahead: emitRefreshTypeahead,
        approveShoppingListPieAnimation: approveShoppingListPieAnimation,
        createActualShoppingListBackup: createActualShoppingListBackup
      }
    };

    return vm.shopping;

    function getAllGoods() {
      return $http.get(`${apiUrl}/getGoodsCatalog.php`);
    }

    function createNewProduct(data) {
      return $http.post(`${apiUrl}/createNewProduct.php`, data);
    }

    function createNewCategory(data) {
      return $http.post(`${apiUrl}/createNewGoodsCategory.php`, data);
    }

    function saveSalesReceipt(data) {
      return $http.post(`${apiUrl}/saveSalesReceipt.php`, data);
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
            resolve('Success');
          });
        },
        error => console.log(error)
      );
    }

    function calcCategoriesTotalCosts(inputData) {
      vm.shopping.model.categoriesTotalCosts.length = 0;

      let categoriesList = vm.shopping.model.categoriesList;
      let categoriesTotalCosts = [];
      // appHighchartsPie data creation - begin
      // appHighchartsPie data template
      for (let i = 0; i < categoriesList.length; i++) {
        categoriesTotalCosts.push({
          name: categoriesList[i].category_name,
          y: 0
        });
        // categories' total costs calculation
        for (let j = 0; j < inputData.length; j++) {
          if (categoriesTotalCosts[i].name == inputData[j].categoryName) {
            categoriesTotalCosts[i].y += inputData[j].productCost;
          }
        }
      }
      // vm.shopping.model.categoriesTotalCosts filling without zeroes
      for (let i = 0; i < categoriesTotalCosts.length; i++) {
        if (categoriesTotalCosts[i].y > 0) {
          vm.shopping.model.categoriesTotalCosts.push(categoriesTotalCosts[i]);
        }
      }
      // appHighchartsPie data creation - end
    }

    function emitShielduiGridInit() {
      $rootScope.$emit('shielduiGridInitialized');
    }

    function emitRefreshTypeahead() {
      $rootScope.$emit('refreshTypeahead');
    }

    function approveShoppingListPieAnimation(oldShoppingList, newShoppingList) {
      return oldShoppingList.length == 0 && newShoppingList.length == 1;
    }

    function createActualShoppingListBackup(
      shielduiGridData,
      previousShoppingList
    ) {
      previousShoppingList.length = 0;

      if (shielduiGridData.length) {
        for (let i = 0; i < shielduiGridData.length; i++) {
          previousShoppingList.push(shielduiGridData[i]);
        }
      }
    }
  }
})();
