;(function() {

    'use strict';
    
    angular
        .module("shopping")
        .factory("GoodsCatalogFactory", GoodsCatalogFactory);

    GoodsCatalogFactory.$inject = ['$http', 'apiUrl'];

    function GoodsCatalogFactory($http, apiUrl) {

        let goodsCatalog = {
            getAllGoods: getAllGoods
        };

        function getAllGoods() {
            return $http.get(apiUrl + "getGoodsList.php");
        }
        return goodsCatalog;
    }
})();