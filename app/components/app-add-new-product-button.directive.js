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
        function(ShoppingModel, $element, $scope) {
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

          vm.shopping = ShoppingModel;

          vm.model = {
            newCategoryName: '',
            newCategoryNameErrorText: ''
          };
          vm.menu = {
            initTooltip: initTooltip,
            createNewCategory: createNewCategory
          };

          function initTooltip() {
            $('#new-product-tooltip').tooltip();
          }

          function createNewCategory(data) {
            vm.shopping.menu.createNewCategory(data).then(
              response => {
                let newCategory = {};
                newCategory.category_id = response.data.category_id;
                newCategory.category_name = response.data.category_name;
                vm.shopping.model.categoriesList.push(newCategory);
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

        elem.bind('click', function(e) {
          lastClickedElem = null;
          if (e.target.attributes) {
            for (let i in e.target.attributes) {
              if (e.target.attributes[i].name == 'id') {
                lastClickedElem = e.target.attributes[i].value;
              }
            }
          }
        });

        elem.bind('hide.bs.dropdown', function(e) {
          if (
            lastClickedElem == 'new-category-span' ||
            lastClickedElem == 'new-category' ||
            lastClickedElem == 'not-allowed-li-choose-category' ||
            lastClickedElem == 'not-allowed-url-choose-category' ||
            lastClickedElem == 'not-allowed-url-choose-category-text' ||
            lastClickedElem == 'li-create-category' ||
            lastClickedElem == 'div-create-category'
          ) {
            e.preventDefault();
          }
        });
      }
    };
  }
})();
