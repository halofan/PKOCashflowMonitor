var phonecatApp = angular.module('PKOCM', []);

phonecatApp.controller('MainController', function PhoneListController($scope) {
  const DESC_LIMIT = 100;
  const NO_LIMIT = 999999;

  $scope.switchLimit = function(operation) {
    if (operation.descLimit == DESC_LIMIT) {
      operation.descLimit = NO_LIMIT;
    } else {
      operation.descLimit = DESC_LIMIT;
    }
  };

  $scope.ignoreChange = function(operation) {
    if (operation.ignore) {
      operation.descLimit = NO_LIMIT;
    } else {
      operation.descLimit = DESC_LIMIT;
    }
  };

    $scope.operations = [{
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67,
        "ignore": false
    },{
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67,
        "ignore": false
    }];
});