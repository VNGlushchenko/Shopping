(function() {
  'use strict';

  angular.module('shopping').component('appShoppingList', {
    templateUrl: 'app/components/app-shopping-list.template.html',
    controller: [
      '$scope',
      function($scope) {
        //console.log(this.$$childHead.atc.model.shoppingList);
      }
    ]
  });
})();
