var pkoCashflowMonitorApp = angular.module('PKOCM', []);

pkoCashflowMonitorApp.controller('MainController', function PhoneListController($scope) {
  const DESC_LIMIT = 100;
  const NO_LIMIT = 999999;

  $scope.groups = [];
  $scope.operations = [];

  var xmlDoc = loadXMLDoc("data.xml");
  var x2js = new X2JS();
  var jsonObj = x2js.xml2json(xmlDoc);

  $scope.operations = jsonObj['account-history'].operations.operation;
  console.log($scope.operations[0]);

  initData();

  angular.element("#minAmountInput, #maxAmountInput").on("keypress keyup blur",function (event) {
    angular.element(this).val(angular.element(this).val().replace(/[^0-9\.,-]/g,''));
    angular.element(this).val(angular.element(this).val().replace(/[,]/g,'.'));

    // todo na firefoxie which nie zadziala https://www.w3schools.com/jsref/event_key_keycode.asp
    var val = angular.element(this).val();
    if ((event.which != 46 || val.indexOf('.') != -1) &&
      (event.which != 44 || val.indexOf('.') != -1) &&
      (event.which != 45 || val.indexOf('-') != -1 || (event.which == 45 && val.length > 0)) &&
      (event.which < 48 || event.which > 57)) {
      event.preventDefault();
    }
  });

  //------------------------------------------------

  $scope.createGroup = function() {
    var groupOpers = $scope.operations.filter(function(oper) { return oper.marked });
    var groupColor = getRandomLightColor();

    var newGroup =
    {
      'name': $scope.newGroupName,
      'operations': groupOpers,
      'color': groupColor
    };

    for (var i = 0; i < groupOpers.length; i++) {
      var oper = groupOpers[i];
      if (oper.group) {
        oper.group.operations.splice(oper.group.operations.indexOf(oper), 1);
        if (oper.group.operations.length < 1) {
          //$scope.groups.splice($scope.groups.indexOf(oper.group), 1);
        }
      }
      oper.group = newGroup;
    }

    $scope.groups.push(newGroup);
  };

  $scope.ignoreGroup = function(operGroup) {
    for (var i = 0; i < operGroup.operations.length; i++) {
      var oper = operGroup.operations[i];
      oper.ignored = true;
    }
  };

  $scope.unignoreGroup = function(operGroup) {
    for (var i = 0; i < operGroup.operations.length; i++) {
      var oper = operGroup.operations[i];
      oper.ignored = false;
    }
  };

  $scope.checkGroup = function(operGroup) {
    for (var i = 0; i < operGroup.operations.length; i++) {
      var oper = operGroup.operations[i];
      oper.marked = true;
    }
  };

  $scope.uncheckGroup = function(operGroup) {
    for (var i = 0; i < operGroup.operations.length; i++) {
      var oper = operGroup.operations[i];
      oper.marked = false;
    }
  };

  $scope.deleteGroup = function(operGroup) {
    $scope.groups.splice($scope.groups.indexOf(operGroup), 1);
    for (var i = 0; i < $scope.operations.length; i++) {
      var oper = $scope.operations[i];
      if (oper.group == operGroup) {
        oper.group = undefined;
      }
    }
  };

  $scope.groupSum = function(operGroup) {
    var groupSum = 0;

    for (var i = 0; i < operGroup.operations.length; i++) {
      var oper = operGroup.operations[i];
      groupSum += +oper.amount.__text;
    }

    return groupSum;
  };

  $scope.clear = function(val) {
    $scope[val] = undefined;
  };

  $scope.switchLimit = function(operation) {
    if (operation.descLimit == DESC_LIMIT) {
      operation.descLimit = NO_LIMIT;
    } else {
      operation.descLimit = DESC_LIMIT;
    }
  };

  $scope.ignoredChange = function(operation) {
    operation.descLimit = DESC_LIMIT;
  };

  $scope.amountSum = function() {
    var sum = 0, notIgnored = $scope.operations.filter(function(oper) { return oper.ignored != true });

    for (var i = 0; i < notIgnored.length; i++) {
      var oper = notIgnored[i];
      sum += +oper.amount.__text;
    }

    return sum.toFixed(2);
  };

  $scope.markFiltred = function() {
    for (var i = 0; i < $scope.filteredOpers.length; i++) {
      var oper = $scope.filteredOpers[i];
      oper.marked = true;
    }
  };

  $scope.unmarkFiltred = function() {
    for (var i = 0; i < $scope.filteredOpers.length; i++) {
      var oper = $scope.filteredOpers[i];
      oper.marked = false;
    }
  };

  $scope.ignoreFiltred = function() {
    for (var i = 0; i < $scope.filteredOpers.length; i++) {
      var oper = $scope.filteredOpers[i];
      oper.ignored = true;
    }
  };

  $scope.unignoreFiltred = function() {
    for (var i = 0; i < $scope.filteredOpers.length; i++) {
      var oper = $scope.filteredOpers[i];
      oper.ignored = false;
    }
  };

  $scope.searchFilter = function(desc, minAmount, maxAmount, minDate, maxDate, typeQuery){
    var reg = new RegExp(desc, "i");
    return function(oper){
      var descCheck = isEmpty(desc) || oper.description.match(reg);
      var minAmountCheck = isEmpty(minAmount) || parseFloat(oper.amount.__text) >= parseFloat(minAmount);
      var maxAmountCheck = isEmpty(maxAmount) || parseFloat(oper.amount.__text) <= parseFloat(maxAmount);
      var minDateCheck = isEmpty(minDate) || new Date(oper['order-date']).getTime() >= new Date(minDate).getTime();
      var maxDateCheck = isEmpty(maxDate) || new Date(oper['order-date']).getTime() <= new Date(maxDate).getTime();
      var typeCheck = isEmpty(typeQuery) || typeQuery[0] == '' || typeQuery.indexOf(oper.type) > -1;

      return descCheck && minAmountCheck && maxAmountCheck && minDateCheck && maxDateCheck && typeCheck;
    }
  };
    /*$scope.operations = [
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
    ];*/

  function getRandomLightColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  function isEmpty(val) {
    return val === undefined || val === null || val === "" || val.length === 0;
  }

  function initData() {
      $scope.labels = [];
      $scope.data = [];

      // todo posortowac xml po order-date
    /*$scope.operations.sort(function(oper1, oper2){
      var oper1Time = new Date(oper1['order-date']).getTime(), oper2Time = new Date(oper2['order-date']).getTime();
      if(oper1Time < oper2Time) return -1;
      if(oper1Time > oper2Time) return 1;
      return 0;
    });*/

    for (var i = 0; i < $scope.operations.length; i++) {
      var oper = $scope.operations[i];
      oper.descLimit = DESC_LIMIT;
        $scope.data.unshift(+oper['ending-balance'].__text);
        $scope.labels.unshift(oper['exec-date']);
    }

      var ctx = document.getElementById("chart");
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: $scope.labels,
              datasets: [{
                  data: $scope.data,
                  backgroundColor: 'rgb(50, 0, 57, 0.41)',
                  borderWidth: 1
              }]
          },
          options: {
              tooltips: {
                  mode: 'index',
                  intersect: false
              },
              legend: {
                display: false
              },
            scales: {
              yAxes: [{
                ticks: {
                  fontColor: "white"
                }
              }],
              xAxes: [{
                ticks: {
                  fontColor: "white"
                }
              }]
            },
              elements: {
                  line: {
                      tension: 0
                  }
              }
          }
      });
  }

  function loadXMLDoc(dname) {
    if (window.XMLHttpRequest) {
      xhttp=new XMLHttpRequest();
    }
    else {
      xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;
  }
});

pkoCashflowMonitorApp.directive('colorPicker', function () {
  return {
    require: '^ngModel',
    scope: {
      ngModel:'='
    },
    link: function (scope, element, attrs, ngModel) {
      var input = element[0], box = document.createElement('div');

      box.className = 'color-box';
      box.style.backgroundColor = input.value;
      box.setAttribute('data-color', input.value);
      input.parentNode.insertBefore(box, input);
      input.type = 'hidden';

      var picker = new CP(box);
      picker.set(scope.ngModel);

      picker.on("change", function(color) {
        ngModel.$setViewValue('#' + color);
        scope.$apply();
        this.target.style.backgroundColor = '#' + color;
      });
    }
  }
});