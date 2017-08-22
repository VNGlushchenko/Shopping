(function() {
  'use strict';

  angular.module('shopping').factory('GoodsCatalogModel', GoodsCatalogModel);

  GoodsCatalogModel.$inject = ['$http', 'apiUrl'];

  function GoodsCatalogModel($http, apiUrl) {
    let goodsCatalog = {
      getAllGoods: getAllGoods
    };

    return goodsCatalog;

    function getAllGoods() {
      return $http.get(`${apiUrl}/getGoodsList.php`);
    }
  }
})();
