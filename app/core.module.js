(function() {
  'use strict';

  angular
    .module('shopping', ['ui.router', 'ngResource', 'ngMessages'])
    .constant('apiUrl', 'app/php');
})();
