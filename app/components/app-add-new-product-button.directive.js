(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appAddNewProductButton', appAddNewProductButton);

  function appAddNewProductButton() {
    return {
      restrict: 'A',
      templateUrl: 'app/components/app-add-new-product-button.template.html',
      controller: [
        'ShoppingModel',
        '$element',
        '$scope',
        '$rootScope',
        function(ShoppingModel, $element, $scope, $rootScope) {
          let vm = this;

          $scope.setValidityForNewCategoryName = function(
            field,
            error_key,
            error_bool
          ) {
            $scope.newCategoryNameForm[field].$setValidity(
              error_key,
              error_bool
            );
          };

          $scope.setValidityForNewProduct = function(
            field,
            error_key,
            error_bool
          ) {
            $scope.shoppingListForm[field].$setValidity(error_key, error_bool);
          };

          vm.shopping = ShoppingModel;

          vm.model = {
            newCategoryName: '',
            newCategoryNameErrorText: ''
          };
          vm.menu = {
            initTooltip: initTooltip,
            createNewProductArgument: createNewProductArgument,
            createNewProduct: createNewProduct,
            createNewCategory: createNewCategory
          };

          function initTooltip() {
            $('#new-product-tooltip').tooltip();
          }

          function createNewProductArgument(
            productName,
            categoryName,
            categoriesList
          ) {
            let newProduct = {};
            newProduct.product_name = productName;

            let categoryNameIndex;
            let categoryId;
            let categories = categoriesList;

            for (let i = 0; i < categories.length; i++) {
              if (categories[i].category_name.indexOf(categoryName) != -1) {
                categoryNameIndex = i;
                break;
              }
            }

            categoryId = categories[categoryNameIndex].category_id;
            newProduct.category_id = categoryId;

            return newProduct;
          }

          function createNewProduct(data) {
            vm.shopping.menu.createNewProduct(data).then(
              response => {
                vm.shopping.menu.emitRefreshTypeahead();
              },
              error => {
                vm.shopping.model.newProductErrorText = error.data;

                if (vm.shopping.model.newProductErrorText) {
                  $scope.setValidityForNewProduct(
                    'productName',
                    'newProductName_error',
                    false
                  );
                }

                console.log(
                  'From anpbCtrl.shopping.menu.createNewProduct(data)  error callback:'
                );
                console.log(error);
              }
            );
          }

          function createNewCategory(data) {
            vm.shopping.menu.createNewCategory(data).then(
              response => {
                let newCategory = {};
                newCategory.category_id = response.data.category_id;
                newCategory.category_name = response.data.category_name;
                vm.shopping.model.categoriesList.push(newCategory);
                vm.shopping.model.categoriesList.sort(function(a, b) {
                  if (a.category_name > b.category_name) {
                    return 1;
                  }

                  if (a.category_name < b.category_name) {
                    return -1;
                  }

                  return 0;
                });

                vm.model.newCategoryName = '';
                vm.model.newCategoryNameErrorText = '';
              },
              error => {
                vm.model.newCategoryNameErrorText = error.data;

                if (vm.model.newCategoryNameErrorText) {
                  $scope.setValidityForNewCategoryName(
                    'newCategoryName',
                    'newCategoryName_error',
                    false
                  );
                }

                console.log(
                  'From anpbCtrl.shopping.menu.createNewCategory(data)  error callback:'
                );
                console.log(error);
              }
            );
          }
        }
      ],
      controllerAs: 'anpbCtrl',

      link: function(scope, elem, attrs, ctrl) {
        ctrl.menu.initTooltip();

        let lastClickedElem;
        let lastClickedElemId;
        let lastClickedElemOuterText;

        elem.bind('click', function(e) {
          lastClickedElem = null;
          lastClickedElemId = null;
          lastClickedElemOuterText = null;

          if (e.target.attributes) {
            for (let i in e.target.attributes) {
              if (e.target.attributes[i].name == 'id') {
                lastClickedElemId = e.target.attributes[i].value;
              }
            }
          }

          lastClickedElem = e.target.localName;
          lastClickedElemOuterText = e.target.outerText;
        });

        elem.bind('hide.bs.dropdown', function(e) {
          if (
            lastClickedElemId == 'new-category-span' ||
            lastClickedElemId == 'new-category' ||
            lastClickedElemId == 'not-allowed-li-choose-category' ||
            lastClickedElemId == 'not-allowed-url-choose-category' ||
            lastClickedElemId == 'not-allowed-url-choose-category-text' ||
            lastClickedElemId == 'li-create-category' ||
            lastClickedElemId == 'div-create-category' ||
            lastClickedElemId == 'new-category-name-error' ||
            lastClickedElemId == 'new-category-name-error-inner'
          ) {
            e.preventDefault();
          } else {
            if (
              lastClickedElem == 'a' &&
              lastClickedElemOuterText != 'Выберите категорию:'
            ) {
              ctrl.menu.createNewProduct(
                ctrl.menu.createNewProductArgument(
                  ctrl.shopping.model.newProductName,
                  lastClickedElemOuterText,
                  ctrl.shopping.model.categoriesList
                )
              );
            }
          }
        });
      }
    };
  }
})();
