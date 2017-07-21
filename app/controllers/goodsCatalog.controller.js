;(function() {

    'use strict';

    angular
        .module("shopping")
        .controller("GoodsCatalogCtrl", GoodsCatalogCtrl);

    GoodsCatalogCtrl.$inject = ['GoodsCatalogFactory'];

    function GoodsCatalogCtrl(GoodsCatalogFactory) {
        let vm = this;
        vm.goodsCatalog = [];
        GoodsCatalogFactory.getAllGoods().then(
            (response) => {
                let receivedData = response.data,
                    categoryId = [],
                    categoryName = [],
                    productId = [],
                    productName = [];
                // receivedData parsing
                $.each(receivedData, function(index, value) {
                    if (index == 0) {
                        value.forEach(function(item, i, value) {
                            categoryId.push(item);
                        });
                    } else if (index == 1) {
                        value.forEach(function(item, i, value) {
                            categoryName.push(item);
                        });
                    } else if (index == 2) {
                        value.forEach(function(item, i, value) {
                            productId.push(item);
                        });
                    } else {
                        value.forEach(function(item, i, value) {
                            productName.push(item);
                        });
                    }
                });
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
                    goodsCatalog[i]['category_id'] = categoryId[posUniqueElemsArr[i]];
                    goodsCatalog[i]['category_name'] = categoryName[posUniqueElemsArr[i]];
                    goodsCatalog[i]['products'] = [];
                }
                // products distribution among categories
                for (let i = 0; i < goodsCatalog.length; i++) {
                    for (let j = 0; j < productId.length; j++) {
                        if (
                            (j >= posUniqueElemsArr[i] && j < posUniqueElemsArr[i + 1]) ||
                            (i == posUniqueElemsArr.length - 1 && (j >= posUniqueElemsArr[i] && j < productId.length))
                        ) {
                            goodsCatalog[i].products.push({
                                productId: productId[j],
                                productName: productName[j]
                            });
                        }
                    }
                }
                vm.goodsCatalog = goodsCatalog;
            }
        );
    }
})();