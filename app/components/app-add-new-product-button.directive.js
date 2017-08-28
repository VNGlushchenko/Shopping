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
        function(ShoppingModel, $element) {
          let vm = this;

          vm.shopping = ShoppingModel;

          vm.model = {
            newCategoryName: ''
          };
          vm.menu = {
            initTooltip: initTooltip,
            hideTooltip: hideTooltip,
            createNewCategory: createNewCategory
          };

          function initTooltip() {
            $('#new-product-tooltip').tooltip();
            $('#new-category-tooltip').tooltip();
          }

          function hideTooltip() {
            $('#new-product-tooltip').tooltip('hide');
          }

          function createNewCategory(data) {
            console.log('from vm.shopping.menu.createNewCategory(data)');
            vm.shopping.menu.createNewCategory(data).then(
              response => {
                let newCategory = {};
                newCategory.category_id = response.data[0];
                newCategory.category_name = response.data[1];
                vm.shopping.model.categoriesList.push(newCategory);
                vm.model.newCategory = '';
              },
              error => console.log(error)
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
            lastClickedElem == 'new-category-tooltip-span' ||
            lastClickedElem == 'new-category-tooltip'
          ) {
            e.preventDefault();
          }
        });
      }
    };
  }
})();
