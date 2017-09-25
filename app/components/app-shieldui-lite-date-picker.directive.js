(function() {
  'use strict';

  angular
    .module('shopping')
    .directive('appShielduiLiteDatePicker', appShielduiLiteDatePicker);

  function appShielduiLiteDatePicker() {
    return {
      restrict: 'A',
      scope: {
        input_date: '=inputDate',
        dates_validator: '=datesValidator',
        checking_date: '<checkingDate'
      },
      link: function(scope, elem, attrs) {
        elem.shieldDatePicker({
          value: scope.input_date,
          textTemplate: '{0:dd.MM.yyyy}',
          editable: false,
          events: {
            change: function(e) {
              scope.$apply(function() {
                if (!e.target.value()) {
                  scope.input_date = null;
                } else {
                  scope.input_date = e.target.value().toJSON();
                  if (
                    (scope.input_date >= scope.checking_date &&
                      attrs.id == 'date-to') ||
                    (scope.input_date <= scope.checking_date &&
                      attrs.id == 'date-from')
                  ) {
                    scope.dates_validator.$setValidity('check_dates', true);
                  } else {
                    scope.dates_validator.$setValidity('check_dates', false);
                  }
                }
              });
            }
          }
        });
      }
    };
  }
})();
