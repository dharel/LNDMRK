angular.module('lndmrk').controller('DashboardController', ['$scope', 'AjaxService', function ($scope, AjaxService) {
  $scope.expanded = {
    isOpen: false,
    id: null
  }
  
  $scope.data = [
    {
      id: 0,
      name: 'income',
      class: 'income',
      assets: [
        {
          id: 0,
          name: 'asset 1',
          price: 1236,
          owned: 13,
          value: 18712,
          yield: 2.1,
          rating: 'B2',
          income: 234.7,
          debt: 0,
          gains: 15022
        },
        {
          id: 1,
          name: 'asset 2',
          price: 1138,
          owned: 4,
          value: 51700,
          yield: 5.3,
          rating: 'A4',
          income: 123.6,
          debt: 0,
          gains: 15022
        },
        {
          id: 2,
          name: 'asset 3',
          price: 2000,
          owned: 17,
          value: 23767,
          yield: 1.1,
          rating: 'C1',
          income: 167.5,
          debt: 0,
          gains: 15022
        }
      ] 
    },
    {
      id: 1,
      name: 'income & growth',
      class: 'income-growth',
      assets: [
        {
          id: 0,
          name: 'asset 1',
          price: 1236,
          owned: 13,
          value: 18712,
          yield: 2.1,
          rating: 'B2',
          income: 234.7,
          debt: 0,
          gains: 15022
        },
        {
          id: 1,
          name: 'asset 2',
          price: 1138,
          owned: 4,
          value: 51700,
          yield: 5.3,
          rating: 'A4',
          income: 123.6,
          debt: 0,
          gains: 15022
        },
        {
          id: 2,
          name: 'asset 3',
          price: 2000,
          owned: 17,
          value: 23767,
          yield: 1.1,
          rating: 'C1',
          income: 167.5,
          debt: 0,
          gains: 15022
        }
      ] 
    },
    {
      id: 2,
      name: 'growth',
      class: 'growth',
      assets: [
        {
          id: 0,
          name: 'asset 1',
          price: 1236,
          owned: 13,
          value: 18712,
          yield: 2.1,
          rating: 'B2',
          income: 234.7,
          debt: 0,
          gains: 15022
        },
        {
          id: 1,
          name: 'asset 2',
          price: 1138,
          owned: 4,
          value: 51700,
          yield: 5.3,
          rating: 'A4',
          income: 123.6,
          debt: 0,
          gains: 15022
        },
        {
          id: 2,
          name: 'asset 3',
          price: 2000,
          owned: 17,
          value: 23767,
          yield: 1.1,
          rating: 'C1',
          income: 167.5,
          debt: 0,
          gains: 15022
        }
      ] 
    }
  ];

  $scope.analyzingToolData = [
    {
      id: 0,
      name: 'seth nichols',
      return: 6,
      risk: 'c',
      value: 5000,
    },
    {
      id: 1,
      name: 'robin elliott',
      return: 8,
      risk: 'd',
      value: 13000
    },
    {
      id: 2,
      name: 'guy gardner',
      return: 4.6,
      risk: 'b',
      value: 9000
    }
  ];

  $scope.sumProperty = function (type, collection) {
    return R.sum(R.pluck(type)(collection));
  };

  $scope.calcAvarage = function (type, collection) {
    return (R.sum(R.pluck(type)(collection)) / collection.length).toFixed(2);
  };

  $scope.sumAll = function (type) {
    var sum = 0;
    R.forEach(function (property) {
      sum += $scope.sumProperty(type, property.assets);
    })($scope.data);

    return sum.toFixed(2);
  };

  $scope.toggleExpanded = function (property) {
    $scope.expanded.isOpen = !$scope.expanded.isOpen;
    $scope.expanded.id = $scope.expanded.id !== property.id ? property.id : null;
  };
}]);