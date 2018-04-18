var pkoCashflowMonitorApp = angular.module('PKOCM', []);

pkoCashflowMonitorApp.controller('MainController', function PhoneListController($scope) {
  const DESC_LIMIT = 100;
  const NO_LIMIT = 999999;

  $scope.groups = [];

  $scope.createGroup = function() {
    $scope.groups.push(
      {
        'name': $scope.newGroupName,
        'operations': $scope.operations.filter(function(oper) { return oper.marked }),
        'color': getRandomLightColor()
      }
    );
  };

  $scope.groupSum = function(operGroup) {
    var groupSum = 0;

    for (var i = 0; i < operGroup.operations.length; i++) {
      var oper = operGroup.operations[i];
      groupSum += oper.amount;
    }

    return groupSum;
  };

  $scope.switchLimit = function(operation) {
    if (operation.descLimit == DESC_LIMIT) {
      operation.descLimit = NO_LIMIT;
    } else {
      operation.descLimit = DESC_LIMIT;
    }
  };

  $scope.ignoredChange = function(operation) {
    if (operation.ignored) {
      operation.descLimit = NO_LIMIT;
    } else {
      operation.descLimit = DESC_LIMIT;
    }
  };

  $scope.amountSum = function() {
    var sum = 0, notIgnored = $scope.operations.filter(function(oper) { return oper.ignored != true });

    for (var i = 0; i < notIgnored.length; i++) {
      var oper = notIgnored[i];
      sum += oper.amount;
    }

    return sum;
  };

    $scope.operations = [
      {
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67
      },
      {
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67
      },
      {
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67
      },
      {
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67
      },
      {
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67
      },
      {
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67
      },
      {
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67
      },
      {
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67
      },
      {
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67
      },
      {
        "exec_date": "2018-04-16",
        "order_date": "2018-04-14",
        "type": "Płatność kartą",
        "description": "Tytuł: 000483849 74838498104086481636291 Lokalizacja: Kraj: POLSKA Miasto: Bialystok Adres: Roxy Burgers Data i czas operacji: 2018-04-14 13:15:52 Oryginalna kwota operacji: 14,00 PLN Numer karty: 42512509*****343",
        "amount": -14.00,
        "ending_balance": 40136.67
      }
    ];

  function getRandomLightColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  function initData() {
    for (var i = 0; i < $scope.operations.length; i++) {
      var oper = $scope.operations[i];
      oper.descLimit = DESC_LIMIT;
    }
  }

  initData();
});